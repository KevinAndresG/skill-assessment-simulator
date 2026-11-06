import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  id: "dbg-leap-year",
  title: "Leap Year",
  level: "entry",
  minutes: 8,
  fn: "isLeapYear",
  requirements: `<code>isLeapYear(year)</code>: a year is leap if it is divisible by 4, except years divisible by 100,
unless they are also divisible by 400 (1900 is not leap, 2000 is).`,
  buggyCode: `function isLeapYear(year) {
  if (year % 4 === 0 && year % 100 !== 0) {
    return true;
  }
  return false;
}`,
  solution: `function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}`,
  hint: "Prueba con 1900 y con 2000. La regla de divisible por 100 tiene su propia excepción: ¿está contemplada?",
  bugs: ["Falta la excepción de la excepción: los años divisibles por 400 sí son bisiestos (2000, 2400)"],
  visible: [
    { args: [2024], expected: true },
    { args: [1900], expected: false },
  ],
  hidden: [
    { args: [2000], expected: true },
    { args: [2023], expected: false },
    { args: [2100], expected: false },
    { args: [1996], expected: true },
    { args: [2400], expected: true },
  ],
};

export default challenge;
