"use client";

import { useState, useEffect } from "react";
import { parseCommand } from "@/lib/parser/command-parser";
import { simulateRouting } from "@/lib/sim/agent-simulator";
import { gateStateStream } from "@/lib/mock/gate-state-stream";
import { MOCK_PERSONAS } from "@/lib/mock/personas";
import { GateState, RoutingPolicy } from "@/lib/types/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SimTestPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [commandText, setCommandText] = useState("Simulate redirecting 40% from Gate 3 to Gates 4 and 5");

  if (!mounted) return <div className="min-h-screen bg-background" />;
  const [parsedCommand, setParsedCommand] = useState<any>(null);
  const [states, setStates] = useState<GateState[]>([]);
  const [simulation, setSimulation] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = gateStateStream.subscribe(setStates);
    const interval = setInterval(() => gateStateStream.tick(), 2000);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleTest = () => {
    const cmd = parseCommand(commandText);
    setParsedCommand(cmd);

    if (cmd.parsedIntent === "simulate_reroute") {
      const policy: RoutingPolicy = {
        id: "p-test",
        source: cmd.params.source,
        distribution: {
          [cmd.params.source]: cmd.params.percent,
          ...Object.fromEntries(cmd.params.targets.map((t: string) => [t, (100 - cmd.params.percent) / cmd.params.targets.length]))
        },
        committedAt: new Date().toISOString(),
      };
      const result = simulateRouting(policy, states, MOCK_PERSONAS);
      setSimulation(result);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen text-foreground font-mono">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold font-display text-primary">PHASE 1: SIMULATION TEST</h1>
        <div className="flex gap-4">
          <Input 
            value={commandText} 
            onChange={(e) => setCommandText(e.target.value)}
            className="font-mono bg-card"
          />
          <Button onClick={handleTest}>PARSE & SIMULATE</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-card">
          <CardHeader><CardTitle>PARSED COMMAND</CardTitle></CardHeader>
          <CardContent>
            <pre className="text-xs bg-black p-4 rounded">{JSON.stringify(parsedCommand, null, 2)}</pre>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader><CardTitle>SIMULATION RESULT</CardTitle></CardHeader>
          <CardContent>
            <pre className="text-xs bg-black p-4 rounded">{JSON.stringify(simulation, null, 2)}</pre>
          </CardContent>
        </Card>

        <Card className="bg-card md:col-span-2">
          <CardHeader><CardTitle>LIVE GATE STATES (FIRST 5)</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {states.slice(0, 5).map(s => (
                <div key={s.gateId} className="p-2 border border-border rounded">
                  <div className="text-xs text-muted-foreground">GATE {s.gateId}</div>
                  <div className="text-lg font-bold">{s.count}</div>
                  <div className={`text-[10px] ${s.status === 'critical' ? 'text-state-critical' : 'text-state-clear'}`}>
                    {s.status.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
