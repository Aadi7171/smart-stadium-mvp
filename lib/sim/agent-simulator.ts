import { GateState, Persona, RoutingPolicy } from "../types/schema";

export interface SimulationResult {
  projectedStates: GateState[];
  totalThroughputDelta: number;
  personaBreakdown: {
    personaId: string;
    complianceRate: number;
    redirectedCount: number;
  }[];
  confidenceRange: [number, number];
}

export function simulateRouting(
  policy: RoutingPolicy,
  currentStates: GateState[],
  personas: Persona[]
): SimulationResult {
  const projectedStates = currentStates.map((s) => ({ ...s }));
  const sourceState = projectedStates.find((s) => s.gateId === policy.source);

  if (!sourceState) {
    return {
      projectedStates,
      totalThroughputDelta: 0,
      personaBreakdown: [],
      confidenceRange: [0, 0],
    };
  }

  const flowToRedirect = sourceState.throughput60s * (policy.distribution[policy.source] || 0) / 100;
  
  // Weighted compliance across personas
  const avgCompliance = personas.reduce((acc, p) => acc + p.complianceRate, 0) / personas.length;
  const compliantFlow = flowToRedirect * avgCompliance;

  // Reduce source throughput
  sourceState.throughput60s -= compliantFlow;

  // Add to targets
  Object.entries(policy.distribution).forEach(([gateId, weight]) => {
    if (gateId === policy.source) return;
    const targetState = projectedStates.find((s) => s.gateId === gateId);
    if (targetState) {
      targetState.throughput60s += compliantFlow * (weight / (100 - (policy.distribution[policy.source] || 0)));
    }
  });

  const personaBreakdown = personas.map(p => ({
    personaId: p.id,
    complianceRate: p.complianceRate,
    redirectedCount: Math.round(flowToRedirect * p.complianceRate / personas.length),
  }));

  return {
    projectedStates,
    totalThroughputDelta: Math.round(compliantFlow),
    personaBreakdown,
    confidenceRange: [Math.round(compliantFlow * 0.8), Math.round(compliantFlow * 1.2)],
  };
}
