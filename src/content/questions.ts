import type { SkillId } from "./skills";

export type QuestionType = "mcq" | "numeric" | "short" | "proof";

export interface Question {
  id: string;
  skill: SkillId;
  /** true — задание на перенос знания в новую ситуацию */
  transfer: boolean;
  grades: number[];
  difficulty: "base" | "medium" | "hard";
  type: QuestionType;
  text: string;
  options?: string[];
  /** Для numeric/short: список эквивалентных допустимых ответов */
  answer?: string[];
  solution: string;
  rubric?: string[];
  source: string;
  maxScore: number;
}

/**
 * Банк заданий Mentor AI. Все условия и ответы проверены вручную.
 * Каждый навык проверяется двумя способами: базовое понимание и перенос.
 */
export const QUESTIONS: Question[] = [
  // ---------- Проценты ----------
  {
    id: "percent-b1",
    skill: "percent",
    transfer: false,
    grades: [8, 9, 10],
    difficulty: "base",
    type: "numeric",
    text: "Цена товара 4500 тг сначала снизилась на 20%, а затем выросла на 15%. Какой стала итоговая цена (в тенге)?",
    answer: ["4140"],
    solution:
      "4500 · 0,8 = 3600. Затем 3600 · 1,15 = 4140. Проценты считаются последовательно от текущей цены, а не складываются.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "percent-t1",
    skill: "percent",
    transfer: true,
    grades: [8, 9],
    difficulty: "medium",
    type: "numeric",
    text: "В 200 г раствора содержится 8% соли. Сколько граммов воды нужно выпарить, чтобы концентрация стала 10%?",
    answer: ["40"],
    solution:
      "Соли 200 · 0,08 = 16 г, при выпаривании её масса не меняется. Нужен раствор массы 16 / 0,1 = 160 г, значит выпарить 200 − 160 = 40 г воды.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "percent-t2",
    skill: "percent",
    transfer: true,
    grades: [10],
    difficulty: "hard",
    type: "numeric",
    text: "Число уменьшили на 20%, а затем увеличили на x%, и получилось исходное число. Найдите x.",
    answer: ["25"],
    solution: "0,8a · (1 + x/100) = a ⟹ 1 + x/100 = 1,25 ⟹ x = 25.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },

  // ---------- Алгебра ----------
  {
    id: "algebra-b1",
    skill: "algebra",
    transfer: false,
    grades: [8, 9, 10],
    difficulty: "base",
    type: "numeric",
    text: "Известно, что x + 1/x = 3. Чему равно x² + 1/x²?",
    answer: ["7"],
    solution: "(x + 1/x)² = x² + 2 + 1/x² = 9, значит x² + 1/x² = 7.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "algebra-t1",
    skill: "algebra",
    transfer: true,
    grades: [8, 9],
    difficulty: "medium",
    type: "numeric",
    text: "Пусть a + b = 5 и ab = 6. Найдите a³ + b³.",
    answer: ["35"],
    solution: "a³ + b³ = (a + b)³ − 3ab(a + b) = 125 − 3 · 6 · 5 = 125 − 90 = 35.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "algebra-t2",
    skill: "algebra",
    transfer: true,
    grades: [10],
    difficulty: "hard",
    type: "numeric",
    text: "Числа a, b, c таковы, что a + b + c = 0 и abc = 4. Найдите a³ + b³ + c³.",
    answer: ["12"],
    solution:
      "При a + b + c = 0 выполняется тождество a³ + b³ + c³ = 3abc, поэтому ответ 3 · 4 = 12.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },

  // ---------- Уравнения ----------
  {
    id: "equations-b1",
    skill: "equations",
    transfer: false,
    grades: [8, 9, 10],
    difficulty: "base",
    type: "numeric",
    text: "Найдите сумму всех корней уравнения |2x − 5| = 7.",
    answer: ["5"],
    solution: "2x − 5 = 7 даёт x = 6; 2x − 5 = −7 даёт x = −1. Сумма 6 + (−1) = 5.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "equations-t1",
    skill: "equations",
    transfer: true,
    grades: [8, 9],
    difficulty: "medium",
    type: "numeric",
    text: "Найдите наименьшее целое n, при котором выполняется неравенство 3n − 7 > 2n + 5.",
    answer: ["13"],
    solution: "3n − 7 > 2n + 5 ⟹ n > 12. Наименьшее целое n = 13.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "equations-t2",
    skill: "equations",
    transfer: true,
    grades: [10],
    difficulty: "hard",
    type: "numeric",
    text: "Действительные числа x и y удовлетворяют системе x + y = 7 и x² + y² = 29. Найдите xy.",
    answer: ["10"],
    solution: "(x + y)² = x² + 2xy + y² ⟹ 49 = 29 + 2xy ⟹ xy = 10.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },

  // ---------- Делимость ----------
  {
    id: "divisibility-b1",
    skill: "divisibility",
    transfer: false,
    grades: [8, 9, 10],
    difficulty: "base",
    type: "numeric",
    text: "Какой остаток даёт 7¹⁰⁰ при делении на 5?",
    answer: ["1"],
    solution: "7 ≡ 2 (mod 5), значит 7¹⁰⁰ ≡ 2¹⁰⁰ = (2⁴)²⁵ = 16²⁵ ≡ 1²⁵ = 1 (mod 5). Остаток 1.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "divisibility-t1",
    skill: "divisibility",
    transfer: true,
    grades: [8, 9],
    difficulty: "medium",
    type: "numeric",
    text: "Найдите наименьшее натуральное число, которое при делении на 3 даёт остаток 2, при делении на 4 — остаток 3, а при делении на 5 — остаток 4.",
    answer: ["59"],
    solution:
      "Во всех случаях остаток на 1 меньше делителя, значит n + 1 делится на 3, 4 и 5, то есть на 60. Наименьшее n = 60 − 1 = 59.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "divisibility-t2",
    skill: "divisibility",
    transfer: true,
    grades: [10],
    difficulty: "hard",
    type: "numeric",
    text: "Сколькими нулями оканчивается число 100! ?",
    answer: ["24"],
    solution: "⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = 24 (множителей 2 заведомо больше).",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },

  // ---------- Логика ----------
  {
    id: "logic-b1",
    skill: "logic",
    transfer: false,
    grades: [8, 9, 10],
    difficulty: "base",
    type: "mcq",
    text: "Известно: «Все участники олимпиады решают задачи». Асан задачи не решает. Какой вывод строго следует?",
    options: [
      "Асан не участник олимпиады",
      "Асан участник олимпиады",
      "Некоторые участники не решают задачи",
      "Из условия ничего не следует",
    ],
    answer: ["Асан не участник олимпиады"],
    solution:
      "Это контрапозиция: если «участник ⟹ решает», то «не решает ⟹ не участник». Остальные варианты противоречат условию или не следуют из него.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "logic-t1",
    skill: "logic",
    transfer: true,
    grades: [8, 9, 10],
    difficulty: "medium",
    type: "mcq",
    text: "На острове живут рыцари (всегда говорят правду) и лжецы (всегда лгут). Житель A говорит: «Мы с B оба лжецы». Кто есть кто?",
    options: ["A — лжец, B — рыцарь", "A — рыцарь, B — лжец", "оба лжецы", "оба рыцари"],
    answer: ["A — лжец, B — рыцарь"],
    solution:
      "Если A рыцарь, его фраза правдива, значит он лжец — противоречие. Значит A лжец, и его утверждение ложно, то есть неверно, что оба лжецы. Так как A лжец, лжецом не может быть B — иначе фраза стала бы правдой. Значит B рыцарь.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },

  // ---------- Комбинаторика ----------
  {
    id: "combinatorics-b1",
    skill: "combinatorics",
    transfer: false,
    grades: [8, 9, 10],
    difficulty: "base",
    type: "numeric",
    text: "Сколько четырёхзначных чисел можно составить из цифр 1, 2, 3, 4 без повторения цифр?",
    answer: ["24"],
    solution: "Это перестановки четырёх цифр: 4! = 24.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "combinatorics-t1",
    skill: "combinatorics",
    transfer: true,
    grades: [8, 9],
    difficulty: "medium",
    type: "numeric",
    text: "В турнире 8 команд, каждая играет с каждой ровно один раз. Сколько всего матчей?",
    answer: ["28"],
    solution: "C(8,2) = 8 · 7 / 2 = 28.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "combinatorics-t2",
    skill: "combinatorics",
    transfer: true,
    grades: [10],
    difficulty: "hard",
    type: "numeric",
    text: "По клеткам сетки нужно пройти из левого нижнего угла в правый верхний, делая только шаги вправо и вверх. Всего требуется 3 шага вправо и 3 шага вверх. Сколько существует различных путей?",
    answer: ["20"],
    solution: "Нужно выбрать, на каких 3 из 6 шагов идти вправо: C(6,3) = 20.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },

  // ---------- Геометрия ----------
  {
    id: "geometry-b1",
    skill: "geometry",
    transfer: false,
    grades: [8, 9, 10],
    difficulty: "base",
    type: "numeric",
    text: "В прямоугольном треугольнике катеты равны 6 и 8. Найдите высоту, проведённую к гипотенузе.",
    answer: ["4.8", "4,8", "24/5"],
    solution: "Гипотенуза = 10. Площадь = 6 · 8 / 2 = 24 = 10 · h / 2, откуда h = 4,8.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "geometry-t1",
    skill: "geometry",
    transfer: true,
    grades: [8, 9],
    difficulty: "medium",
    type: "numeric",
    text: "Найдите (в градусах) угол между биссектрисами острых углов прямоугольного треугольника.",
    answer: ["135"],
    solution:
      "Острые углы α + β = 90°, половины дают 45°. В треугольнике, образованном биссектрисами и стороной, третий угол = 180° − 45° = 135°.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "geometry-t2",
    skill: "geometry",
    transfer: true,
    grades: [10],
    difficulty: "hard",
    type: "numeric",
    text: "Найдите площадь треугольника со сторонами 13, 14, 15.",
    answer: ["84"],
    solution: "p = 21, по формуле Герона S = √(21 · 8 · 7 · 6) = √7056 = 84.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },

  // ---------- Последовательности ----------
  {
    id: "sequences-b1",
    skill: "sequences",
    transfer: false,
    grades: [8, 9, 10],
    difficulty: "base",
    type: "numeric",
    text: "Первый член арифметической прогрессии равен 5, разность равна 3. Найдите двадцатый член.",
    answer: ["62"],
    solution: "a₂₀ = a₁ + 19d = 5 + 19 · 3 = 62.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "sequences-t1",
    skill: "sequences",
    transfer: true,
    grades: [8, 9],
    difficulty: "medium",
    type: "numeric",
    text: "Сумма 1 + 2 + 3 + … + n равна 210. Найдите n.",
    answer: ["20"],
    solution: "n(n + 1)/2 = 210 ⟹ n² + n − 420 = 0 ⟹ n = 20.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "sequences-t2",
    skill: "sequences",
    transfer: true,
    grades: [10],
    difficulty: "hard",
    type: "short",
    text: "Вычислите сумму 1/(1·2) + 1/(2·3) + … + 1/(99·100). Ответ можно записать дробью.",
    answer: ["99/100", "0.99", "0,99"],
    solution: "1/(k(k+1)) = 1/k − 1/(k+1). Сумма телескопируется: 1 − 1/100 = 99/100.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },

  // ---------- Нестандартные ----------
  {
    id: "nonstandard-b1",
    skill: "nonstandard",
    transfer: false,
    grades: [8, 9, 10],
    difficulty: "base",
    type: "numeric",
    text: "На доске написаны числа от 1 до 10. За один ход стирают любые два числа и пишут их сумму. Какое число останется на доске в конце?",
    answer: ["55"],
    solution: "Сумма всех чисел — инвариант: она не меняется при таком ходе. 1 + 2 + … + 10 = 55.",
    source: "Авторское задание Mentor AI",
    maxScore: 1,
  },
  {
    id: "nonstandard-t1",
    skill: "nonstandard",
    transfer: true,
    grades: [8, 9, 10],
    difficulty: "medium",
    type: "mcq",
    text: "Из шахматной доски 8×8 вырезали две противоположные угловые клетки. Можно ли замостить оставшиеся 62 клетки костями домино 1×2?",
    options: [
      "Нельзя: удалены две клетки одного цвета",
      "Можно, достаточно 31 домино",
      "Можно, но только с поворотами по диагонали",
      "Зависит от расположения углов",
    ],
    answer: ["Нельзя: удалены две клетки одного цвета"],
    solution:
      "Каждая кость покрывает одну белую и одну чёрную клетку. Противоположные углы одного цвета, поэтому останется 32 клетки одного цвета и 30 другого — замощение невозможно.",
    source: "Классическая задача, разбор Mentor AI",
    maxScore: 1,
  },

  // ---------- Доказательство ----------
  {
    id: "proof-b1",
    skill: "proof",
    transfer: false,
    grades: [8, 9, 10],
    difficulty: "base",
    type: "proof",
    text: "Докажите, что сумма любых трёх последовательных целых чисел делится на 3.",
    solution:
      "Пусть числа равны n − 1, n, n + 1. Их сумма (n − 1) + n + (n + 1) = 3n, а 3n делится на 3 по определению делимости. Что и требовалось доказать.",
    rubric: [
      "Введено обозначение произвольного целого числа (например n)",
      "Сумма преобразована к виду 3n",
      "Сделан вывод о делимости с обоснованием",
    ],
    source: "Авторское задание Mentor AI",
    maxScore: 3,
  },
  {
    id: "proof-t1",
    skill: "proof",
    transfer: true,
    grades: [8, 9, 10],
    difficulty: "hard",
    type: "proof",
    text: "Докажите, что для любого натурального n число n³ − n делится на 6.",
    solution:
      "n³ − n = n(n² − 1) = (n − 1)n(n + 1) — произведение трёх последовательных целых чисел. Среди любых двух последовательных чисел есть чётное, значит произведение делится на 2. Среди любых трёх последовательных чисел ровно одно делится на 3. Так как 2 и 3 взаимно просты, произведение делится на 6.",
    rubric: [
      "Выполнено разложение на (n−1)n(n+1)",
      "Обоснована делимость на 2",
      "Обоснована делимость на 3 и сделан вывод про 6",
    ],
    source: "Авторское задание Mentor AI",
    maxScore: 3,
  },
];

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
);

/** Подбирает 20 заданий диагностики под класс: по 2 на каждый навык (база + перенос). */
export function buildDiagnosticSet(grade: number): string[] {
  const ids: string[] = [];
  const bySkill = new Map<string, Question[]>();
  for (const q of QUESTIONS) {
    if (!q.grades.includes(grade)) continue;
    const arr = bySkill.get(q.skill) ?? [];
    arr.push(q);
    bySkill.set(q.skill, arr);
  }
  for (const [, list] of bySkill) {
    const base = list.filter((q) => !q.transfer);
    const transfer = list.filter((q) => q.transfer);
    if (base[0]) ids.push(base[0].id);
    if (transfer[0]) ids.push(transfer[0].id);
    // если для навыка есть несколько заданий на перенос — добираем ещё одно
    if (transfer[1] && base.length === 0) ids.push(transfer[1].id);
  }
  // A diagnostic is always exactly 20 items. Some grades have fewer
  // grade-specific transfer tasks, so complete the set with unused tasks
  // from the closest available grade rather than silently shortening it.
  const pool = QUESTIONS.filter((q) => q.grades.includes(grade));
  const fallback = pool.length ? pool : QUESTIONS;
  for (const q of fallback) {
    if (ids.length >= 20) break;
    if (!ids.includes(q.id)) ids.push(q.id);
  }
  for (const q of QUESTIONS) {
    if (ids.length >= 20) break;
    if (!ids.includes(q.id)) ids.push(q.id);
  }
  return shuffle(ids.slice(0, 20));
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i]!;
    copy[i] = copy[j]!;
    copy[j] = temp;
  }
  return copy;
}
