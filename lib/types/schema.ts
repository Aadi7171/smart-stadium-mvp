import { z } from "zod";

// Gate Definition
export const GateSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.object({
    x: z.number(),
    y: z.number(),
  }),
  capacity: z.number(),
  accessible: z.boolean(),
});

export type Gate = z.infer<typeof GateSchema>;

// Real-time Gate State
export const GateStateSchema = z.object({
  gateId: z.string(),
  count: z.number(),
  throughput60s: z.number(),
  dwellTimeSec: z.number(),
  status: z.enum(["clear", "moderate", "critical"]),
  updatedAt: z.string(),
});

export type GateState = z.infer<typeof GateStateSchema>;

// Persona Definition
export const PersonaSchema = z.object({
  id: z.string(),
  name: z.string(),
  complianceRate: z.number(), // 0 to 1
  walkingSpeedMultiplier: z.number(),
  decisionDriver: z.string(),
});

export type Persona = z.infer<typeof PersonaSchema>;

// Routing Policy
export const RoutingPolicySchema = z.object({
  id: z.string(),
  source: z.string(),
  distribution: z.record(z.string(), z.number()), // gateId -> weight (percentage)
  committedAt: z.string(),
});

export type RoutingPolicy = z.infer<typeof RoutingPolicySchema>;

// Command Interface
export const CommandSchema = z.object({
  id: z.string(),
  raw: z.string(),
  parsedIntent: z.enum([
    "simulate_reroute",
    "commit_policy",
    "query_state",
    "trigger_emergency",
    "unknown",
  ]),
  params: z.record(z.string(), z.any()),
  issuedAt: z.string(),
});

export type Command = z.infer<typeof CommandSchema>;

// Event Log Entry
export const EventLogEntrySchema = z.object({
  id: z.string(),
  type: z.enum([
    "command",
    "simulation",
    "commit",
    "emergency_tier1",
    "emergency_tier2",
    "system",
  ]),
  summary: z.string(),
  payload: z.any().optional(),
  operatorId: z.string(),
  timestamp: z.string(),
});

export type EventLogEntry = z.infer<typeof EventLogEntrySchema>;

// Emergency Event
export const EmergencyEventSchema = z.object({
  id: z.string(),
  tier: z.union([z.literal(1), z.literal(2)]),
  trigger: z.string(),
  zone: z.string(),
  recommendedRoutes: z.array(z.string()), // Array of gate IDs
  requiresAuthorization: z.boolean(),
  status: z.enum(["pending", "authorized", "broadcast", "cancelled"]),
});

export type EmergencyEvent = z.infer<typeof EmergencyEventSchema>;
