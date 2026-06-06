import { motion } from "motion/react";
import { FileText, Download, Calendar, Users, AlertTriangle, Activity } from "lucide-react";
import { soldiers, alerts } from "../mockData";

const reports = [
  {
    id: "R-001",
    title: "Daily Operational Summary",
    type: "Operational",
    date: "2024-06-03",
    time: "14:00",
    icon: <Activity size={16} />,
    color: "#00BFFF",
    summary: `Total personnel: ${soldiers.length}. Active: ${soldiers.filter(s => s.status !== "offline").length}. Critical casualties: ${soldiers.filter(s => s.status === "critical").length}. Offline units: ${soldiers.filter(s => s.status === "offline").length}.`,
    stats: [
      { label: "Total Soldiers", value: soldiers.length },
      { label: "Active", value: soldiers.filter(s => s.status !== "offline").length },
      { label: "Critical", value: soldiers.filter(s => s.status === "critical").length },
    ],
  },
  {
    id: "R-002",
    title: "Alert Incident Report",
    type: "Security",
    date: "2024-06-03",
    time: "13:45",
    icon: <AlertTriangle size={16} />,
    color: "#FF4D4D",
    summary: `${alerts.length} alerts recorded. ${alerts.filter(a => a.severity === "critical").length} critical, ${alerts.filter(a => a.severity === "warning").length} warnings, ${alerts.filter(a => a.severity === "information").length} informational.`,
    stats: [
      { label: "Total Alerts", value: alerts.length },
      { label: "Critical", value: alerts.filter(a => a.severity === "critical").length },
      { label: "Warnings", value: alerts.filter(a => a.severity === "warning").length },
    ],
  },
  {
    id: "R-003",
    title: "Medical Triage Report",
    type: "Medical",
    date: "2024-06-03",
    time: "12:30",
    icon: <Users size={16} />,
    color: "#00FF88",
    summary: "Triage classification complete. 4 stable, 2 serious requiring monitoring, 1 critical requiring immediate evacuation, 1 MIA.",
    stats: [
      { label: "Stable", value: 4 },
      { label: "Serious", value: 2 },
      { label: "Critical", value: 1 },
    ],
  },
  {
    id: "R-004",
    title: "Suit Health Diagnostics",
    type: "Equipment",
    date: "2024-06-03",
    time: "11:00",
    icon: <FileText size={16} />,
    color: "#FFC857",
    summary: "3 suits diagnostics complete. SUIT-001: Healthy. SUIT-002: 2 sensor failures, firmware outdated. SUIT-003: All systems nominal.",
    stats: [
      { label: "Total Suits", value: 3 },
      { label: "Healthy", value: 2 },
      { label: "Warnings", value: 1 },
    ],
  },
];

export function Reports() {
  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest font-bold" style={{ color: "#4A6282" }}>
          Generated Reports — {new Date().toLocaleDateString()}
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 text-xs px-3 py-1.5 rounded border"
          style={{ background: "rgba(0,191,255,0.1)", borderColor: "#00BFFF40", color: "#00BFFF" }}
        >
          <Download size={12} /> Export All
        </motion.button>
      </div>

      {reports.map((r, i) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -1 }}
          className="rounded-lg border p-5"
          style={{ background: "#0B1220", borderColor: "#1B2A41" }}
        >
          <div className="flex items-start gap-4">
            <div
              className="p-2.5 rounded-lg shrink-0"
              style={{ background: `${r.color}15`, color: r.color }}
            >
              {r.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-sm font-bold" style={{ color: "#E6EDF3" }}>{r.title}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${r.color}15`, color: r.color }}
                >
                  {r.type}
                </span>
                <span className="text-xs" style={{ color: "#4A6282" }}>
                  {r.id}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: "#4A6282" }}>
                <Calendar size={11} />
                {r.date} · {r.time}
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "#8097B1" }}>{r.summary}</p>
              <div className="flex items-center gap-6">
                {r.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-xs" style={{ color: "#4A6282" }}>{s.label}</div>
                    <div className="text-lg font-bold" style={{ color: r.color }}>{s.value}</div>
                  </div>
                ))}
                <div className="flex-1" />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border"
                  style={{ background: "transparent", borderColor: "#1B2A41", color: "#4A6282" }}
                >
                  <Download size={12} /> Download PDF
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
