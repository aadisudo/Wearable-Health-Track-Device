import { useState } from "react";
import { motion } from "motion/react";
import { Save, RotateCcw, Wifi, Radio, Network, Zap, CheckCircle } from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";

function SwitchRow({ label, checked, onCheckedChange }: { label: string; checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: "#1B2A41" }}>
      <span className="text-sm" style={{ color: "#E6EDF3" }}>{label}</span>
      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="w-10 h-5 rounded-full transition-colors outline-none cursor-pointer relative"
        style={{ background: checked ? "#00FF88" : "#1B2A41" }}
      >
        <Switch.Thumb
          className="block w-4 h-4 rounded-full transition-transform"
          style={{
            background: checked ? "#050A12" : "#4A6282",
            transform: checked ? "translateX(22px)" : "translateX(2px)",
          }}
        />
      </Switch.Root>
    </div>
  );
}

export function ConfigureSuit() {
  const [sensors, setSensors] = useState({
    heartRate: true, spo2: true, temperature: true, accelerometer: true, gps: true,
  });
  const [samplingRate, setSamplingRate] = useState("5");
  const [comms, setComms] = useState({ wifi: true, mesh: true, radio: false });
  const [emergency, setEmergency] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        {/* Sensors */}
        <div
          className="rounded-lg border p-4"
          style={{ background: "#0B1220", borderColor: "#1B2A41" }}
        >
          <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#00FF88" }}>
            Sensors
          </div>
          <SwitchRow label="Heart Rate Sensor" checked={sensors.heartRate} onCheckedChange={(v) => setSensors((p) => ({ ...p, heartRate: v }))} />
          <SwitchRow label="SpO₂ Sensor" checked={sensors.spo2} onCheckedChange={(v) => setSensors((p) => ({ ...p, spo2: v }))} />
          <SwitchRow label="Temperature Sensor" checked={sensors.temperature} onCheckedChange={(v) => setSensors((p) => ({ ...p, temperature: v }))} />
          <SwitchRow label="Accelerometer" checked={sensors.accelerometer} onCheckedChange={(v) => setSensors((p) => ({ ...p, accelerometer: v }))} />
          <SwitchRow label="GPS" checked={sensors.gps} onCheckedChange={(v) => setSensors((p) => ({ ...p, gps: v }))} />

          <div className="mt-4">
            <div className="text-xs mb-2" style={{ color: "#4A6282" }}>Sampling Rate</div>
            <Select.Root value={samplingRate} onValueChange={setSamplingRate}>
              <Select.Trigger
                className="flex items-center justify-between w-full px-3 py-2 rounded border text-sm outline-none cursor-pointer"
                style={{ background: "#060e1a", borderColor: "#1B2A41", color: "#E6EDF3" }}
              >
                <Select.Value />
                <Select.Icon>
                  <ChevronDown size={14} style={{ color: "#4A6282" }} />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="rounded border overflow-hidden z-50"
                  style={{ background: "#0B1220", borderColor: "#1B2A41" }}
                >
                  <Select.ScrollUpButton className="flex items-center justify-center py-1" style={{ color: "#4A6282" }}>
                    <ChevronUp size={14} />
                  </Select.ScrollUpButton>
                  <Select.Viewport>
                    {[["1", "1 second"], ["5", "5 seconds"], ["10", "10 seconds"], ["30", "30 seconds"]].map(([v, l]) => (
                      <Select.Item
                        key={v}
                        value={v}
                        className="px-3 py-2 text-sm cursor-pointer outline-none"
                        style={{ color: "#E6EDF3" }}
                      >
                        <Select.ItemText>{l}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex items-center justify-center py-1" style={{ color: "#4A6282" }}>
                    <ChevronDown size={14} />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>

        {/* Communication */}
        <div
          className="rounded-lg border p-4"
          style={{ background: "#0B1220", borderColor: "#1B2A41" }}
        >
          <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#00BFFF" }}>
            Communication
          </div>
          {[
            { key: "wifi", label: "WiFi", icon: <Wifi size={16} /> },
            { key: "mesh", label: "Mesh Network", icon: <Network size={16} /> },
            { key: "radio", label: "Radio Gateway", icon: <Radio size={16} /> },
          ].map(({ key, label, icon }) => (
            <div key={key} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: "#1B2A41" }}>
              <div className="flex items-center gap-2 text-sm" style={{ color: "#E6EDF3" }}>
                <span style={{ color: "#4A6282" }}>{icon}</span>
                {label}
              </div>
              <Switch.Root
                checked={comms[key as keyof typeof comms]}
                onCheckedChange={(v) => setComms((p) => ({ ...p, [key]: v }))}
                className="w-10 h-5 rounded-full transition-colors outline-none cursor-pointer relative"
                style={{ background: comms[key as keyof typeof comms] ? "#00BFFF" : "#1B2A41" }}
              >
                <Switch.Thumb
                  className="block w-4 h-4 rounded-full transition-transform"
                  style={{
                    background: comms[key as keyof typeof comms] ? "#050A12" : "#4A6282",
                    transform: comms[key as keyof typeof comms] ? "translateX(22px)" : "translateX(2px)",
                  }}
                />
              </Switch.Root>
            </div>
          ))}

          {/* Emergency mode */}
          <div className="mt-6">
            <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#FF4D4D" }}>
              Emergency Mode
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 text-sm" style={{ color: "#E6EDF3" }}>
                {emergency ? "ACTIVE" : "STANDBY"}
              </div>
              <Switch.Root
                checked={emergency}
                onCheckedChange={setEmergency}
                className="w-14 h-7 rounded-full transition-colors outline-none cursor-pointer relative"
                style={{ background: emergency ? "#FF4D4D" : "#1B2A41" }}
              >
                <Switch.Thumb
                  className="block w-5 h-5 rounded-full transition-transform"
                  style={{
                    background: emergency ? "#050A12" : "#4A6282",
                    transform: emergency ? "translateX(34px)" : "translateX(2px)",
                  }}
                />
              </Switch.Root>
            </div>
            {emergency && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-2 text-xs px-2 py-1.5 rounded"
                style={{ background: "#FF4D4D18", color: "#FF4D4D", border: "1px solid #FF4D4D40" }}
              >
                ⚠ Emergency beacon active — broadcasting on all channels
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded text-sm font-bold transition-colors"
          style={{ background: saved ? "#00FF88" : "rgba(0,255,136,0.15)", color: saved ? "#050A12" : "#00FF88", border: "1px solid #00FF88" }}
        >
          {saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saved ? "Saved!" : "Save Configuration"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setSensors({ heartRate: true, spo2: true, temperature: true, accelerometer: true, gps: true }); setSamplingRate("5"); setComms({ wifi: true, mesh: true, radio: false }); setEmergency(false); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-bold"
          style={{ background: "transparent", color: "#4A6282", border: "1px solid #1B2A41" }}
        >
          <RotateCcw size={16} /> Reset
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-bold"
          style={{ background: "rgba(0,191,255,0.15)", color: "#00BFFF", border: "1px solid #00BFFF40" }}
        >
          <Zap size={16} /> Test Sensors
        </motion.button>
      </div>
    </div>
  );
}
