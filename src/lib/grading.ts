import type { Question } from "@/content/questions";
import type { MasteryStatus } from "@/content/skills";

function normalizeNumberString(s: string): string {
  return s.trim().replace(/\s+/g, "").replace(",", ".").replace(/^\+/, "");
}

/** Пытается привести ответ к числу, понимая дроби вида a/b. */
export function toNumber(raw: string): number | null {
  const s = normalizeNumberString(raw);
  if (!s) return null;
  const frac = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (frac) {
    const a = Number(frac[1]);
    const b = Number(frac[2]);
    if (!b) return null;
    return a / b;
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** Детерминированная проверка ответа с учётом эквивалентных форм. */
export function checkAnswer(question: Question, raw: string): boolean | null {
  const answer = (raw ?? "").trim();
  if (question.type === "proof") return null;
  if (!answer) return false;
  const accepted = question.answer ?? [];

  if (question.type === "mcq") {
    return accepted.some((a) => a.trim() === answer);
  }

  const userNum = toNumber(answer);
  for (const a of accepted) {
    if (a.trim().toLowerCase() === answer.toLowerCase()) return true;
    const target = toNumber(a);
    if (userNum !== null && target !== null && Math.abs(userNum - target) < 1e-9) {
      return true;
    }
  }
  return false;
}

export function masteryStatus(mastery: number, noAiSolid: boolean): MasteryStatus {
  if (noAiSolid && mastery >= 90) return "solid";
  if (mastery >= 90) return "confident";
  if (mastery >= 80) return "confident";
  if (mastery >= 60) return "forming";
  if (mastery >= 40) return "review";
  return "critical";
}

export const STATUS_ORDER: MasteryStatus[] = [
  "critical",
  "review",
  "forming",
  "confident",
  "solid",
  "untested",
];
