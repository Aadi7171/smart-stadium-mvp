import { Command } from "../types/schema";

export function parseCommand(raw: string): Command {
  const id = Math.random().toString(36).substring(7);
  const issuedAt = new Date().toISOString();
  const normalized = raw.toLowerCase();

  // Intent: Emergency
  if (normalized.includes("emergency") || normalized.includes("evacuate") || normalized.includes("trigger")) {
    const zoneMatch = raw.match(/zone (\d+)/i);
    return {
      id,
      raw,
      parsedIntent: "trigger_emergency",
      params: {
        zone: zoneMatch ? zoneMatch[1] : "unknown",
        trigger: "manual_operator_trigger",
      },
      issuedAt,
    };
  }

  // Intent: Reroute/Simulate
  if (normalized.includes("reroute") || normalized.includes("redirect") || normalized.includes("redistribute") || normalized.includes("simulate")) {
    const sourceMatch = raw.match(/gate (\d+)/i);
    const percentMatch = raw.match(/(\d+)%/);
    const targetMatches = Array.from(raw.matchAll(/gate (\d+)/gi)).slice(1); // skip source

    return {
      id,
      raw,
      parsedIntent: "simulate_reroute",
      params: {
        source: sourceMatch ? sourceMatch[1] : null,
        percent: percentMatch ? parseInt(percentMatch[1]) : 0,
        targets: targetMatches.map(m => m[1]),
      },
      issuedAt,
    };
  }

  // Intent: Query
  if (normalized.includes("show") || normalized.includes("status") || normalized.includes("what is")) {
    const gateMatch = raw.match(/gate (\d+)/i);
    return {
      id,
      raw,
      parsedIntent: "query_state",
      params: {
        gateId: gateMatch ? gateMatch[1] : null,
      },
      issuedAt,
    };
  }

  // Intent: Commit
  if (normalized.includes("commit") || normalized.includes("deploy") || normalized.includes("apply")) {
    return {
      id,
      raw,
      parsedIntent: "commit_policy",
      params: {},
      issuedAt,
    };
  }

  return {
    id,
    raw,
    parsedIntent: "unknown",
    params: {},
    issuedAt,
  };
}
