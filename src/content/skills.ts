export type SkillId =
  | "percent"
  | "algebra"
  | "equations"
  | "divisibility"
  | "logic"
  | "combinatorics"
  | "geometry"
  | "sequences"
  | "nonstandard"
  | "proof";

export interface Skill {
  id: SkillId;
  title: string;
  short: string;
  description: string;
}

export const SKILLS: Skill[] = [
  {
    id: "percent",
    title: "Проценты и пропорции",
    short: "Проценты",
    description: "Части, доли, концентрации, изменение величины в процентах.",
  },
  {
    id: "algebra",
    title: "Алгебраические преобразования",
    short: "Алгебра",
    description: "Формулы сокращённого умножения, симметрические выражения, тождества.",
  },
  {
    id: "equations",
    title: "Уравнения и неравенства",
    short: "Уравнения",
    description: "Линейные и квадратные уравнения, модуль, системы, неравенства.",
  },
  {
    id: "divisibility",
    title: "Делимость и остатки",
    short: "Делимость",
    description: "Признаки делимости, НОД и НОК, арифметика остатков.",
  },
  {
    id: "logic",
    title: "Логические задачи",
    short: "Логика",
    description: "Рассуждения от противного, таблицы истинности, задачи о лжецах.",
  },
  {
    id: "combinatorics",
    title: "Комбинаторный подсчёт",
    short: "Комбинаторика",
    description: "Правила суммы и произведения, перестановки, сочетания.",
  },
  {
    id: "geometry",
    title: "Геометрическое рассуждение",
    short: "Геометрия",
    description: "Углы, подобие, площади, свойства прямоугольного треугольника.",
  },
  {
    id: "sequences",
    title: "Последовательности и закономерности",
    short: "Последовательности",
    description: "Арифметическая и геометрическая прогрессии, суммы, телескопирование.",
  },
  {
    id: "nonstandard",
    title: "Нестандартные задачи",
    short: "Нестандартные",
    description: "Инварианты, чётность, оценка + пример, принцип Дирихле.",
  },
  {
    id: "proof",
    title: "Построение доказательства",
    short: "Доказательство",
    description: "Полное обоснование: что дано, что выводим, почему шаг верен.",
  },
];

export const SKILL_MAP: Record<SkillId, Skill> = Object.fromEntries(
  SKILLS.map((s) => [s.id, s]),
) as Record<SkillId, Skill>;

export type MasteryStatus =
  | "untested"
  | "critical"
  | "review"
  | "forming"
  | "confident"
  | "solid";

export const STATUS_LABEL: Record<MasteryStatus, string> = {
  untested: "Ещё не проверено",
  critical: "Критический пробел",
  review: "Требуется повторение",
  forming: "Навык формируется",
  confident: "Уверенное владение",
  solid: "Устойчивый навык",
};

export const STATUS_TONE: Record<MasteryStatus, string> = {
  untested: "bg-muted text-muted-foreground",
  critical: "bg-destructive/15 text-destructive",
  review: "bg-warning/20 text-warning-foreground dark:text-warning",
  forming: "bg-accent/25 text-accent-foreground dark:text-accent",
  confident: "bg-primary/15 text-primary",
  solid: "bg-success/20 text-success",
};
