import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Map, Users, Bell, Ambulance, Settings2,
  Stethoscope, FileText, BrainCircuit, MapPin, ClipboardList,
  Settings, ChevronLeft, ChevronRight, Shield, Bluetooth,
} from "lucide-react";

export type Page =
  | "dashboard" | "live-map" | "soldiers" | "alerts" | "casualty-queue"
  | "configure-suit" | "pair-suit" | "suit-diagnostics" | "medical-records"
  | "ai-analytics" | "zone-management" | "reports" | "settings";

interface SidebarProps {
  current: Page;
  onChange: (p: Page) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const nav: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "live-map", label: "Live Map", icon: <Map size={18} /> },
  { id: "soldiers", label: "Soldiers", icon: <Users size={18} /> },
  { id: "alerts", label: "Alerts", icon: <Bell size={18} /> },
  { id: "casualty-queue", label: "Casualty Queue", icon: <Ambulance size={18} /> },
  { id: "configure-suit", label: "Configure Suit", icon: <Settings2 size={18} /> },
  { id: "pair-suit", label: "Pair New Suit", icon: <Bluetooth size={18} /> },
  { id: "suit-diagnostics", label: "Suit Diagnostics", icon: <Stethoscope size={18} /> },
  { id: "medical-records", label: "Medical Records", icon: <FileText size={18} /> },
  { id: "ai-analytics", label: "AI Analytics", icon: <BrainCircuit size={18} /> },
  { id: "zone-management", label: "Zone Management", icon: <MapPin size={18} /> },
  { id: "reports", label: "Reports", icon: <ClipboardList size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

export function Sidebar({ current, onChange, collapsed, onToggle }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-full shrink-0 overflow-hidden border-r"
      style={{ background: "#0B1220", borderColor: "#1B2A41" }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-4 border-b shrink-0"
        style={{ borderColor: "#1B2A41" }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded shrink-0"
          style={{ background: "rgba(0,255,136,0.15)", border: "1px solid #00FF88" }}
        >
          <Shield size={16} style={{ color: "#00FF88" }} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <div className="text-xs font-bold tracking-widest" style={{ color: "#00FF88" }}>
                TRIAGE AI
              </div>
              <div className="text-xs tracking-wider" style={{ color: "#4A6282" }}>
                COMMAND CENTER
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {nav.map((item) => {
          const active = current === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onChange(item.id)}
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 w-full px-2 py-2.5 rounded text-left transition-colors relative"
              style={{
                background: active ? "rgba(0,255,136,0.1)" : "transparent",
                color: active ? "#00FF88" : "#8097B1",
                border: active ? "1px solid rgba(0,255,136,0.2)" : "1px solid transparent",
              }}
            >
              <span className="shrink-0">{item.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-medium whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-4/5 rounded-l"
                  style={{ background: "#00FF88" }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t" style={{ borderColor: "#1B2A41" }}>
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full h-8 rounded transition-colors"
          style={{ background: "rgba(255,255,255,0.04)", color: "#4A6282" }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.aside>
  );
}
