"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { GateState, Command, SimulationResult, Persona } from "../types/schema";
import { gateStateStream } from "../mock/gate-state-stream";
import { MOCK_PERSONAS } from "../mock/personas";

interface DashboardState {
  gates: GateState[];
  history: Command[];
  lastSimulation: SimulationResult | null;
  activeEmergency: string | null;
  isLoading: boolean;
}

type DashboardAction =
  | { type: "SET_GATES"; payload: GateState[] }
  | { type: "ADD_COMMAND"; payload: Command }
  | { type: "SET_SIMULATION"; payload: SimulationResult | null }
  | { type: "SET_EMERGENCY"; payload: string | null };

const initialState: DashboardState = {
  gates: [],
  history: [],
  lastSimulation: null,
  activeEmergency: null,
  isLoading: true,
};

const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
} | undefined>(undefined);

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case "SET_GATES":
      return { ...state, gates: action.payload, isLoading: false };
    case "ADD_COMMAND":
      return { ...state, history: [action.payload, ...state.history].slice(0, 50) };
    case "SET_SIMULATION":
      return { ...state, lastSimulation: action.payload };
    case "SET_EMERGENCY":
      return { ...state, activeEmergency: action.payload };
    default:
      return state;
  }
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  useEffect(() => {
    const unsubscribe = gateStateStream.subscribe((gates) => {
      dispatch({ type: "SET_GATES", payload: gates });
    });

    const interval = setInterval(() => {
      gateStateStream.tick();
    }, 3000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
