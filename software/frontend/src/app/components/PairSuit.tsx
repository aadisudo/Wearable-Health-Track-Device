import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bluetooth, CheckCircle, ClipboardList, Plus, Loader } from "lucide-react";
import { mockSuits } from "../mockData";

export function PairSuit() {
  const [pairing, setPairing] = useState<string | null>(null);
  const [paired, setPaired] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);

  function handlePair(id: string) {
    setPairing(id);
    setTimeout(() => {
      setPairing(null);
      setPaired((p) => [...p, id]);
    }, 2000);
  }

  function handleScan() {
    setScanning(true);
    setTimeout(() => setScanning(false), 3000);
  }

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {/* Scan button */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleScan}
          className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-bold"
          style={{ background: "rgba(0,191,255,0.15)", color: "#00BFFF", border: "1px solid #00BFFF40" }}
        >
          {scanning ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <Loader size={16} />
            </motion.div>
          ) : (
            <Bluetooth size={16} />
          )}
          {scanning ? "Scanning..." : "Scan for Devices"}
        </motion.button>
        <div className="text-xs" style={{ color: "#4A6282" }}>
          {mockSuits.length} device(s) detected
        </div>
      </div>

      {/* Scanning animation */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 80 }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg overflow-hidden flex items-center justify-center"
            style={{ background: "#0B1220", border: "1px solid #1B2A41" }}
          >
            <div className="relative w-16 h-16">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: "#00BFFF" }}
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.5 }}
                />
              ))}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-full"
                style={{ background: "rgba(0,191,255,0.15)", color: "#00BFFF" }}
              >
                <Bluetooth size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Devices */}
      <div className="space-y-3">
        {mockSuits.map((suit, i) => {
          const isPaired = paired.includes(suit.id) || suit.status === "paired";
          const isPairing = pairing === suit.id;
          return (
            <motion.div
              key={suit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 p-4 rounded-lg border"
              style={{
                background: "#0B1220",
                borderColor: isPaired ? "#00FF8840" : "#1B2A41",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: isPaired ? "rgba(0,255,136,0.15)" : "rgba(0,191,255,0.1)", color: isPaired ? "#00FF88" : "#00BFFF" }}
              >
                <Bluetooth size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: "#E6EDF3" }}>{suit.id}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full capitalize"
                    style={{
                      background: isPaired ? "rgba(0,255,136,0.15)" : "rgba(0,191,255,0.1)",
                      color: isPaired ? "#00FF88" : "#00BFFF",
                    }}
                  >
                    {suit.status}
                  </span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#4A6282" }}>
                  Firmware {suit.firmware} · Battery {suit.battery}% · Soldier: {suit.soldier}
                </div>
              </div>

              <div className="flex gap-2">
                {!isPaired && !isPairing && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePair(suit.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold"
                    style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88", border: "1px solid #00FF8840" }}
                  >
                    <Plus size={12} /> Pair
                  </motion.button>
                )}
                {isPairing && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs" style={{ color: "#00BFFF" }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Loader size={12} />
                    </motion.div>
                    Pairing...
                  </div>
                )}
                {isPaired && !isPairing && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs" style={{ color: "#00FF88" }}>
                    <CheckCircle size={12} /> Paired
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold"
                  style={{ background: "rgba(0,191,255,0.1)", color: "#00BFFF", border: "1px solid #00BFFF30" }}
                >
                  <ClipboardList size={12} /> Register
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold"
                  style={{ background: "rgba(255,200,87,0.1)", color: "#FFC857", border: "1px solid #FFC85730" }}
                >
                  Run Diagnostics
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
