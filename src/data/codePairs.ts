export interface CodePair {
  id: string;
  pairNumber: number;
  title: string;
  topic: string;
  language: string;
  owaspCategory: string;
  cwe: string;
  riskSummary: string;
  insecureCode: string;
  insecureExplanation: string;
  secureCode: string;
  secureExplanation: string;
  benefit: string;
  verificationSource: string;
  verificationUrl: string;
}

export const CODE_PAIRS: CodePair[] = [
  {
    id: 'pair-1',
    pairNumber: 1,
    title: 'SQL Injection Prevention (Python DB-API)',
    topic: 'Database Queries',
    language: 'python',
    owaspCategory: 'A03:2021 — Injection',
    cwe: 'CWE-89: SQL Injection',
    riskSummary: 'Joining user text into SQL can change the query structure, enabling attackers to bypass authentication, read unauthorized records, or dump entire database tables.',
    insecureCode: `# BAD: user input is merged into SQL text.
query = "SELECT id, name FROM users WHERE email = '" + email + "'"
cursor.execute(query)`,
    insecureExplanation: 'Direct string concatenation creates an executable SQL grammar containing untrusted characters. An input like "\' OR \'1\'=\'1" changes the WHERE condition permanently.',
    secureCode: `# GOOD: the driver sends the value as a parameter.
cursor.execute(
    "SELECT id, name FROM users WHERE email = ?",
    (email,)
)`,
    secureExplanation: 'The database driver compiles the SQL query structure first, then binds the user value separately as literal data. The data cannot be parsed as SQL command keywords.',
    benefit: 'Input remains strictly data. Query structure is pre-compiled regardless of input contents.',
    verificationSource: 'OWASP SQL Injection Prevention Cheat Sheet',
    verificationUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html',
  },
  {
    id: 'pair-2',
    pairNumber: 2,
    title: 'Safe Text Rendering (Browser JavaScript)',
    topic: 'DOM Output Encoding & XSS',
    language: 'javascript',
    owaspCategory: 'A03:2021 — Injection (Cross-Site Scripting)',
    cwe: 'CWE-79: Cross-Site Scripting (XSS)',
    riskSummary: 'Inserting untrusted text as raw HTML causes the browser parser to interpret tags and script directives, permitting session cookie theft, credential harvesting, or unauthorized actions.',
    insecureCode: `// BAD: treats user-controlled text as HTML.
messageBox.innerHTML = commentFromUser;`,
    insecureExplanation: 'innerHTML forces the DOM engine to parse whatever text is provided as HTML. If commentFromUser contains <img src=x onerror=...>, malicious script executes immediately.',
    secureCode: `// GOOD: renders the value as text, not markup.
messageBox.textContent = commentFromUser;`,
    secureExplanation: 'textContent creates a pure DOM TextNode. Characters like <, >, and & are treated as textual characters and never compiled into HTML tags or executable script handlers.',
    benefit: 'Renders the value strictly as character text, completely bypassing the HTML parser and preventing DOM XSS.',
    verificationSource: 'MDN Web Security & OWASP XSS Prevention Cheat Sheet',
    verificationUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
  },
  {
    id: 'pair-3',
    pairNumber: 3,
    title: 'Server-Side Input Validation (Python)',
    topic: 'Input Validation & Type Safety',
    language: 'python',
    owaspCategory: 'A04:2021 — Insecure Design / Data Integrity',
    cwe: 'CWE-20: Improper Input Validation',
    riskSummary: 'Trusting browser-only validation allows unexpected values to reach application logic. Attackers can bypass HTML5 form constraints via Curl, Postman, or automated scripts.',
    insecureCode: `# BAD: assumes the browser has already validated this value.
age = int(request.form["age"])
create_profile(age=age)`,
    insecureExplanation: 'Direct casting without error handling crashes on non-numeric inputs, and missing bounds validation allows negative or impossible values (e.g., age = -999 or 999999).',
    secureCode: `# GOOD: validate type and business range on the server.
raw_age = request.form.get("age", "")
try:
    age = int(raw_age)
except (TypeError, ValueError):
    raise ValueError("Age must be a whole number")

if not 13 <= age <= 120:
    raise ValueError("Age is outside the accepted range")

create_profile(age=age)`,
    secureExplanation: 'The server acts as an uncompromising trust boundary: it safely checks existence, parses the integer with error recovery, and verifies that the value satisfies domain bounds (13–120).',
    benefit: 'Rejects invalid data at the server trust boundary before state changes occur, preventing logic corruption and unexpected exceptions.',
    verificationSource: 'OWASP Input Validation Cheat Sheet',
    verificationUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html',
  },
  {
    id: 'pair-4',
    pairNumber: 4,
    title: 'Object-Level Authorization (Python-Style Pseudocode)',
    topic: 'Access Control & IDOR',
    language: 'python',
    owaspCategory: 'A01:2021 — Broken Access Control',
    cwe: 'CWE-639: Authorization Bypass Through User-Controlled Key',
    riskSummary: 'Looking up a record by primary key alone without checking user ownership enables Insecure Direct Object References (IDOR). Any authenticated user can view or alter other users records.',
    insecureCode: `# BAD: any signed-in user who knows an ID may fetch the record.
document = Document.get(id=document_id)
return document`,
    insecureExplanation: 'The application verifies that a session exists, but fails to verify that the session user owns or is authorized to read document_id. Changing document_id=101 to 102 leaks data.',
    secureCode: `# GOOD: scope the lookup to the authenticated owner.
document = Document.get(
    id=document_id,
    owner_id=current_user.id
)
if document is None:
    return not_found()
return document`,
    secureExplanation: 'The query explicitly scopes the retrieval predicate with owner_id = current_user.id on the server. If user A requests user B record, the database returns no row, resulting in 404.',
    benefit: 'Enforces ownership and tenant boundary constraints at the query level on every single server request.',
    verificationSource: 'OWASP Authorization Cheat Sheet',
    verificationUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html',
  },
  {
    id: 'pair-5',
    pairNumber: 5,
    title: 'Secret Management (Python)',
    topic: 'Credential Storage',
    language: 'python',
    owaspCategory: 'A02:2021 — Cryptographic Failures / Misconfiguration',
    cwe: 'CWE-798: Use of Hard-coded Credentials',
    riskSummary: 'Hardcoding passwords, API tokens, and private keys embeds sensitive credentials into source files, exposing them in Git commit history, code reviews, and public repositories.',
    insecureCode: `# BAD: secret is committed with the source code.
DATABASE_PASSWORD = "my-database-password"`,
    insecureExplanation: 'Even if the file is later removed, git history keeps previous versions accessible. Automated bots continuously scrape public repos for leaked tokens.',
    secureCode: `# GOOD: read configuration from the runtime environment.
import os

DATABASE_PASSWORD = os.environ["DATABASE_PASSWORD"]`,
    secureExplanation: 'Loads credentials from runtime process environment variables or cloud secret managers (such as Google Secret Manager or AWS Secrets Manager). The code repository contains zero secrets.',
    benefit: 'Decouples code from secret credentials. Enables credential rotation without modifying code or committing changes to source control.',
    verificationSource: 'NIST SSDF SP 800-218 & OWASP Top 10 A02',
    verificationUrl: 'https://csrc.nist.gov/pubs/sp/800/218/final',
  },
];
