"use client";

import React, { useState } from "react";
import { useDashboard } from "@/lib/store/dashboard-store";
import { MOCK_GATES } from "@/lib/mock/gates";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, MapPin, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock mapping: Block A -> Gates 1, 18, 12; Block B -> Gates 2, 3, 4, etc.
const TICKET_MAPPING: Record<string, string[]> = {
  "A": ["1", "12", "18"],
  "B": ["2", "3", "14"],
  "C": ["4", "5", "15"],
  "D": ["6", "7", "16"],
  "E": ["8", "9", "17"],
  "F": ["10", "11", "18"],
};

export function FanGuide() {
  const { state } = useDashboard();
  const [ticketNo, setTicketNo] = useState("");
  const [recommendation, setRecommendation] = useState<any>(null);

  const findBestGate = () => {
    if (!ticketNo.trim()) return;

    const blockMatch = ticketNo.match(/[A-F]/i);
    const block = blockMatch ? blockMatch[0].toUpperCase() : "A";
    const possibleGateIds = TICKET_MAPPING[block] || ["1"];

    const possibleGates = state.gates.filter(g => possibleGateIds.includes(g.gateId));
    const closestGateId = possibleGateIds[0];
    const closestGateState = possibleGates.find(g => g.gateId === closestGateId);
    
    // Pick best based on load
    const bestGateState = [...possibleGates].sort((a, b) => a.count - b.count)[0];
    const bestGate = MOCK_GATES.find(g => g.id === bestGateState?.gateId);
    const closestGate = MOCK_GATES.find(g => g.id === closestGateId);

    const isAlternative = bestGateState?.gateId !== closestGateId && closestGateState?.status !== 'clear';

    if (bestGate && bestGateState) {
      setRecommendation({
        gate: bestGate,
        closestGate: closestGate,
        load: bestGateState.count,
        dwell: bestGateState.dwellTimeSec,
        isAlternative,
        block,
      });
    }
  };

  return (
    <div className="bg-[#15151A] border border-border rounded-xl p-4 flex flex-col h-full">
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
        <Ticket size={14} className="text-accent-amber" />
        Fan Entry Guide
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          value={ticketNo}
          onChange={(e) => setTicketNo(e.target.value.toUpperCase())}
          placeholder="TICKET NO (e.g. A-105)"
          className="bg-[#0A0A0B] border-border font-mono text-xs"
        />
        <Button onClick={findBestGate} size="sm" className="bg-accent-amber text-black hover:bg-accent-amber/90">
          FIND
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {recommendation ? (
          <motion.div
            key={recommendation.gate.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className={`p-4 rounded-lg border ${recommendation.isAlternative ? 'bg-state-moderate/10 border-state-moderate/30' : 'bg-accent-amber/5 border-accent-amber/20'}`}>
              <div className="flex justify-between items-start mb-1">
                <div className={`text-[10px] font-mono tracking-tighter ${recommendation.isAlternative ? 'text-state-moderate' : 'text-accent-amber'}`}>
                  {recommendation.isAlternative ? 'FASTER ALTERNATIVE' : 'OPTIMAL ENTRY'}
                </div>
                {recommendation.isAlternative && (
                  <Badge variant="outline" className="text-[8px] bg-black border-state-moderate text-state-moderate px-1 py-0 h-4">
                    SAVE 4+ MIN
                  </Badge>
                )}
              </div>
              <div className="text-2xl font-display font-bold text-primary flex items-center gap-2">
                {recommendation.gate.name}
                <ArrowRight size={20} className={recommendation.isAlternative ? 'text-state-moderate' : 'text-accent-amber'} />
              </div>
              <div className="text-[10px] text-muted-foreground font-mono mt-1">
                {recommendation.isAlternative 
                  ? `Nearest gate (${recommendation.closestGate?.name}) is currently congested.`
                  : `Optimized for Block ${recommendation.block} | Minimizing Dwell Time`}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#0A0A0B] border border-border rounded-lg">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono mb-1">
                  <Clock size={12} /> EST. WAIT
                </div>
                <div className={`text-lg font-mono font-bold ${recommendation.load > 400 ? 'text-state-critical' : 'text-state-clear'}`}>
                  {Math.round(recommendation.dwell / 60)} MIN
                </div>
              </div>
              <div className="p-3 bg-[#0A0A0B] border border-border rounded-lg">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono mb-1">
                  <MapPin size={12} /> SECTOR
                </div>
                <div className="text-lg font-mono font-bold text-primary">
                  NORTH-{recommendation.block}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-lg">
            <Ticket size={32} className="text-muted-foreground/20 mb-2" />
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              Ready for Ticket Scan
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
