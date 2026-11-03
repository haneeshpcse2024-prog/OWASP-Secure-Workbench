export interface OwaspCategory {
  id: string;
  code: string;
  title: string;
  oneLiner: string;
  summary: string;
  commonMistake: string;
  defensiveHabit: string;
  keyRule: string;
  cheatSheetSummary: {
    meaning: string;
    habit: string;
  };
}

export const OWASP_TOP_10: OwaspCategory[] = [
  {
    id: 'a01',
    code: 'A01:2021',
    title: 'Broken Access Control',
    oneLiner: 'Enforce authorization on the server for every protected request and resource.',
    summary: 'Access control decides who may perform an action or access a resource. A common design mistake is hiding an "Edit" button from ordinary users in the browser but failing to check permissions on the server. A user can make a request directly using an API tool and reach an action they do not own.',
    commonMistake: 'Relying on frontend UI logic (e.g. hidden buttons or client routes) without checking the user session and permissions server-side on each endpoint.',
    defensiveHabit: 'Deny access by default, apply least privilege, verify record ownership (tenant boundaries) on every server query, and test thoroughly with multi-role accounts.',
    keyRule: 'Never trust client-side state. Authorize every request on the server.',
    cheatSheetSummary: {
      meaning: 'A user can perform an action or access data they should not be allowed to.',
      habit: 'Check permission on the server for every protected action and record.',
    },
  },
  {
    id: 'a02',
    code: 'A02:2021',
    title: 'Cryptographic Failures',
    oneLiner: 'Protect sensitive data in transit with HTTPS, at rest with strong hashing and encryption.',
    summary: 'Cryptographic failures occur when sensitive information is not adequately protected. Examples include transmitting passwords over unencrypted HTTP, storing user passwords in plain text or reversible formats, or placing secret keys in public source code repositories.',
    commonMistake: 'Storing passwords using MD5/SHA256 fast hashes instead of slow memory-hard password hashers like Argon2 or bcrypt, or leaving API keys hardcoded in JavaScript files.',
    defensiveHabit: 'Enforce TLS 1.3 / HTTPS everywhere. Use purpose-built password hashing (Argon2, bcrypt, scrypt) via audited libraries. Store secret keys in environment variables or dedicated secret vaults.',
    keyRule: 'Store passwords with modern salted hashes. Move credentials out of Git.',
    cheatSheetSummary: {
      meaning: 'Sensitive information is exposed because encryption or secret handling is missing or weak.',
      habit: 'Use HTTPS, safe password hashing, and protected secret storage.',
    },
  },
  {
    id: 'a03',
    code: 'A03:2021',
    title: 'Injection',
    oneLiner: 'Keep data separate from commands: use parameterized queries and safe text APIs.',
    summary: 'Injection happens when an application treats untrusted input as part of a command or query. SQL injection is a familiar example: building a database query by joining user text into SQL can change the meaning of the query. The same principle applies to command injection and Cross-Site Scripting (XSS).',
    commonMistake: 'Attempting to sanitize input by stripping quotes or special characters using simple regexes instead of using the driver parameterized query engine.',
    defensiveHabit: 'Always use parameterized queries, prepared statements, or a well-maintained ORM. For browser rendering, use textContent or safe frameworks (React/Vue) that escape by default.',
    keyRule: 'Never concatenate untrusted input into query strings or shell commands.',
    cheatSheetSummary: {
      meaning: 'Untrusted data is interpreted as part of a command or query.',
      habit: 'Keep data separate from commands: use parameterized queries and safe APIs.',
    },
  },
  {
    id: 'a04',
    code: 'A04:2021',
    title: 'Insecure Design',
    oneLiner: 'Plan for abuse cases, define security requirements, and apply least privilege early.',
    summary: 'Insecure design means that security was not adequately considered while planning the application architecture. A password-reset feature, for example, needs a safe identity-verification process, limits on repeated requests, and tokens that expire. Adding a patch after release cannot fix a flawed workflow.',
    commonMistake: 'Focusing exclusively on the "happy path" without performing threat modeling or considering how an adversary could abuse business workflows.',
    defensiveHabit: 'Perform basic threat modeling early. Define trust boundaries, validate rate limits on critical flows, enforce defense-in-depth, and conduct abuse-case reviews before writing code.',
    keyRule: 'Security is an architectural foundation, not an afterthought patch.',
    cheatSheetSummary: {
      meaning: 'Security requirements and threat scenarios were not considered during design.',
      habit: 'Plan for abuse cases, security requirements, and least privilege.',
    },
  },
  {
    id: 'a05',
    code: 'A05:2021',
    title: 'Security Misconfiguration',
    oneLiner: 'Apply secure defaults, disable production debug modes, and remove default accounts.',
    summary: 'A secure codebase can still be compromised by unsafe settings. Examples include leaving debug mode enabled in production, retaining default admin passwords, exposing unnecessary sample endpoints, or serving verbose error pages that leak database connection strings and stack traces.',
    commonMistake: 'Deploying default configurations directly to production servers or leaving cloud storage buckets publicly readable.',
    defensiveHabit: 'Use automated framework production checklists. Turn off verbose debug mode in production. Configure secure HTTP headers (CSP, HSTS, X-Content-Type-Options) and keep permissions narrow.',
    keyRule: 'Audit default settings. Ensure safe defaults across dev and prod.',
    cheatSheetSummary: {
      meaning: 'Unsafe defaults, unnecessary features, verbose errors, or incorrect settings expose the app.',
      habit: 'Use secure defaults; turn off production debug; remove defaults.',
    },
  },
  {
    id: 'a06',
    code: 'A06:2021',
    title: 'Vulnerable and Outdated Components',
    oneLiner: 'Maintain an inventory of dependencies, monitor CVE advisories, and patch regularly.',
    summary: 'Modern web applications depend on hundreds of third-party open source packages. An unpatched library may contain a known remote code execution or authentication bypass vulnerability that automated scanning bots exploit within hours.',
    commonMistake: 'Blindly copying install commands suggested by AI or tutorials without verifying the package name, author, version, and whether it is maintained.',
    defensiveHabit: 'Keep an accurate dependency inventory (package-lock.json). Regularly run vulnerability audits (e.g. npm audit) and remove libraries that are abandoned or redundant.',
    keyRule: 'Keep third-party packages updated. Verify AI-suggested packages.',
    cheatSheetSummary: {
      meaning: 'Libraries, frameworks, or other components have known weaknesses or are unsupported.',
      habit: 'Inventory, review, and update supported libraries and frameworks.',
    },
  },
  {
    id: 'a07',
    code: 'A07:2021',
    title: 'Identification and Authentication Failures',
    oneLiner: 'Use vetted authentication libraries, enforce rate limiting, and protect sessions.',
    summary: 'Authentication verifies who a user is. Weak password policies, insecure session storage, predictable session tokens, or missing brute-force protection leave accounts open to credential stuffing and account takeover.',
    commonMistake: 'Creating a custom, homemade session and password handling implementation instead of leveraging mature, battle-tested framework authentication modules.',
    defensiveHabit: 'Use established authentication libraries. Enforce MFA where appropriate, rate-limit login endpoints, use HttpOnly Secure SameSite cookies, and regenerate session IDs on login.',
    keyRule: 'Never invent custom authentication algorithms; rely on tested standards.',
    cheatSheetSummary: {
      meaning: 'Login, identity checks, or session handling can be bypassed or misused.',
      habit: 'Use trusted auth libraries and protect sessions and recovery flows.',
    },
  },
  {
    id: 'a08',
    code: 'A08:2021',
    title: 'Software and Data Integrity Failures',
    oneLiner: 'Verify software supply chains, build artifacts, and untrusted serialized data.',
    summary: 'Integrity failures happen when code or critical configuration is accepted without verifying its authenticity and integrity. Examples include pulling build plugins from untrusted CDN URLs, deserializing untrusted objects, or updating software without signature verification.',
    commonMistake: 'Trusting user-supplied JSON or binary serialized objects directly without schema validation or signature checks.',
    defensiveHabit: 'Use lockfiles with cryptographic hashes, configure subresource integrity (SRI) on frontend script tags, and never deserialize untrusted data with unrestricted native deserializers.',
    keyRule: 'Cryptographically verify software dependencies and external data sources.',
    cheatSheetSummary: {
      meaning: 'The application trusts code, updates, or data without verifying integrity.',
      habit: 'Trust verified sources; protect build, update, and release processes.',
    },
  },
  {
    id: 'a09',
    code: 'A09:2021',
    title: 'Security Logging and Monitoring Failures',
    oneLiner: 'Log critical security events with context, but never log passwords or secrets.',
    summary: 'Logs allow security teams to detect attacks in progress and conduct forensic analysis after an incident. If failed login spikes, privilege escalation attempts, or unauthorized record access are never recorded, breaches can persist unnoticed for months.',
    commonMistake: 'Either logging nothing at all, or logging sensitive user inputs such as plaintext passwords, credit card numbers, or session tokens into centralized log files.',
    defensiveHabit: 'Record security events (authentication outcomes, permission denials, rate limit breaches) with timestamps. Exclude secrets and passwords from log parameters.',
    keyRule: 'Log security actions meaningfully; keep secrets out of logs.',
    cheatSheetSummary: {
      meaning: 'Important security events are not recorded or reviewed effectively.',
      habit: 'Record useful events, monitor them, and never log secrets.',
    },
  },
  {
    id: 'a10',
    code: 'A10:2021',
    title: 'Server-Side Request Forgery (SSRF)',
    oneLiner: 'Restrict outbound HTTP requests with strict destination allow-lists and network controls.',
    summary: 'SSRF occurs when a web server fetches a remote resource (e.g. fetching an avatar image or webhook) based on a URL supplied by the user without sufficient destination validation. An attacker can trick the server into probing internal cloud metadata services (e.g. 169.254.169.254) or intranet databases.',
    commonMistake: 'Validating URLs only in the frontend browser or using weak blacklist checks that can be bypassed using DNS rebinding or numeric IP formats.',
    defensiveHabit: 'Avoid fetching arbitrary user-supplied URLs. If required, use an explicit allow-list of domains, validate DNS resolution, disable HTTP redirects, and enforce network isolation.',
    keyRule: 'Never fetch user-supplied URLs without server-side allowlists and network controls.',
    cheatSheetSummary: {
      meaning: 'A server is tricked into making requests to destinations it should not reach.',
      habit: 'Restrict server-side URL fetching with allow-lists and network controls.',
    },
  },
];
