import { Persona } from "../types/schema";

export const MOCK_PERSONAS: Persona[] = [
  {
    id: "p1",
    name: "Impatient",
    complianceRate: 0.72,
    walkingSpeedMultiplier: 1.3,
    decisionDriver: "Speed and shortest wait time",
  },
  {
    id: "p2",
    name: "Family",
    complianceRate: 0.45,
    walkingSpeedMultiplier: 0.7,
    decisionDriver: "Accessibility and group cohesion",
  },
  {
    id: "p3",
    name: "First-time visitor",
    complianceRate: 0.6,
    walkingSpeedMultiplier: 1.0,
    decisionDriver: "Signage and official guidance",
  },
  {
    id: "p4",
    name: "Habitual fan",
    complianceRate: 0.28,
    walkingSpeedMultiplier: 1.0,
    decisionDriver: "Routine and muscle memory",
  },
  {
    id: "p5",
    name: "Premium ticket holder",
    complianceRate: 0.55,
    walkingSpeedMultiplier: 1.0,
    decisionDriver: "Exclusivity and comfort",
  },
];
