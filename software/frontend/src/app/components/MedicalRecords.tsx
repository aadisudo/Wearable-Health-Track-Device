import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown, ChevronUp, Droplets, AlertOctagon, Bandage, Pill } from "lucide-react";
import { soldiers } from "../mockData";

const bgColor: Record<string, string> = {
  "O+": "#00FF88", "O-": "#00FF88", "A+": "#00BFFF", "A-": "#00BFFF",
  "B+": "#FFC857", "B-": "#FFC857", "AB+": "#FF4D4D", "AB-": "#FF4D4D",
};

export function MedicalRecords() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = soldiers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  function toggle(id: string) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#4A6282" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search records..."
          className="w-full pl-9 pr-4 py-2 rounded border text-xs outline-none"
          style={{ background: "#0B1220", borderColor: "#1B2A41", color: "#E6EDF3" }}
        />
      </div>

      <div className="space-y-2">
        {filtered.map((s, i) => {
          const isOpen = expanded === s.id;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-lg border overflow-hidden"
              style={{ background: "#0B1220", borderColor: "#1B2A41" }}
            >
              {/* Row header */}
              <button
                className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-colors"
                onClick={() => toggle(s.id)}
              >
                {/* Blood type badge */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black shrink-0"
                  style={{
                    background: `${bgColor[s.bloodGroup] || "#4A6282"}20`,
                    color: bgColor[s.bloodGroup] || "#4A6282",
                    border: `1px solid ${bgColor[s.bloodGroup] || "#4A6282"}40`,
                  }}
                >
                  {s.bloodGroup}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-semibold" style={{ color: "#E6EDF3" }}>{s.name}</div>
                  <div className="text-xs" style={{ color: "#4A6282" }}>
                    {s.id} · {s.rank} · {s.squad} Squad
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs shrink-0" style={{ color: "#4A6282" }}>
                  <span>{s.allergies.length} allerg{s.allergies.length === 1 ? "y" : "ies"}</span>
                  <span>{s.injuries.length} injur{s.injuries.length === 1 ? "y" : "ies"}</span>
                  <span>{s.treatments.length} treatment{s.treatments.length !== 1 ? "s" : ""}</span>
                  <span style={{ color: "#4A6282" }}>{isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="grid grid-cols-4 gap-0 border-t divide-x"
                      style={{ borderColor: "#1B2A41" }}
                    >
                      {/* Blood Group */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Droplets size={14} style={{ color: "#00BFFF" }} />
                          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4A6282" }}>
                            Blood Group
                          </span>
                        </div>
                        <div
                          className="text-3xl font-black"
                          style={{ color: bgColor[s.bloodGroup] || "#4A6282" }}
                        >
                          {s.bloodGroup}
                        </div>
                        <div className="mt-1 text-xs" style={{ color: "#4A6282" }}>Blood type on file</div>
                      </div>

                      {/* Allergies */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertOctagon size={14} style={{ color: "#FFC857" }} />
                          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4A6282" }}>
                            Allergies
                          </span>
                        </div>
                        {s.allergies.length === 0 ? (
                          <div className="text-xs" style={{ color: "#4A6282" }}>No known allergies</div>
                        ) : (
                          <div className="space-y-1.5">
                            {s.allergies.map((a) => (
                              <div
                                key={a}
                                className="text-xs px-2.5 py-1.5 rounded"
                                style={{ background: "rgba(255,200,87,0.12)", color: "#FFC857", border: "1px solid rgba(255,200,87,0.25)" }}
                              >
                                ⚠ {a}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Injuries */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Bandage size={14} style={{ color: "#FF4D4D" }} />
                          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4A6282" }}>
                            Previous Injuries
                          </span>
                        </div>
                        {s.injuries.length === 0 ? (
                          <div className="text-xs" style={{ color: "#4A6282" }}>No recorded injuries</div>
                        ) : (
                          <div className="space-y-1.5">
                            {s.injuries.map((inj) => (
                              <div
                                key={inj}
                                className="text-xs px-2.5 py-1.5 rounded"
                                style={{ background: "rgba(255,77,77,0.1)", color: "#FF9494", border: "1px solid rgba(255,77,77,0.2)" }}
                              >
                                {inj}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Treatments */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Pill size={14} style={{ color: "#00FF88" }} />
                          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4A6282" }}>
                            Treatments
                          </span>
                        </div>
                        {s.treatments.length === 0 ? (
                          <div className="text-xs" style={{ color: "#4A6282" }}>No active treatments</div>
                        ) : (
                          <div className="space-y-1.5">
                            {s.treatments.map((t) => (
                              <div
                                key={t}
                                className="text-xs px-2.5 py-1.5 rounded"
                                style={{ background: "rgba(0,255,136,0.08)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.2)" }}
                              >
                                ✓ {t}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
