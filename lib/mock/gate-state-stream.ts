import { GateState, Gate } from "../types/schema";
import { MOCK_GATES } from "./gates";

// Simple seeded PRNG
class SeededRandom {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }
  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

export type ScenarioName = "baseline" | "gate_3_critical" | "transit_surge" | "rain_event" | "fire_zone_3" | "security_concourse";

export class GateStateStream {
  private states: Map<string, GateState>;
  private subscribers: ((states: GateState[]) => void)[] = [];
  private currentScenario: ScenarioName = "baseline";
  private rng: SeededRandom;
  private tickCount: number = 0;

  constructor() {
    this.rng = new SeededRandom(42);
    this.states = new Map();
    this.initializeStates();
  }

  private initializeStates() {
    MOCK_GATES.forEach((gate) => {
      this.states.set(gate.id, {
        gateId: gate.id,
        count: 50 + Math.floor(this.rng.next() * 50),
        throughput60s: 20 + Math.floor(this.rng.next() * 10),
        dwellTimeSec: 15 + Math.floor(this.rng.next() * 30),
        status: "clear",
        updatedAt: new Date().toISOString(),
      });
    });
  }

  public subscribe(callback: (states: GateState[]) => void) {
    this.subscribers.push(callback);
    callback(Array.from(this.states.values()));
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== callback);
    };
  }

  public setScenario(name: ScenarioName) {
    this.currentScenario = name;
    this.tickCount = 0;
    // Reset or adjust states based on scenario start
    this.applyScenarioShocks();
    this.notify();
  }

  private applyScenarioShocks() {
    if (this.currentScenario === "gate_3_critical") {
      const g3 = this.states.get("3");
      if (g3) {
        g3.count = 450;
        g3.throughput60s = 85;
        g3.status = "critical";
      }
    } else if (this.currentScenario === "transit_surge") {
      // Surge at gates 1, 2, 12 (near transit hub)
      ["1", "2", "12"].forEach(id => {
        const s = this.states.get(id);
        if (s) {
          s.count += 100;
          s.status = "moderate";
        }
      });
    }
  }

  public tick() {
    this.tickCount++;
    this.states.forEach((state, id) => {
      // Basic drift
      const drift = (this.rng.next() - 0.48) * 10;
      state.count = Math.max(0, Math.floor(state.count + drift));
      state.throughput60s = Math.max(5, Math.floor(state.throughput60s + (this.rng.next() - 0.5) * 5));
      state.dwellTimeSec = Math.max(10, Math.floor(state.dwellTimeSec + (this.rng.next() - 0.5) * 4));

      // Update status based on thresholds
      if (state.count > 400 || state.throughput60s > 80) {
        state.status = "critical";
      } else if (state.count > 250 || state.throughput60s > 50) {
        state.status = "moderate";
      } else {
        state.status = "clear";
      }

      state.updatedAt = new Date().toISOString();
    });

    // Scenario specific progression
    this.progressScenario();

    this.notify();
  }

  private progressScenario() {
    if (this.currentScenario === "transit_surge" && this.tickCount > 5) {
      // Surge intensifies
      ["1", "2", "12"].forEach(id => {
        const s = this.states.get(id);
        if (s) s.count += 20;
      });
    }
  }

  private notify() {
    const statesArray = Array.from(this.states.values());
    this.subscribers.forEach((s) => s(statesArray));
  }

  public getStates(): GateState[] {
    return Array.from(this.states.values());
  }
}

// Singleton instance
export const gateStateStream = new GateStateStream();
