import { motion } from "motion/react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from "recharts";
import { injuryDistribution, squadHealth, survivalData, alertFrequency } from "../mockData";
import { BrainCircuit, TrendingUp, Activity, AlertTriangle } from "lucide-react";

const CARD = "#0B1220";
const BORDER = "#1B2A41";

function ChartCard({ title, icon, children, delay }: { title: string; icon: React.ReactNode; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2 }}
      className="rounded-lg border p-4"
      style={{ background: CARD, borderColor: BORDER }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: "#00BFFF" }}>{icon}</span>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#E6EDF3" }}>{title}</span>
      </div>
      {children}
    </motion.div>
  );
}

const CustomTooltipStyle: React.CSSProperties = {
  background: "#0B1220",
  border: "1px solid #1B2A41",
  borderRadius: 6,
  color: "#E6EDF3",
  fontSize: 12,
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={CustomTooltipStyle} className="px-3 py-2">
      {label && <div style={{ color: "#4A6282", marginBottom: 4 }}>{label}</div>}
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color || p.fill || "#E6EDF3" }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
}

// Radar data for squad health
const radarData = squadHealth.map((s) => ({
  squad: s.squad,
  "Health Score": s.score,
  "Readiness": s.score - 5 + Math.round(Math.random() * 10),
  "Mobility": s.score - 10 + Math.round(Math.random() * 15),
}));

export function AIAnalytics() {
  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {/* AI insight banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-start gap-3 p-4 rounded-lg border"
        style={{ background: "rgba(0,191,255,0.06)", borderColor: "rgba(0,191,255,0.25)" }}
      >
        <BrainCircuit size={18} style={{ color: "#00BFFF", flexShrink: 0, marginTop: 1 }} />
        <div>
          <div className="text-xs font-bold mb-1" style={{ color: "#00BFFF" }}>AI ASSESSMENT — UPDATED 14:34 LOCAL</div>
          <div className="text-xs leading-relaxed" style={{ color: "#8097B1" }}>
            Charlie Squad shows highest casualty risk (score: 41/100). Recommend immediate medical extraction for S-005.
            Blast trauma incidents up 40% in the last 2 hours — possible IED corridor in sectors B6–C7.
            Survival probability for critical soldiers improves by 60% with intervention within the next 15 minutes.
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {/* Injury Distribution */}
        <ChartCard title="Injury Distribution" icon={<Activity size={16} />} delay={0.05}>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={injuryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {injuryDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2">
            {injuryDistribution.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs" style={{ color: "#8097B1" }}>
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.fill }} />
                {d.name} <span style={{ color: d.fill }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Squad Health Radar */}
        <ChartCard title="Squad Health Score" icon={<TrendingUp size={16} />} delay={0.1}>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1B2A41" />
                <PolarAngleAxis dataKey="squad" tick={{ fill: "#4A6282", fontSize: 11 }} />
                <Radar name="Health Score" dataKey="Health Score" stroke="#00FF88" fill="#00FF88" fillOpacity={0.15} />
                <Radar name="Readiness" dataKey="Readiness" stroke="#00BFFF" fill="#00BFFF" fillOpacity={0.1} />
                <Radar name="Mobility" dataKey="Mobility" stroke="#FFC857" fill="#FFC857" fillOpacity={0.1} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-1">
            {[["Health Score", "#00FF88"], ["Readiness", "#00BFFF"], ["Mobility", "#FFC857"]].map(([n, c]) => (
              <div key={n} className="flex items-center gap-1.5 text-xs" style={{ color: "#8097B1" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: c }} />{n}
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Survival Probability */}
        <ChartCard title="Survival Probability" icon={<BrainCircuit size={16} />} delay={0.15}>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={survivalData} barCategoryGap="40%">
                <CartesianGrid stroke="#1B2A41" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#4A6282", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#4A6282", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {survivalData.map((entry, i) => (
                    <Cell key={i} fill={["#00FF88", "#FFC857", "#FF4D4D"][i] || "#00BFFF"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Alert Frequency */}
        <ChartCard title="Alert Frequency" icon={<AlertTriangle size={16} />} delay={0.2}>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alertFrequency} barCategoryGap="30%">
                <CartesianGrid stroke="#1B2A41" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tick={{ fill: "#4A6282", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#4A6282", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#4A6282" }} />
                <Bar dataKey="critical" name="Critical" stackId="a" fill="#FF4D4D" radius={[0, 0, 0, 0]} />
                <Bar dataKey="warning"  name="Warning"  stackId="a" fill="#FFC857" />
                <Bar dataKey="info"     name="Info"     stackId="a" fill="#00BFFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
