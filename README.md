# 🏟️ Smart Stadium Agentic Command Center

> **Mission Control for the Next Generation of Live Events.**

An advanced, agentic stadium management platform designed to optimize crowd flow, minimize entry congestion, and provide real-time tactical routing for both operators and fans. Built with a high-fidelity "Control Room" aesthetic.

![Dashboard Preview](file:///C:/Users/ICAI/.gemini/antigravity/brain/dc35700f-9186-481c-8e21-167d1ec3d8f3/final_dashboard_verification_full_1777811000329.png)

---

## 🚀 Key Features

### 🎮 Tactical Command Uplink
- **Natural Language Parsing**: Operators can issue commands like *"Redirect 40% from Gate 3 to 4"* or *"Trigger Zone 2 Emergency"*.
- **Agentic Simulation**: Projects crowd behavior based on 5 distinct fan personas (Impatient, Family, Habitual, etc.).
- **Live State Stream**: Deterministic simulation of 18 gates with real-time throughput and dwell time tracking.

### 🎫 Smart Ticket Routing (Fan Guidance)
- **Congestion-Aware Recommendations**: Fans enter their ticket number and receive the optimal entry point.
- **Dynamic Alternatives**: If the nearest gate is critical, the system automatically suggests a "Faster Alternative," calculating time savings in real-time.
- **Sector Mapping**: Intelligent mapping of ticket blocks to stadium sectors (North/South/East/West).

### 🗺️ Interactive Spatial Map
- **SVG-Based Visualization**: Real-time heat map of the stadium perimeter.
- **Node-Based Tracking**: Interactive gate nodes with detailed hover-states for load and flow metrics.
- **Legend-Driven Status**: Instant visual confirmation of system health (Nominal, Congested, Critical).

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14.2.0 (App Router), TypeScript
- **Styling**: Tailwind CSS, Framer Motion (Animations), Lucide React (Icons)
- **UI Components**: shadcn/ui (Custom "Control-Room" Theme)
- **Data Layer**: Zod (Schema Validation), React Context (State Management)
- **Simulation**: Custom deterministic event-loop engine

---

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aadi7171/smart-stadium-mvp.git
   cd smart-stadium-mvp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access the Dashboard**:
   Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser.

---

## 📂 Architecture Overview

```text
/app
  /dashboard      - Main Command Center interface
  /sim-test       - Logic verification and debug view
/components
  /dashboard      - Spatial Map, Fan Guide, and Stat Cards
  /console        - Tactical Command Input
/lib
  /types          - Zod schemas and domain models
  /mock           - Deterministic gate data and scenarios
  /sim            - Agentic projection and routing logic
  /parser         - Natural language command parsing
```

---

## 🛡️ Emergency Protocols

The system includes built-in Tier 1 and Tier 2 emergency protocols. When triggered, the **Tactical Uplink** enters a high-alert state, providing automated evacuation routing and zone-specific instructions to ensure fan safety.

---

**Developed for the Smart Stadium Hackathon 2026**
*By Aadi7171*
