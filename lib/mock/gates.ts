import { Gate } from "../types/schema";

export const MOCK_GATES: Gate[] = [
  { id: "1", name: "Gate 1", location: { x: 400, y: 50 }, capacity: 150, accessible: true },
  { id: "2", name: "Gate 2", location: { x: 550, y: 80 }, capacity: 120, accessible: true },
  { id: "3", name: "Gate 3", location: { x: 680, y: 180 }, capacity: 200, accessible: false },
  { id: "4", name: "Gate 4", location: { x: 730, y: 300 }, capacity: 180, accessible: true },
  { id: "5", name: "Gate 5", location: { x: 680, y: 420 }, capacity: 150, accessible: true },
  { id: "6", name: "Gate 6", location: { x: 550, y: 520 }, capacity: 120, accessible: true },
  { id: "7", name: "Gate 7", location: { x: 400, y: 550 }, capacity: 200, accessible: true },
  { id: "8", name: "Gate 8", location: { x: 250, y: 520 }, capacity: 180, accessible: false },
  { id: "9", name: "Gate 9", location: { x: 120, y: 420 }, capacity: 150, accessible: true },
  { id: "10", name: "Gate 10", location: { x: 70, y: 300 }, capacity: 120, accessible: true },
  { id: "11", name: "Gate 11", location: { x: 120, y: 180 }, capacity: 200, accessible: true },
  { id: "12", name: "Gate 12", location: { x: 250, y: 80 }, capacity: 180, accessible: true },
  { id: "13", name: "Gate 13", location: { x: 320, y: 120 }, capacity: 100, accessible: true },
  { id: "14", name: "Gate 14", location: { x: 480, y: 120 }, capacity: 100, accessible: true },
  { id: "15", name: "Gate 15", location: { x: 600, y: 250 }, capacity: 100, accessible: true },
  { id: "16", name: "Gate 16", location: { x: 480, y: 480 }, capacity: 100, accessible: true },
  { id: "17", name: "Gate 17", location: { x: 320, y: 480 }, capacity: 100, accessible: true },
  { id: "18", name: "Gate 18", location: { x: 200, y: 250 }, capacity: 100, accessible: true },
];
