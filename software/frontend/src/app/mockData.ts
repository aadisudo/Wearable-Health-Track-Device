export type SoldierStatus = "stable" | "serious" | "critical" | "offline";

export interface Soldier {
  id: string;
  name: string;
  rank: string;
  squad: string;
  role: string;
  status: SoldierStatus;
  riskPercent: number;
  priority: number;
  heartRate: number;
  spo2: number;
  temperature: number;
  respRate: number;
  battery: number;
  movement: string;
  x: number;
  y: number;
  bloodGroup: string;
  allergies: string[];
  injuries: string[];
  treatments: string[];
  photo: string;
}

export interface Alert {
  id: string;
  time: string;
  type: "Blast Detected" | "Critical Soldier" | "Sensor Failure" | "Battery Low";
  soldier: string;
  severity: "critical" | "warning" | "information";
  message: string;
}

export const soldiers: Soldier[] = [
  {
    id: "S-001",
    name: "Cpt. Marcus Webb",
    rank: "Captain",
    squad: "Alpha",
    role: "Squad Leader",
    status: "stable",
    riskPercent: 12,
    priority: 4,
    heartRate: 72,
    spo2: 98,
    temperature: 98.6,
    respRate: 16,
    battery: 87,
    movement: "Active",
    x: 32,
    y: 28,
    bloodGroup: "O+",
    allergies: ["Penicillin"],
    injuries: ["Minor laceration (2024)"],
    treatments: ["Field dressing applied"],
    photo: "",
  },
  {
    id: "S-002",
    name: "Sgt. Rina Patel",
    rank: "Sergeant",
    squad: "Alpha",
    role: "Medic",
    status: "stable",
    riskPercent: 8,
    priority: 5,
    heartRate: 68,
    spo2: 99,
    temperature: 98.2,
    respRate: 15,
    battery: 92,
    movement: "Active",
    x: 45,
    y: 35,
    bloodGroup: "A+",
    allergies: [],
    injuries: [],
    treatments: [],
    photo: "",
  },
  {
    id: "S-003",
    name: "Cpl. James Okafor",
    rank: "Corporal",
    squad: "Bravo",
    role: "Rifleman",
    status: "serious",
    riskPercent: 54,
    priority: 2,
    heartRate: 108,
    spo2: 93,
    temperature: 100.4,
    respRate: 22,
    battery: 61,
    movement: "Slow",
    x: 60,
    y: 55,
    bloodGroup: "B-",
    allergies: ["Sulfa drugs"],
    injuries: ["Shrapnel wound (left arm)"],
    treatments: ["Tourniquet applied", "Morphine 10mg"],
    photo: "",
  },
  {
    id: "S-004",
    name: "Pvt. Ethan Cruz",
    rank: "Private",
    squad: "Bravo",
    role: "Rifleman",
    status: "critical",
    riskPercent: 88,
    priority: 1,
    heartRate: 138,
    spo2: 84,
    temperature: 103.1,
    respRate: 32,
    battery: 34,
    movement: "Stationary",
    x: 72,
    y: 65,
    bloodGroup: "AB+",
    allergies: ["NSAIDs"],
    injuries: ["Blast trauma (chest)", "Concussion"],
    treatments: ["Oxygen administered", "IV fluids", "CPR initiated"],
    photo: "",
  },
  {
    id: "S-005",
    name: "Sgt. Yuki Tanaka",
    rank: "Sergeant",
    squad: "Charlie",
    role: "Scout",
    status: "offline",
    riskPercent: 95,
    priority: 1,
    heartRate: 0,
    spo2: 0,
    temperature: 0,
    respRate: 0,
    battery: 5,
    movement: "Unknown",
    x: 20,
    y: 70,
    bloodGroup: "O-",
    allergies: [],
    injuries: ["Previous gunshot wound (recovered)"],
    treatments: [],
    photo: "",
  },
  {
    id: "S-006",
    name: "Lt. Sarah Novak",
    rank: "Lieutenant",
    squad: "Charlie",
    role: "Sniper",
    status: "stable",
    riskPercent: 15,
    priority: 4,
    heartRate: 65,
    spo2: 98,
    temperature: 98.4,
    respRate: 14,
    battery: 79,
    movement: "Active",
    x: 80,
    y: 22,
    bloodGroup: "A-",
    allergies: ["Latex"],
    injuries: [],
    treatments: [],
    photo: "",
  },
  {
    id: "S-007",
    name: "Pvt. Leon Hayes",
    rank: "Private",
    squad: "Delta",
    role: "Rifleman",
    status: "serious",
    riskPercent: 47,
    priority: 3,
    heartRate: 115,
    spo2: 91,
    temperature: 101.2,
    respRate: 25,
    battery: 55,
    movement: "Slow",
    x: 50,
    y: 80,
    bloodGroup: "B+",
    allergies: [],
    injuries: ["Fracture (right leg)"],
    treatments: ["Splint applied", "Ibuprofen 400mg"],
    photo: "",
  },
  {
    id: "S-008",
    name: "Sgt. Omar Rashid",
    rank: "Sergeant",
    squad: "Delta",
    role: "Engineer",
    status: "stable",
    riskPercent: 20,
    priority: 4,
    heartRate: 74,
    spo2: 97,
    temperature: 98.9,
    respRate: 17,
    battery: 68,
    movement: "Active",
    x: 38,
    y: 48,
    bloodGroup: "O+",
    allergies: [],
    injuries: [],
    treatments: [],
    photo: "",
  },
];

export const alerts: Alert[] = [
  {
    id: "A-001",
    time: "14:32:05",
    type: "Critical Soldier",
    soldier: "Pvt. Ethan Cruz (S-004)",
    severity: "critical",
    message: "Heart rate 138 BPM, SpO₂ dropped to 84%. Immediate intervention required.",
  },
  {
    id: "A-002",
    time: "14:28:17",
    type: "Blast Detected",
    soldier: "Sgt. Yuki Tanaka (S-005)",
    severity: "critical",
    message: "Explosion detected within 50m radius. Soldier signal lost.",
  },
  {
    id: "A-003",
    time: "14:20:44",
    type: "Sensor Failure",
    soldier: "Sgt. Yuki Tanaka (S-005)",
    severity: "warning",
    message: "All biometric sensors offline. GPS last known position recorded.",
  },
  {
    id: "A-004",
    time: "14:15:22",
    type: "Battery Low",
    soldier: "Pvt. Ethan Cruz (S-004)",
    severity: "warning",
    message: "Suit battery at 34%. Recommend immediate recharge or replacement.",
  },
  {
    id: "A-005",
    time: "14:08:30",
    type: "Critical Soldier",
    soldier: "Cpl. James Okafor (S-003)",
    severity: "warning",
    message: "Elevated temperature 100.4°F and increased respiratory rate detected.",
  },
  {
    id: "A-006",
    time: "13:55:10",
    type: "Battery Low",
    soldier: "Pvt. Leon Hayes (S-007)",
    severity: "information",
    message: "Suit battery at 55%. Schedule recharge within 4 hours.",
  },
  {
    id: "A-007",
    time: "13:44:02",
    type: "Blast Detected",
    soldier: "Alpha Squad",
    severity: "warning",
    message: "Seismic activity detected near grid B-7. Possible IED detonation.",
  },
  {
    id: "A-008",
    time: "13:30:55",
    type: "Sensor Failure",
    soldier: "Cpl. James Okafor (S-003)",
    severity: "information",
    message: "GPS signal intermittent. Last known position logged.",
  },
];

export const vitalHistory = (base: number, variance: number, points = 20) =>
  Array.from({ length: points }, (_, i) => ({
    t: i,
    v: Math.round(base + (Math.random() - 0.5) * variance * 2),
  }));

export const injuryDistribution = [
  { name: "Blast Trauma", value: 35, fill: "#FF4D4D" },
  { name: "Gunshot", value: 25, fill: "#FFC857" },
  { name: "Fracture", value: 20, fill: "#00BFFF" },
  { name: "Laceration", value: 15, fill: "#00FF88" },
  { name: "Other", value: 5, fill: "#8B5CF6" },
];

export const squadHealth = [
  { squad: "Alpha", score: 88 },
  { squad: "Bravo", score: 62 },
  { squad: "Charlie", score: 41 },
  { squad: "Delta", score: 74 },
];

export const survivalData = [
  { name: "High (>85%)", value: 4 },
  { name: "Medium (50-85%)", value: 2 },
  { name: "Low (<50%)", value: 2 },
];

export const alertFrequency = [
  { hour: "08:00", critical: 0, warning: 1, info: 2 },
  { hour: "09:00", critical: 1, warning: 2, info: 3 },
  { hour: "10:00", critical: 0, warning: 1, info: 1 },
  { hour: "11:00", critical: 2, warning: 3, info: 2 },
  { hour: "12:00", critical: 1, warning: 2, info: 4 },
  { hour: "13:00", critical: 3, warning: 4, info: 2 },
  { hour: "14:00", critical: 4, warning: 3, info: 3 },
];

export const mockSuits = [
  { id: "SUIT-001", soldier: "S-001", firmware: "v3.2.1", battery: 87, status: "paired" },
  { id: "SUIT-002", soldier: "S-004", firmware: "v3.1.8", battery: 34, status: "critical" },
  { id: "SUIT-003", soldier: "UNASSIGNED", firmware: "v3.2.1", battery: 100, status: "available" },
];
