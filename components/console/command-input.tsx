"use client";

import React, { useState } from "react";
import { useDashboard } from "@/lib/store/dashboard-store";
import { parseCommand } from "@/lib/parser/command-parser";
import { simulateRouting } from "@/lib/sim/agent-simulator";
import { MOCK_PERSONAS } from "@/lib/mock/personas";
import { RoutingPolicy } from "@/lib/types/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Terminal, Send, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CommandInput() {
  const { state, dispatch } = useDashboard();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = parseCommand(input);
    dispatch({ type: "ADD_COMMAND", payload: cmd });

    if (cmd.parsedIntent === "simulate_reroute") {
      const policy: RoutingPolicy = {
        id: `pol-${Date.now()}`,
        source: cmd.params.source,
        distribution: {
          [cmd.params.source]: cmd.params.percent,
          ...Object.fromEntries(cmd.params.targets.map((t: string) => [t, (100 - cmd.params.percent) / cmd.params.targets.length]))
        },
        committedAt: new Date().toISOString(),
      };
      const result = simulateRouting(policy, state.gates, MOCK_PERSONAS);
      dispatch({ type: "SET_SIMULATION", payload: result });
    } else if (cmd.parsedIntent === "trigger_emergency") {
        dispatch({ type: "SET_EMERGENCY", payload: cmd.params.zone });
    }

    setInput("");
  };

  return (
    <div className="bg-[#15151A] border border-border rounded-xl p-4 flex flex-col h-full">
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
        <Terminal size={14} className="text-accent-amber" />
        Tactical Uplink
      </div>

      <div className="flex-grow overflow-y-auto mb-4 space-y-2 font-mono text-[11px]">
        <AnimatePresence initial={false}>
          {state.history.map((cmd) => (
            <motion.div
              key={cmd.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2 border-l border-border pl-2"
            >
              <span className="text-muted-foreground">[{new Date(cmd.issuedAt).toLocaleTimeString([], { hour12: false })}]</span>
              <span className="text-accent-amber">{">"}</span>
              <span className="text-primary">{cmd.raw}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {state.history.length === 0 && (
          <div className="text-muted-foreground italic">Awaiting operator instructions...</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER COMMAND (e.g. Redirect 40% from Gate 3...)"
          className="bg-[#0A0A0B] border-border font-mono text-xs h-10 focus-visible:ring-accent-amber"
        />
        <Button 
          type="submit" 
          variant="ghost" 
          className="absolute right-1 top-1 h-8 w-8 p-0 text-muted-foreground hover:text-accent-amber"
        >
          <Send size={16} />
        </Button>
      </form>
      
      {state.activeEmergency && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-state-critical/10 border border-state-critical/50 rounded flex items-center gap-3 text-state-critical font-mono text-[10px]"
        >
          <ShieldAlert size={18} className="animate-pulse" />
          <div>
            <div className="font-bold">EMERGENCY PROTOCOL ACTIVE: ZONE {state.activeEmergency}</div>
            <div>Automated evacuation routing engaged.</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
