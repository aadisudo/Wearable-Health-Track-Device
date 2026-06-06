import { useState } from "react";
import { motion } from "motion/react";
import * as Switch from "@radix-ui/react-switch";
import { Bell, Shield, Monitor, Wifi, Save, CheckCircle } from "lucide-react";

function SettingRow({
  label, desc, checked, onCheckedChange, color = "#00FF88",
}: {
  label: string; desc: string; checked: boolean; onCheckedChange: (v: boolean) => void; color?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: "#1B2A41" }}>
      <div>
        <div className="text-sm" style={{ color: "#E6EDF3" }}>{label}</div>
        <div className="text-xs mt-0.5" style={{ color: "#4A6282" }}>{desc}</div>
      </div>
      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="w-10 h-5 rounded-full transition-colors outline-none cursor-pointer relative shrink-0"
        style={{ background: checked ? color : "#1B2A41" }}
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

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-5" style={{ background: "#0B1220", borderColor: "#1B2A41" }}>
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: "#00BFFF" }}>{icon}</span>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#E6EDF3" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export function AppSettings() {
  const [notifs, setNotifs] = useState({ critical: true, warning: true, info: false, sound: true });
  const [security, setSecurity] = useState({ twoFactor: false, autoLock: true, auditLog: true });
  const [display, setDisplay] = useState({ animations: true, compactMode: false, highContrast: false });
  const [network, setNetwork] = useState({ autoReconnect: true, offlineMode: false, compression: true });
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <Section title="Notifications" icon={<Bell size={16} />}>
          <SettingRow label="Critical Alerts" desc="Immediate notification for critical events" checked={notifs.critical} onCheckedChange={(v) => setNotifs(p => ({ ...p, critical: v }))} color="#FF4D4D" />
          <SettingRow label="Warning Alerts" desc="Notifications for warning level events" checked={notifs.warning} onCheckedChange={(v) => setNotifs(p => ({ ...p, warning: v }))} color="#FFC857" />
          <SettingRow label="Informational" desc="Low-priority status updates" checked={notifs.info} onCheckedChange={(v) => setNotifs(p => ({ ...p, info: v }))} color="#00BFFF" />
          <SettingRow label="Sound Alerts" desc="Audio cues for incoming alerts" checked={notifs.sound} onCheckedChange={(v) => setNotifs(p => ({ ...p, sound: v }))} />
        </Section>

        <Section title="Security" icon={<Shield size={16} />}>
          <SettingRow label="Two-Factor Auth" desc="Require 2FA on login" checked={security.twoFactor} onCheckedChange={(v) => setSecurity(p => ({ ...p, twoFactor: v }))} />
          <SettingRow label="Auto Lock" desc="Lock after 10 minutes of inactivity" checked={security.autoLock} onCheckedChange={(v) => setSecurity(p => ({ ...p, autoLock: v }))} />
          <SettingRow label="Audit Log" desc="Record all configuration changes" checked={security.auditLog} onCheckedChange={(v) => setSecurity(p => ({ ...p, auditLog: v }))} />
        </Section>

        <Section title="Display" icon={<Monitor size={16} />}>
          <SettingRow label="Animations" desc="Page transitions and motion effects" checked={display.animations} onCheckedChange={(v) => setDisplay(p => ({ ...p, animations: v }))} />
          <SettingRow label="Compact Mode" desc="Reduce padding and element sizes" checked={display.compactMode} onCheckedChange={(v) => setDisplay(p => ({ ...p, compactMode: v }))} />
          <SettingRow label="High Contrast" desc="Increase visual contrast for low-light environments" checked={display.highContrast} onCheckedChange={(v) => setDisplay(p => ({ ...p, highContrast: v }))} />
        </Section>

        <Section title="Network" icon={<Wifi size={16} />}>
          <SettingRow label="Auto Reconnect" desc="Automatically reconnect on signal loss" checked={network.autoReconnect} onCheckedChange={(v) => setNetwork(p => ({ ...p, autoReconnect: v }))} />
          <SettingRow label="Offline Mode" desc="Cache data for offline operations" checked={network.offlineMode} onCheckedChange={(v) => setNetwork(p => ({ ...p, offlineMode: v }))} />
          <SettingRow label="Data Compression" desc="Compress suit telemetry streams" checked={network.compression} onCheckedChange={(v) => setNetwork(p => ({ ...p, compression: v }))} />
        </Section>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-2.5 rounded text-sm font-bold"
        style={{
          background: saved ? "#00FF88" : "rgba(0,255,136,0.15)",
          color: saved ? "#050A12" : "#00FF88",
          border: "1px solid #00FF88",
        }}
      >
        {saved ? <CheckCircle size={16} /> : <Save size={16} />}
        {saved ? "Settings Saved!" : "Save Settings"}
      </motion.button>
    </div>
  );
}
