import { ScenarioName } from "./gate-state-stream";

export interface Scenario {
  id: ScenarioName;
  name: string;
  description: string;
  severity: "nominal" | "warning" | "emergency";
}

export const SCENARIOS: Scenario[] = [
  {
    id: "baseline",
    name: "Baseline Operations",
    description: "Standard game-day load. All gates operating within nominal thresholds.",
    severity: "nominal",
  },
  {
    id: "gate_3_critical",
    name: "Gate 3 Congestion",
    description: "Unexpected surge at Gate 3. Dwell times exceeding 120s.",
    severity: "warning",
  },
  {
    id: "transit_surge",
    name: "Transit Hub Burst",
    description: "Arrival of a dedicated fan shuttle. High volume at North gates.",
    severity: "warning",
  },
  {
    id: "rain_event",
    name: "Weather Alert: Rain",
    description: "Sudden downpour. Fans crowding near covered concourses and entry points.",
    severity: "warning",
  },
  {
    id: "fire_zone_3",
    name: "FACP: Fire Zone 3",
    description: "Smoke detected in Sector 3. Tier 1 emergency protocol active.",
    severity: "emergency",
  },
  {
    id: "security_concourse",
    name: "Security Incident",
    description: "Suspicious package reported near Gate 7. Zone lockdown required.",
    severity: "emergency",
  },
];
