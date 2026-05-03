"use client";

import React from "react";
import { useDashboard } from "@/lib/store/dashboard-store";
import { Users, Activity, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function StatCards() {
  const { state } = useDashboard();

  const totalLoad = state.gates.reduce((acc, g) => acc + g.count, 0);
  const avgThroughput = Math.round(state.gates.reduce((acc, g) => acc + g.throughput60s, 0) / state.gates.length);
  const avgDwell = Math.round(state.gates.reduce((acc, g) => acc + g.dwellTimeSec, 0) / state.gates.length);
  const criticalCount = state.gates.filter(g => g.status === 'critical').length;

  const stats = [
    { label: "TOTAL OCCUPANCY", value: totalLoad.toLocaleString(), icon: Users, color: "text-primary" },
    { label: "AVG THROUGHPUT", value: `${avgThroughput}/m`, icon: Activity, color: "text-state-clear" },
    { label: "AVG DWELL TIME", value: `${Math.round(avgDwell/60)}m ${avgDwell%60}s`, icon: Clock, color: "text-accent-amber" },
    { label: "ACTIVE ALERTS", value: criticalCount, icon: ShieldCheck, color: criticalCount > 0 ? "text-state-critical" : "text-muted-foreground" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-[#15151A] border border-border p-4 rounded-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            <stat.icon size={14} className="text-muted-foreground/50" />
          </div>
          <div className={`text-xl font-display font-bold ${stat.color}`}>
            {stat.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
