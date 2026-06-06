import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { LiveMap } from "./components/LiveMap";
import { Soldiers } from "./components/Soldiers";
import { Alerts } from "./components/Alerts";
import { CasualtyQueue } from "./components/CasualtyQueue";
import { ConfigureSuit } from "./components/ConfigureSuit";
import { PairSuit } from "./components/PairSuit";
import { SuitDiagnostics } from "./components/SuitDiagnostics";
import { MedicalRecords } from "./components/MedicalRecords";
import { AIAnalytics } from "./components/AIAnalytics";
import { ZoneManagement } from "./components/ZoneManagement";
import { Reports } from "./components/Reports";
import { AppSettings } from "./components/AppSettings";
import { EmergencyControls } from "./components/EmergencyControls";
import type { Page } from "./components/Sidebar";
import { soldiers, alerts } from "./mockData";
import { Bell, Clock } from "lucide-react";

/* MARKER-MAKE-KIT-INVOKED */

const pageTitles: Partial<Record<Page, string>> = {
  "dashboard":        "Dashboard",
  "live-map":         "Live Map",
  "soldiers":         "Soldiers",
  "alerts":           "Alert Center",
  "casualty-queue":   "Casualty Queue",
  "configure-suit":   "Configure Suit",
  "pair-suit":        "Pair New Suit",
  "suit-diagnostics": "Suit Diagnostics",
  "medical-records":  "Medical Records",
  "ai-analytics":     "AI Analytics",
  "zone-management":  "Zone Management",
  "reports":          "Reports",
  "settings":         "Settings",
};

function TopBar({ page, alertCount }: { page: Page; alertCount: number }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const criticalCount = soldiers.filter((s) => s.status === "critical").length;

  return (
    <div
      className="flex items-center justify-between px-6 py-3 border-b shrink-0"
      style={{ background: "#0B1220", borderColor: "#1B2A41" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#4A6282" }}>
          TRIAGE AI
        </span>
        <span style={{ color: "#1B2A41" }}>/</span>
        <span className="text-sm font-bold" style={{ color: "#E6EDF3" }}>
          {pageTitles[page] ?? page}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#00FF88" }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#00FF88" }}
          />
          LIVE
        </div>

        {criticalCount > 0 && (
          <motion.div
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded"
            style={{ background: "rgba(255,77,77,0.15)", color: "#FF4D4D", border: "1px solid rgba(255,77,77,0.3)" }}
          >
            ● {criticalCount} CRITICAL
          </motion.div>
        )}

        <div className="relative">
          <Bell size={16} style={{ color: "#4A6282" }} />
          {alertCount > 0 && (
            <div
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold"
              style={{ background: "#FF4D4D", color: "#050A12", fontSize: 8 }}
            >
              {alertCount}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#4A6282" }}>
          <Clock size={12} />
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </div>

        <div
          className="text-xs px-2.5 py-1 rounded border"
          style={{ borderColor: "#1B2A41", color: "#4A6282" }}
        >
          OPR · GHOST-6
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const criticalAlerts = alerts.filter((a) => a.severity === "critical").length;

  function handleNavigate(p: string) {
    setPage(p as Page);
  }

  function renderPage() {
    switch (page) {
      case "dashboard":        return <Dashboard onNavigate={handleNavigate} />;
      case "live-map":         return <LiveMap />;
      case "soldiers":         return <Soldiers />;
      case "alerts":           return <Alerts />;
      case "casualty-queue":   return <CasualtyQueue />;
      case "configure-suit":   return <ConfigureSuit />;
      case "pair-suit":        return <PairSuit />;
      case "suit-diagnostics": return <SuitDiagnostics />;
      case "medical-records":  return <MedicalRecords />;
      case "ai-analytics":     return <AIAnalytics />;
      case "zone-management":  return <ZoneManagement />;
      case "reports":          return <Reports />;
      case "settings":         return <AppSettings />;
      default:                 return <Dashboard onNavigate={handleNavigate} />;
    }
  }

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{
        background: "#050A12",
        color: "#E6EDF3",
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      }}
    >
      <Sidebar
        current={page}
        onChange={setPage}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar page={page} alertCount={criticalAlerts} />

        <div className="flex-1 overflow-hidden p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <EmergencyControls onNavigate={handleNavigate} />
    </div>
  );
}
