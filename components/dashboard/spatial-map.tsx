"use client";

import React from "react";
import { useDashboard } from "@/lib/store/dashboard-store";
import { MOCK_GATES } from "@/lib/mock/gates";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function SpatialMap() {
  const { state } = useDashboard();

  const getGateStatusColor = (gateId: string) => {
    const s = state.gates.find(g => g.gateId === gateId);
    if (!s) return "#2A2A30";
    if (s.status === 'critical') return "#EF4444";
    if (s.status === 'moderate') return "#F59E0B";
    return "#10B981";
  };

  return (
    <div className="relative w-full aspect-square bg-[#0A0A0B] rounded-xl border border-border overflow-hidden p-8">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #8A8A92 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl">
        {/* Stadium Perimeter */}
        <ellipse cx="400" cy="300" rx="350" ry="250" fill="none" stroke="#2A2A30" strokeWidth="2" strokeDasharray="8 4" />
        <ellipse cx="400" cy="300" rx="300" ry="200" fill="#15151A" stroke="#2A2A30" strokeWidth="1" />
        
        {/* Field */}
        <rect x="300" y="225" width="200" height="150" rx="4" fill="#0A0A0B" stroke="#2A2A30" strokeWidth="1" />

        {/* Gates */}
        <TooltipProvider>
          {MOCK_GATES.map((gate) => {
            const gateState = state.gates.find(s => s.gateId === gate.id);
            const color = getGateStatusColor(gate.id);
            
            return (
              <Tooltip key={gate.id}>
                <TooltipTrigger
                  render={
                    <motion.g
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.2 }}
                      className="cursor-pointer"
                    />
                  }
                >
                  <circle
                    cx={gate.location.x}
                    cy={gate.location.y}
                    r="12"
                    fill={color}
                    className="transition-colors duration-500"
                  />
                  <circle
                    cx={gate.location.x}
                    cy={gate.location.y}
                    r="18"
                    fill="transparent"
                    stroke={color}
                    strokeWidth="1"
                    className="animate-ping opacity-20"
                  />
                  <text
                    x={gate.location.x}
                    y={gate.location.y + 30}
                    textAnchor="middle"
                    fill="#8A8A92"
                    className="text-[10px] font-mono pointer-events-none"
                  >
                    G{gate.id}
                  </text>
                </TooltipTrigger>
                <TooltipContent className="bg-card border-border text-primary font-mono text-xs">
                  <div className="space-y-1">
                    <div className="font-bold border-b border-border pb-1 mb-1">{gate.name}</div>
                    <div className="flex justify-between gap-4">
                      <span>LOAD:</span>
                      <span className={gateState?.status === 'critical' ? 'text-state-critical' : 'text-state-clear'}>
                        {gateState?.count}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>FLOW:</span>
                      <span>{gateState?.throughput60s}/m</span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex gap-4 text-[10px] font-mono bg-black/50 p-2 rounded border border-border/50 backdrop-blur-sm">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-state-clear" /> NOMINAL</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-state-moderate" /> CONGESTED</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-state-critical" /> CRITICAL</div>
      </div>
    </div>
  );
}
