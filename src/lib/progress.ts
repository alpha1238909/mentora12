import { DEMO_SKILLS } from "@/lib/demo";
import type { SkillId } from "@/content/skills";

export const MASTERY_KEY = "mentor-mastery";
export const DIAGNOSTIC_RESULT_KEY = "mentor-diagnostic-result";
export const COMPLETED_LESSONS_KEY = "mentor-completed-lessons";
export const MENTOR_USAGE_KEY = "mentor-usage";

export interface MasteryValue {
  skill: SkillId;
  mastery: number;
}

export interface DiagnosticResult {
  score: number;
  total: number;
  completedAt: string;
  bySkill: Partial<Record<SkillId, { correct: number; total: number }>>;
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function readMastery(): MasteryValue[] {
  const stored = readJson<MasteryValue[] | null>(MASTERY_KEY, null);
  return stored?.length ? stored : DEMO_SKILLS;
}

export function saveMastery(values: MasteryValue[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(MASTERY_KEY, JSON.stringify(values));
  }
}

export function readDiagnosticResult(): DiagnosticResult | null {
  return readJson<DiagnosticResult | null>(DIAGNOSTIC_RESULT_KEY, null);
}

export function saveDiagnosticResult(result: DiagnosticResult) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(DIAGNOSTIC_RESULT_KEY, JSON.stringify(result));
  }
}

export function readCompletedLessons(): string[] {
  return readJson<string[]>(COMPLETED_LESSONS_KEY, []);
}

export function markLessonComplete(id: string): string[] {
  const next = Array.from(new Set([...readCompletedLessons(), id]));
  if (typeof window !== "undefined") {
    window.localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(next));
  }
  return next;
}

export function readMentorUsage(): { date: string; count: number } {
  const today = new Date().toISOString().slice(0, 10);
  const saved = readJson<{ date: string; count: number } | null>(MENTOR_USAGE_KEY, null);
  return saved?.date === today ? saved : { date: today, count: 0 };
}

export function incrementMentorUsage() {
  const next = { ...readMentorUsage(), count: readMentorUsage().count + 1 };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(MENTOR_USAGE_KEY, JSON.stringify(next));
  }
  return next;
}
