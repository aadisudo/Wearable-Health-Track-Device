import { motion } from "motion/react";
import { Heart, Wind, Activity, Battery, Cpu, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type DiagStatus = "Healthy" | "Warning" | "Failed";

interface DiagItem {
  label: string;
  icon: React.ReactNode;
  status: DiagStatus;
  detail: string;
  value?: string;
}

const statusStyle: Record<DiagStatus, { color: string; bg: string; icon: React.ReactNode }> = {
  Healthy: { color: "#00FF88", bg: "rgba(0,255,136,0.12)", icon: <CheckCircle size={14} /> },
  Warning: { color: "#FFC857", bg: "rgba(255,200,87,0.12)", icon: <AlertTriangle size={14} /> },
  Failed:  { color: "#FF4D4D", bg: "rgba(255,77,77,0.12)",  icon: <XCircle size={14} /> },
};

const suites: Record<string, DiagItem[]> = {
  "SUIT-001": [
    { label: "Heart Rate Sensor", icon: <Heart size={18} />, status: "Healthy", detail: "Signal strong · Last read 0.3s ago", value: "72 BPM" },
    { label: "SpO₂ Sensor",       icon: <Wind size={18} />,  status: "Healthy", detail: "Calibrated · Accuracy ±1%",          value: "98%" },
    { label: "Accelerometer",     icon: <Activity size={18} />, status: "Warning", detail: "Axis-Z drift detected · Recalibrate", value: "±0.4g" },
    { label: "Battery Health",    icon: <Battery size={18} />, status: "Healthy", detail: "Charge cycles: 42 / 500",            value: "87%" },
    { label: "Firmware",          icon: <Cpu size={18} />,   status: "Healthy", detail: "Up to date",                          value: "v3.2.1" },
  ],
  "SUIT-002": [
    { label: "Heart Rate Sensor", icon: <Heart size={18} />, status: "Warning", detail: "Intermittent signal · Check contact", value: "138 BPM" },
    { label: "SpO₂ Sensor",       icon: <Wind size={18} />,  status: "Failed",  detail: "Sensor offline · Replace probe",      value: "—" },
    { label: "Accelerometer",     icon: <Activity size={18} />, status: "Healthy", detail: "All axes nominal",                 value: "OK" },
    { label: "Battery Health",    icon: <Battery size={18} />, status: "Warning", detail: "Charge cycles: 487 / 500",          value: "34%" },
    { label: "Firmware",          icon: <Cpu size={18} />,   status: "Warning", detail: "Update available: v3.2.1",            value: "v3.1.8" },
  ],
  "SUIT-003": [
    { label: "Heart Rate Sensor", icon: <Heart size={18} />, status: "Healthy", detail: "Factory fresh · All tests pass",      value: "—" },
    { label: "SpO₂ Sensor",       icon: <Wind size={18} />,  status: "Healthy", detail: "Factory fresh · All tests pass",      value: "—" },
    { label: "Accelerometer",     icon: <Activity size={18} />, status: "Healthy", detail: "Calibrated",                      value: "OK" },
    { label: "Battery Health",    icon: <Battery size={18} />, status: "Healthy", detail: "Full charge · New unit",             value: "100%" },
    { label: "Firmware",          icon: <Cpu size={18} />,   status: "Healthy", detail: "Up to date",                          value: "v3.2.1" },
  ],
};

export function SuitDiagnostics() {
  const suitIds = Object.keys(suites);

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {suitIds.map((suitId, suitIdx) => {
        const items = suites[suitId];
        const failed  = items.filter((i) => i.status === "Failed").length;
        const warning = items.filter((i) => i.status === "Warning").length;
        const overall: DiagStatus = failed > 0 ? "Failed" : warning > 0 ? "Warning" : "Healthy";
        const { color: oc } = statusStyle[overall];

        return (
          <motion.div
            key={suitId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: suitIdx * 0.1 }}
            className="rounded-lg border overflow-hidden"
            style={{ background: "#0B1220", borderColor: "#1B2A41" }}
          >
            {/* Suit header */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ borderColor: "#1B2A41", background: "#060e1a" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: oc, boxShadow: `0 0 6px ${oc}` }}
                />
                <span className="text-sm font-bold tracking-widest" style={{ color: "#E6EDF3" }}>
                  {suitId}
                </span>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: statusStyle[overall].bg, color: oc }}
              >
                {overall}
              </span>
            </div>

            {/* Diagnostics grid */}
            <div className="grid grid-cols-5 divide-x" style={{ borderColor: "#1B2A41" }}>
              {items.map((item, idx) => {
                const { color, bg, icon: statusIcon } = statusStyle[item.status];
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
                    className="p-4 space-y-3 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div style={{ color: "#4A6282" }}>{item.icon}</div>
                      <div
                        className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: bg, color }}
                      >
                        {statusIcon}
                        <span className="ml-0.5">{item.status}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-0.5" style={{ color: "#E6EDF3" }}>
                        {item.label}
                      </div>
                      {item.value && (
                        <div className="text-lg font-bold" style={{ color }}>
                          {item.value}
                        </div>
                      )}
                      <div className="text-xs mt-1 leading-tight" style={{ color: "#4A6282" }}>
                        {item.detail}
                      </div>
                    </div>
                    {/* status bar */}
                    <div className="h-1 rounded-full" style={{ background: "#1B2A41" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: item.status === "Healthy" ? "100%" : item.status === "Warning" ? "55%" : "10%" }}
                        transition={{ delay: suitIdx * 0.12 + idx * 0.05, duration: 0.7 }}
                        className="h-full rounded-full"
                        style={{ background: color }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
