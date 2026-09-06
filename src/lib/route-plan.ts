import { LESSON_BY_SKILL } from "@/content/lessons";
import { SKILL_MAP, type SkillId } from "@/content/skills";

export interface RouteDay {
  day: number;
  kind: "lesson" | "checkpoint";
  lesson_id: string | null;
  skill: SkillId;
  topic: string;
  goal: string;
  outcome: string;
  reason: string;
  difficulty: "base" | "medium" | "hard";
  duration_min: number;
  status: "planned" | "done";
  score?: number | null;
}

export interface SkillMastery {
  skill: SkillId;
  mastery: number;
}

/**
 * Строит персональный маршрут на 14 дней:
 * слабые навыки идут первыми и повторяются, дни 7 и 14 — контрольные без ИИ.
 */
export function buildRoute(states: SkillMastery[], dailyMinutes = 25): RouteDay[] {
  const sorted = [...states].sort((a, b) => a.mastery - b.mastery);
  const weak = sorted.filter((s) => s.mastery < 60).map((s) => s.skill);
  const rest = sorted.filter((s) => s.mastery >= 60).map((s) => s.skill);
  const queue: SkillId[] = [];
  // Слабые темы получают по два подхода, сильные — по одному на закрепление
  for (const s of weak) queue.push(s, s);
  for (const s of rest) queue.push(s);
  if (queue.length === 0) queue.push(...sorted.map((s) => s.skill));

  const days: RouteDay[] = [];
  let qi = 0;
  for (let day = 1; day <= 14; day++) {
    if (day === 7 || day === 14) {
      const focus = weak[0] ?? sorted[0]?.skill ?? "algebra";
      days.push({
        day,
        kind: "checkpoint",
        lesson_id: null,
        skill: focus,
        topic: day === 7 ? "Контрольная №1 — без ИИ" : "Контрольная №2 — без ИИ",
        goal: "Проверить, что навык работает самостоятельно",
        outcome: "Обновлённая карта навыков и честная оценка прогресса",
        reason: "Раз в неделю проверяем результат без подсказок наставника",
        difficulty: "medium",
        duration_min: Math.max(dailyMinutes, 30),
        status: "planned",
      });
      continue;
    }
    const skill = queue[qi % queue.length]!;
    qi++;
    const mastery = states.find((s) => s.skill === skill)?.mastery ?? 0;
    const lesson = LESSON_BY_SKILL[skill];
    const second = days.some((d) => d.skill === skill && d.kind === "lesson");
    days.push({
      day,
      kind: "lesson",
      lesson_id: lesson?.id ?? null,
      skill,
      topic: SKILL_MAP[skill].title,
      goal: lesson?.goal ?? SKILL_MAP[skill].description,
      outcome: second
        ? "Решаете задания на перенос без подсказок"
        : "Понимаете идею и решаете базовые задания",
      reason:
        mastery < 40
          ? `Диагностика показала критический пробел (${mastery}%)`
          : mastery < 60
            ? `Навык нестабилен (${mastery}%), нужна отработка`
            : `Закрепляем сильную сторону (${mastery}%)`,
      difficulty: mastery < 40 ? "base" : mastery < 70 ? "medium" : "hard",
      duration_min: dailyMinutes,
      status: "planned",
    });
  }
  return days;
}
