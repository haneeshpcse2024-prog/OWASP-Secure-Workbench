export interface ScannerRule {
  id: string;
  title: string;
  regex: RegExp;
  patternString: string;
  advice: string;
  owaspCategory: string;
  severity: 'High' | 'Medium';
}

export const SCANNER_RULES: ScannerRule[] = [
  {
    id: 'sql-concat',
    title: 'SQL string concatenation',
    regex: /execute\s*\(\s*["'][^"']*\s*\+\s*[A-Za-z_]/i,
    patternString: 'execute\\s*\\(\\s*["\'][^"\']*\\s*\\+\\s*[A-Za-z_]',
    advice: 'Review query construction; use driver-supported parameterized queries.',
    owaspCategory: 'A03:2021 — Injection',
    severity: 'High',
  },
  {
    id: 'untrusted-html',
    title: 'Untrusted HTML insertion',
    regex: /\.innerHTML\s*=/i,
    patternString: '\\.innerHTML\\s*=',
    advice: 'For plain text, use textContent; for rich HTML, use a vetted sanitizer.',
    owaspCategory: 'A03:2021 — Injection (XSS)',
    severity: 'High',
  },
  {
    id: 'hardcoded-secret',
    title: 'Possible hard-coded secret',
    regex: /(password|secret|api[_-]?key)\s*=\s*["'][^"']{4,}["']/i,
    patternString: '(?i)(password|secret|api[_-]?key)\\s*=\\s*["\'][^"\']{4,}["\']',
    advice: 'Move secrets to environment configuration or a secret manager.',
    owaspCategory: 'A02:2021 — Cryptographic Failures',
    severity: 'High',
  },
  {
    id: 'eval-usage',
    title: 'Possible eval usage',
    regex: /\beval\s*\(/i,
    patternString: '\\beval\\s*\\(',
    advice: 'Avoid evaluating dynamic strings; use explicit parsing and safe APIs.',
    owaspCategory: 'A03:2021 — Injection / Code Exec',
    severity: 'Medium',
  },
];

export interface ScanFinding {
  lineNumber: number;
  lineContent: string;
  ruleTitle: string;
  advice: string;
  owaspCategory: string;
  severity: 'High' | 'Medium';
}

export function runChecklistScan(codeText: string): ScanFinding[] {
  const findings: ScanFinding[] = [];
  const lines = codeText.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const rule of SCANNER_RULES) {
      if (rule.regex.test(line)) {
        findings.push({
          lineNumber: index + 1,
          lineContent: line.trim(),
          ruleTitle: rule.title,
          advice: rule.advice,
          owaspCategory: rule.owaspCategory,
          severity: rule.severity,
        });
      }
    }
  });

  return findings;
}

export interface PresetSnippet {
  id: string;
  name: string;
  category: string;
  type: 'insecure' | 'secure';
  code: string;
  expectedResult: string;
  notes: string;
}

export const PRESET_SNIPPETS: PresetSnippet[] = [
  {
    id: 'pair1-insecure',
    name: 'Pair 1: SQL Concatenation',
    category: 'SQL Injection',
    type: 'insecure',
    expectedResult: 'Triggers SQL string concatenation rule',
    notes: 'String concatenation merges untrusted input directly into SQL statement syntax.',
    code: `# BAD: user input is merged into SQL text.
query = "SELECT id, name FROM users WHERE email = '" + email + "'"
cursor.execute(query)
`,
  },
  {
    id: 'pair1-secure',
    name: 'Pair 1: Parameterized SQL',
    category: 'SQL Injection',
    type: 'secure',
    expectedResult: 'Clean pass (No patterns detected)',
    notes: 'Input is treated strictly as data parameters, preventing query alteration.',
    code: `# GOOD: the driver sends the value as a parameter.
cursor.execute(
    "SELECT id, name FROM users WHERE email = ?",
    (email,)
)
`,
  },
  {
    id: 'pair2-insecure',
    name: 'Pair 2: Untrusted innerHTML',
    category: 'XSS & Output Encoding',
    type: 'insecure',
    expectedResult: 'Triggers Untrusted HTML insertion rule',
    notes: 'Assigning to innerHTML causes the browser to parse untrusted strings as DOM nodes.',
    code: `// BAD: treats user-controlled text as HTML.
messageBox.innerHTML = commentFromUser;
`,
  },
  {
    id: 'pair2-secure',
    name: 'Pair 2: Safe textContent',
    category: 'XSS & Output Encoding',
    type: 'secure',
    expectedResult: 'Clean pass (No patterns detected)',
    notes: 'textContent assigns data strictly as a text node without HTML parsing.',
    code: `// GOOD: renders the value as text, not markup.
messageBox.textContent = commentFromUser;
`,
  },
  {
    id: 'pair3-insecure',
    name: 'Pair 3: Client-Only Trust Validation',
    category: 'Input Validation',
    type: 'insecure',
    expectedResult: 'Note: Logic flaw (Scanner limitation demo)',
    notes: 'Heuristic scanners cannot detect missing server validation logic. Human code review is required.',
    code: `# BAD: assumes the browser has already validated this value.
age = int(request.form["age"])
create_profile(age=age)
`,
  },
  {
    id: 'pair3-secure',
    name: 'Pair 3: Server Type & Range Check',
    category: 'Input Validation',
    type: 'secure',
    expectedResult: 'Clean pass',
    notes: 'Explicit type coercion and business logic range validation on the server boundary.',
    code: `# GOOD: validate type and business range on the server.
raw_age = request.form.get("age", "")
try:
    age = int(raw_age)
except (TypeError, ValueError):
    raise ValueError("Age must be a whole number")

if not 13 <= age <= 120:
    raise ValueError("Age is outside the accepted range")

create_profile(age=age)
`,
  },
  {
    id: 'pair4-insecure',
    name: 'Pair 4: Unchecked ID Lookup (IDOR)',
    category: 'Authorization',
    type: 'insecure',
    expectedResult: 'Note: Logic flaw (Scanner limitation demo)',
    notes: 'Missing tenant/ownership checks cannot be caught by regex alone.',
    code: `# BAD: any signed-in user who knows an ID may fetch the record.
document = Document.get(id=document_id)
return document
`,
  },
  {
    id: 'pair4-secure',
    name: 'Pair 4: Scoped Ownership Lookup',
    category: 'Authorization',
    type: 'secure',
    expectedResult: 'Clean pass',
    notes: 'Limits document retrieval strictly to authenticated owner_id on the server.',
    code: `# GOOD: scope the lookup to the authenticated owner.
document = Document.get(
    id=document_id,
    owner_id=current_user.id
)
if document is None:
    return not_found()
return document
`,
  },
  {
    id: 'pair5-insecure',
    name: 'Pair 5: Hardcoded Database Password',
    category: 'Secret Management',
    type: 'insecure',
    expectedResult: 'Triggers Possible hard-coded secret rule',
    notes: 'Credentials committed in source code risk leak via version control or backups.',
    code: `# BAD: secret is committed with the source code.
DATABASE_PASSWORD = "my-database-password"
`,
  },
  {
    id: 'pair5-secure',
    name: 'Pair 5: Environment Config Secret',
    category: 'Secret Management',
    type: 'secure',
    expectedResult: 'Clean pass (No patterns detected)',
    notes: 'Retrieves secret from process environment variables or cloud secrets manager.',
    code: `# GOOD: read configuration from the runtime environment.
import os

DATABASE_PASSWORD = os.environ["DATABASE_PASSWORD"]
`,
  },
  {
    id: 'eval-insecure',
    name: 'Dynamic Eval Call',
    category: 'Code Injection',
    type: 'insecure',
    expectedResult: 'Triggers Possible eval usage rule',
    notes: 'Dynamic code evaluation executes arbitrary instructions inside application context.',
    code: `// BAD: dynamic execution of unvetted string
const parsedData = eval("(" + userInputJson + ")");
`,
  },
];
