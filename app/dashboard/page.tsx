"use client";

import React from "react";
import { DashboardProvider } from "@/lib/store/dashboard-store";
import { SpatialMap } from "@/components/dashboard/spatial-map";
import { CommandInput } from "@/components/console/command-input";
import { FanGuide } from "@/components/dashboard/fan-guide";
import { StatCards } from "@/components/dashboard/stat-cards";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity, Radio, Cpu } from "lucide-react";

export default function DashboardPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0A0A0B]" />;

  return (
    <DashboardProvider>
      <main className="min-h-screen bg-[#0A0A0B] text-[#E8E8EA] p-6 font-sans">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-state-clear rounded-full animate-pulse" />
              <h1 className="text-xl font-display font-bold tracking-widest uppercase">
                Smart Stadium Command Center
              </h1>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Radio size={10} className="text-accent-amber" /> Uplink: ACTIVE | Protocol: AGENTIC-REVERSE-v2.4
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <select 
              onChange={(e) => {
                const { gateStateStream } = require("@/lib/mock/gate-state-stream");
                gateStateStream.setScenario(e.target.value);
              }}
              className="bg-card border border-border text-[10px] font-mono text-muted-foreground uppercase py-1 px-2 rounded outline-none focus:border-accent-amber"
            >
              <option value="baseline">Baseline</option>
              <option value="gate_3_critical">Gate 3 Critical</option>
              <option value="transit_surge">Transit Surge</option>
              <option value="fire_zone_3">Emergency (Fire)</option>
            </select>
            <Badge variant="outline" className="font-mono text-[10px] border-border bg-card text-muted-foreground uppercase py-1 px-3">
              <Activity size={10} className="mr-2 text-state-clear" /> System Health: 100%
            </Badge>
            <Badge variant="outline" className="font-mono text-[10px] border-border bg-card text-muted-foreground uppercase py-1 px-3">
              <Cpu size={10} className="mr-2 text-accent-amber" /> Agents: NOMINAL
            </Badge>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Top Row: Stats */}
          <div className="col-span-12">
            <StatCards />
          </div>

          {/* Left Column: Command & Fan Guide */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="h-[350px]">
              <CommandInput />
            </div>
            <div className="flex-grow">
              <FanGuide />
            </div>
          </div>

          {/* Right Column: Spatial Map */}
          <div className="col-span-12 lg:col-span-8">
            <SpatialMap />
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-8 flex justify-between items-center text-[9px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em]">
          <div>Aadi7171 // Smart Stadium MVP // 2026</div>
          <div className="flex gap-4">
            <span>Lat: 28.6328° N</span>
            <span>Lon: 77.2410° E</span>
          </div>
        </footer>
      </main>
    </DashboardProvider>
  );
}
