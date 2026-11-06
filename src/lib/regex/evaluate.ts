/**
 * Evaluador de retos de regex. Es un string con una función autocontenida para
 * poder ejecutarlo en un Web Worker (timeout ante backtracking catastrófico)
 * y también en `scripts/validate-content.ts`, con una única fuente de verdad.
 */
export const EVAL_SRC = `function __evalRegex(mode, pattern, flags, replacement, cases) {
  var re;
  try {
    var f = mode === 'extract' ? (flags.indexOf('g') >= 0 ? flags : flags + 'g')
      : mode === 'test' ? flags.replace(/[gy]/g, '') : flags;
    re = new RegExp(pattern, f);
  } catch (e) { return { fatal: e.message }; }
  return { results: cases.map(function (c) {
    try {
      var got;
      if (mode === 'test') got = re.test(c.input);
      else if (mode === 'extract') got = Array.from(c.input.matchAll(re), function (m) { return m[0]; });
      else got = c.input.replace(re, replacement);
      return { pass: JSON.stringify(got) === JSON.stringify(c.expected), got: got };
    } catch (e) { return { pass: false, error: e.message }; }
  }) };
}`;

export interface RegexCaseResult {
  pass: boolean;
  got?: boolean | string[] | string;
  error?: string;
}

export type RegexOutcome =
  | { status: 'ok'; results: RegexCaseResult[] }
  | { status: 'fatal'; message: string }
  | { status: 'timeout' };
