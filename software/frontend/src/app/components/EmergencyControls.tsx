import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings2, Bluetooth, BrainCircuit, ShieldAlert, X, AlertTriangle } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface EmergencyControlsProps {
  onNavigate: (p: string) => void;
}

export function EmergencyControls({ onNavigate }: EmergencyControlsProps) {
  const [massCasOpen, setMassCasOpen] = useState(false);
  const [massCasActive, setMassCasActive] = useState(false);

  function activateMassCas() {
    setMassCasActive(true);
    setMassCasOpen(false);
  }

  return (
    <>
      {/* Fixed bottom-right panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-40 flex flex-col gap-2"
      >
        {/* Action buttons */}
        <div
          className="flex flex-col gap-1.5 p-2 rounded-lg border"
          style={{ background: "#0B1220", borderColor: "#1B2A41" }}
        >
          {[
            { label: "Configure Suit", icon: <Settings2 size={14} />, page: "configure-suit", color: "#00FF88" },
            { label: "Pair New Suit",  icon: <Bluetooth size={14} />, page: "pair-suit",      color: "#00BFFF" },
            { label: "AI Settings",   icon: <BrainCircuit size={14} />, page: "ai-analytics", color: "#8B5CF6" },
            { label: "Protocols",     icon: <ShieldAlert size={14} />, page: "alerts",        color: "#FFC857" },
          ].map(({ label, icon, page, color }) => (
            <motion.button
              key={label}
              whileHover={{ x: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate(page)}
              className="flex items-center gap-2 text-xs px-3 py-2 rounded whitespace-nowrap transition-colors"
              style={{ background: `${color}10`, color, border: `1px solid ${color}30` }}
            >
              {icon} {label}
            </motion.button>
          ))}
        </div>

        {/* MASS CASUALTY button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setMassCasOpen(true)}
          className="relative overflow-hidden px-4 py-3 rounded-lg text-sm font-black tracking-widest uppercase w-full"
          style={{
            background: massCasActive
              ? "rgba(255,77,77,0.25)"
              : "rgba(255,77,77,0.15)",
            color: "#FF4D4D",
            border: `2px solid ${massCasActive ? "#FF4D4D" : "#FF4D4D80"}`,
            boxShadow: massCasActive ? "0 0 20px #FF4D4D50" : undefined,
          }}
          animate={massCasActive ? { boxShadow: ["0 0 10px #FF4D4D40", "0 0 30px #FF4D4D80", "0 0 10px #FF4D4D40"] } : {}}
          transition={massCasActive ? { repeat: Infinity, duration: 1.5 } : {}}
        >
          {massCasActive && (
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              style={{ background: "#FF4D4D" }}
            />
          )}
          <span className="relative flex items-center justify-center gap-2">
            <AlertTriangle size={16} />
            {massCasActive ? "MASS CAS ACTIVE" : "MASS CASUALTY MODE"}
          </span>
        </motion.button>
      </motion.div>

      {/* Confirmation dialog */}
      <Dialog.Root open={massCasOpen} onOpenChange={setMassCasOpen}>
        <Dialog.Portal>
          <Dialog.Overlay asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(5,10,18,0.85)", backdropFilter: "blur(4px)" }}
            />
          </Dialog.Overlay>
          <Dialog.Content asChild>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div
                className="w-full max-w-md rounded-xl border overflow-hidden"
                style={{ background: "#0B1220", borderColor: "#FF4D4D80" }}
              >
                {/* Header */}
                <div
                  className="flex items-center gap-3 px-6 py-4 border-b"
                  style={{ background: "rgba(255,77,77,0.1)", borderColor: "#FF4D4D40" }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <AlertTriangle size={22} style={{ color: "#FF4D4D" }} />
                  </motion.div>
                  <div>
                    <div className="text-sm font-black tracking-widest uppercase" style={{ color: "#FF4D4D" }}>
                      MASS CASUALTY PROTOCOL
                    </div>
                    <div className="text-xs" style={{ color: "#FF9494" }}>CONFIRMATION REQUIRED</div>
                  </div>
                  <button
                    onClick={() => setMassCasOpen(false)}
                    className="ml-auto"
                    style={{ color: "#4A6282" }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">
                  <p className="text-sm leading-relaxed" style={{ color: "#E6EDF3" }}>
                    Activating <strong style={{ color: "#FF4D4D" }}>Mass Casualty Mode</strong> will:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Broadcast emergency beacon on all suit frequencies",
                      "Escalate all critical alerts to command level",
                      "Auto-request medical evacuation for all critical soldiers",
                      "Override standard triage priorities — all resources to critical",
                      "Log incident with timestamp for after-action review",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#8097B1" }}>
                        <span style={{ color: "#FF4D4D", marginTop: 1 }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="p-3 rounded text-xs"
                    style={{ background: "rgba(255,77,77,0.1)", color: "#FF9494", border: "1px solid rgba(255,77,77,0.3)" }}
                  >
                    ⚠ This action cannot be undone without command-level authorization.
                  </div>
                </div>

                {/* Actions */}
                <div
                  className="flex gap-3 px-6 py-4 border-t"
                  style={{ borderColor: "#1B2A41" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={activateMassCas}
                    className="flex-1 py-3 rounded-lg text-sm font-black tracking-widest uppercase"
                    style={{ background: "#FF4D4D", color: "#050A12" }}
                  >
                    CONFIRM ACTIVATION
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMassCasOpen(false)}
                    className="px-6 py-3 rounded-lg text-sm font-semibold"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#8097B1", border: "1px solid #1B2A41" }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
