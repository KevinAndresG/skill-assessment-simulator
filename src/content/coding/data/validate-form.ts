import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "validate-form",
  title: "Form Validation Rules",
  level: "data",
  minutes: 25,
  fn: "validateForm",
  signatureJS: `function validateForm(values, rules)`,
  signatureTS: `type Rule = { required?: boolean; minLength?: number; pattern?: string; min?: number; max?: number };
function validateForm(values: Record<string, unknown>, rules: Record<string, Rule>): Record<string, string>`,
  description: `For each field in <code>rules</code>, return only the FIRST failing message, checked in this order:
<br>• <code>required</code> and value is <code>""</code>, <code>null</code> or <code>undefined</code> → <code>"Required"</code>
<br>• empty and not required → no error (skip remaining rules)
<br>• <code>minLength</code> → <code>"Must be at least N characters"</code> (on String(value))
<br>• <code>pattern</code> (regex source string, must match the whole value) → <code>"Invalid format"</code>
<br>• <code>min</code> → <code>"Must be &gt;= N"</code> &nbsp;• <code>max</code> → <code>"Must be &lt;= N"</code> (on Number(value))
<br>Return an object with only the fields that have errors.`,
  examples: [["{email:\"x\", age:15}, {email:{required:true,pattern:\"[^@]+@[^@]+\"}, age:{min:18}}","{email:\"Invalid format\", age:\"Must be >= 18\"}"]],
  hint: "Recorre las reglas de cada campo en orden y detente en el primer error de ese campo. Piensa cómo convertir un string en una regex y cómo exigir que cubra el valor completo, no solo una parte.",
  solution: `function validateForm(values, rules) {
  const errors = {};
  for (const [field, r] of Object.entries(rules)) {
    const v = values[field];
    const empty = v === '' || v === null || v === undefined;
    if (empty) { if (r.required) errors[field] = 'Required'; continue; }
    if (r.minLength != null && String(v).length < r.minLength) errors[field] = 'Must be at least ' + r.minLength + ' characters';
    else if (r.pattern != null && !new RegExp('^(?:' + r.pattern + ')$').test(String(v))) errors[field] = 'Invalid format';
    else if (r.min != null && Number(v) < r.min) errors[field] = 'Must be >= ' + r.min;
    else if (r.max != null && Number(v) > r.max) errors[field] = 'Must be <= ' + r.max;
  }
  return errors;
}`,
  visible: [
    { args: [{"email":"x","age":15}, {"email":{"required":true,"pattern":"[^@]+@[^@]+"},"age":{"min":18}}], expected: {"email":"Invalid format","age":"Must be >= 18"} },
  ],
  hidden: [
    { args: [{}, {"name":{"required":true},"nick":{"minLength":3}}], expected: {"name":"Required"} },
    { args: [{"name":"Al","seats":"250"}, {"name":{"required":true,"minLength":3},"seats":{"min":1,"max":200}}], expected: {"name":"Must be at least 3 characters","seats":"Must be <= 200"} },
    { args: [{"code":"AB-12","qty":5}, {"code":{"pattern":"[A-Z]{2}-\\d{2}"},"qty":{"min":1,"max":10}}], expected: {} },
    { args: [{"phone":"300 123"}, {"phone":{"required":true,"minLength":10,"pattern":"\\d+"}}], expected: {"phone":"Must be at least 10 characters"} },
  ],
};

export default challenge;
