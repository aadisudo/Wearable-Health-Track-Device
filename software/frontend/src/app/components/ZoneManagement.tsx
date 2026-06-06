import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Shield, AlertTriangle, Ban } from "lucide-react";

type ZoneType = "safe" | "restricted" | "danger";

interface Zone {
  id: string;
  name: string;
  type: ZoneType;
  x: number;
  y: number;
  w: number;
  h: number;
}

const zoneConfig: Record<ZoneType, { color: string; label: string; icon: React.ReactNode }> = {
  safe:       { color: "#00FF88", label: "Safe Zone",       icon: <Shield size={14} /> },
  restricted: { color: "#FFC857", label: "Restricted Zone", icon: <AlertTriangle size={14} /> },
  danger:     { color: "#FF4D4D", label: "Danger Zone",     icon: <Ban size={14} /> },
};

const initialZones: Zone[] = [
  { id: "z1", name: "Alpha Base",    type: "safe",       x: 8,  y: 10, w: 22, h: 30 },
  { id: "z2", name: "Sector C-7",    type: "danger",     x: 60, y: 48, w: 28, h: 35 },
  { id: "z3", name: "Grid B-4",      type: "restricted", x: 35, y: 55, w: 20, h: 22 },
];

export function ZoneManagement() {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [creating, setCreating] = useState<ZoneType | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  function addZone(type: ZoneType) {
    const newZone: Zone = {
      id: `z${Date.now()}`,
      name: `New ${zoneConfig[type].label}`,
      type,
      x: 20 + Math.random() * 40,
      y: 20 + Math.random() * 40,
      w: 18,
      h: 16,
    };
    setZones((z) => [...z, newZone]);
    setCreating(null);
  }

  function removeZone(id: string) {
    setZones((z) => z.filter((zz) => zz.id !== id));
    if (selected === id) setSelected(null);
  }

  return (
    <div className="flex gap-4 h-full overflow-hidden">
      {/* Map area */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Toolbar */}
        <div className="flex gap-3 items-center">
          <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#4A6282" }}>Add Zone:</span>
          {(["safe", "restricted", "danger"] as ZoneType[]).map((type) => {
            const { color, label, icon } = zoneConfig[type];
            return (
              <motion.button
                key={type}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => addZone(type)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors"
                style={{ background: `${color}10`, borderColor: `${color}40`, color }}
              >
                {icon} {label}
              </motion.button>
            );
          })}
        </div>

        {/* Map */}
        <div
          className="flex-1 relative rounded-lg border overflow-hidden"
          style={{ background: "#0B1220", borderColor: "#1B2A41", minHeight: 360 }}
          onClick={() => setSelected(null)}
        >
          {/* grid */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <pattern id="zmgrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1B2A41" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#zmgrid)" />
            {["A","B","C","D","E","F"].map((l, i) => (
              <text key={l} x={i * 50 + 25} y={14} fill="#1B2A4160" fontSize="10" textAnchor="middle">{l}</text>
            ))}
            {[1,2,3,4,5,6].map((n, i) => (
              <text key={n} x={12} y={i * 50 + 32} fill="#1B2A4160" fontSize="10" textAnchor="middle">{n}</text>
            ))}
          </svg>

          {/* Zones */}
          {zones.map((zone) => {
            const { color } = zoneConfig[zone.type];
            const isSelected = selected === zone.id;
            return (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  left: `${zone.x}%`, top: `${zone.y}%`,
                  width: `${zone.w}%`, height: `${zone.h}%`,
                  position: "absolute",
                  background: `${color}0A`,
                  border: `2px ${isSelected ? "solid" : "dashed"} ${color}60`,
                  borderRadius: 6,
                }}
                whileHover={{ background: `${color}14` }}
                onClick={(e) => { e.stopPropagation(); setSelected(zone.id); }}
                className="cursor-pointer"
              >
                <div
                  className="absolute top-1 left-2 text-xs font-semibold flex items-center gap-1"
                  style={{ color }}
                >
                  {zoneConfig[zone.type].icon}
                  {zone.name}
                </div>
                {isSelected && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={(e) => { e.stopPropagation(); removeZone(zone.id); }}
                    className="absolute top-1 right-1 p-1 rounded"
                    style={{ background: "rgba(255,77,77,0.2)", color: "#FF4D4D" }}
                  >
                    <Trash2 size={12} />
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Zone list panel */}
      <div
        className="w-56 rounded-lg border flex flex-col overflow-hidden shrink-0"
        style={{ background: "#0B1220", borderColor: "#1B2A41" }}
      >
        <div className="px-4 py-3 border-b text-xs font-bold tracking-widest uppercase" style={{ borderColor: "#1B2A41", color: "#E6EDF3" }}>
          Active Zones
        </div>
        <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: "#1B2A41" }}>
          {zones.map((zone) => {
            const { color, icon } = zoneConfig[zone.type];
            return (
              <div
                key={zone.id}
                onClick={() => setSelected(zone.id === selected ? null : zone.id)}
                className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
                style={{ borderLeft: selected === zone.id ? `2px solid ${color}` : "2px solid transparent" }}
              >
                <span style={{ color }}>{icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate" style={{ color: "#E6EDF3" }}>{zone.name}</div>
                  <div className="text-xs" style={{ color: "#4A6282" }}>{zoneConfig[zone.type].label}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeZone(zone.id); }}
                  style={{ color: "#4A6282" }}
                  className="hover:text-red-400 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="p-3 border-t" style={{ borderColor: "#1B2A41" }}>
          <div className="text-xs" style={{ color: "#4A6282" }}>{zones.length} zone{zones.length !== 1 ? "s" : ""} defined</div>
        </div>
      </div>
    </div>
  );
}
