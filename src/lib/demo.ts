import type { SkillId } from "@/content/skills";

export const DEMO_KEY = "mentor-demo-mode";

export interface DemoProfile {
  name: string;
  grade: number;
  city: string;
  school: string;
  goal: string;
  daily_minutes: number;
  self_level: string;
  onboarded: boolean;
}

export const DEMO_PROFILE: DemoProfile = {
  name: "Ерасыл Ержанулы",
  grade: 9,
  city: "Кызылорда",
  school: "Школа-лицей №7",
  goal: "olympiad",
  daily_minutes: 30,
  self_level: "intermediate",
  onboarded: true,
};

export const DEMO_SKILLS: { skill: SkillId; mastery: number }[] = [
  { skill: "percent", mastery: 82 },
  { skill: "algebra", mastery: 68 },
  { skill: "equations", mastery: 74 },
  { skill: "divisibility", mastery: 41 },
  { skill: "logic", mastery: 88 },
  { skill: "combinatorics", mastery: 55 },
  { skill: "geometry", mastery: 33 },
  { skill: "sequences", mastery: 61 },
  { skill: "nonstandard", mastery: 28 },
  { skill: "proof", mastery: 37 },
];

export function isDemo(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(DEMO_KEY) === "1";
}

export function setDemo(on: boolean) {
  if (typeof window === "undefined") return;
  if (on) window.localStorage.setItem(DEMO_KEY, "1");
  else window.localStorage.removeItem(DEMO_KEY);
}
