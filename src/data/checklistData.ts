export type ChecklistStatus = 'pass' | 'needs-work' | 'na' | 'unreviewed';

export interface ChecklistItem {
  id: string;
  category: string;
  criterion: string;
  guidance: string;
  owaspMapping: string;
}

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Access control and identity
  {
    id: 'ac-1',
    category: 'Access control and identity',
    criterion: 'The server checks authorization for every protected action and resource.',
    guidance: 'Verify that every controller or endpoint handler executes a session and permission check.',
    owaspMapping: 'A01:2021 — Broken Access Control',
  },
  {
    id: 'ac-2',
    category: 'Access control and identity',
    criterion: 'Access is denied by default; users receive only the permissions they need.',
    guidance: 'Default state should reject unauthenticated or unpermitted operations unless explicitly granted.',
    owaspMapping: 'A01:2021 — Broken Access Control',
  },
  {
    id: 'ac-3',
    category: 'Access control and identity',
    criterion: 'Object ownership / tenant boundaries are checked server-side.',
    guidance: 'Enforce user_id / org_id filters in all SQL queries and ORM lookups.',
    owaspMapping: 'A01:2021 — Broken Access Control (IDOR)',
  },
  {
    id: 'ac-4',
    category: 'Access control and identity',
    criterion: 'Authentication uses a maintained framework/library.',
    guidance: 'Avoid custom homegrown authentication loops; use mature libraries (Passport, Django Auth, etc.).',
    owaspMapping: 'A07:2021 — Authentication Failures',
  },
  {
    id: 'ac-5',
    category: 'Access control and identity',
    criterion: 'Passwords are stored using a modern password-hashing function.',
    guidance: 'Never store plain text or MD5/SHA-1; use Argon2id, bcrypt, or scrypt with adequate work factor.',
    owaspMapping: 'A02:2021 — Cryptographic Failures',
  },
  {
    id: 'ac-6',
    category: 'Access control and identity',
    criterion: 'Session cookies use HttpOnly, Secure (under HTTPS), and an appropriate SameSite setting.',
    guidance: 'Prevent JavaScript access to session tokens and guard against cross-site request forgery.',
    owaspMapping: 'A07:2021 — Authentication Failures',
  },

  // Input, output, and data
  {
    id: 'io-1',
    category: 'Input, output, and data',
    criterion: 'Database queries use parameterized statements or a safe ORM.',
    guidance: 'Keep user input separated from SQL syntax; no string concatenation.',
    owaspMapping: 'A03:2021 — Injection',
  },
  {
    id: 'io-2',
    category: 'Input, output, and data',
    criterion: 'Input is validated by type, length, range, and allow-list where practical.',
    guidance: 'Do not rely on browser checks alone; validate all input on the server.',
    owaspMapping: 'A04:2021 — Insecure Design',
  },
  {
    id: 'io-3',
    category: 'Input, output, and data',
    criterion: 'Output is encoded for its context; untrusted text is not inserted as raw HTML.',
    guidance: 'Use textContent or safe framework interpolations; use sanitized parsers for rich content.',
    owaspMapping: 'A03:2021 — Injection (XSS)',
  },
  {
    id: 'io-4',
    category: 'Input, output, and data',
    criterion: 'CSRF protections are enabled for state-changing browser requests where applicable.',
    guidance: 'Use CSRF tokens or SameSite=Lax/Strict session configurations for POST/PUT/DELETE.',
    owaspMapping: 'A01:2021 — Broken Access Control',
  },
  {
    id: 'io-5',
    category: 'Input, output, and data',
    criterion: 'Sensitive data is minimized and encrypted in transit using HTTPS.',
    guidance: 'Do not collect unnecessary PII; enforce TLS across all endpoints.',
    owaspMapping: 'A02:2021 — Cryptographic Failures',
  },
  {
    id: 'io-6',
    category: 'Input, output, and data',
    criterion: 'Secrets are stored outside source control and rotated if exposed.',
    guidance: 'Use .env or cloud secrets managers; never commit credentials into Git.',
    owaspMapping: 'A05:2021 — Security Misconfiguration',
  },

  // Configuration and dependencies
  {
    id: 'cd-1',
    category: 'Configuration and dependencies',
    criterion: 'Debug mode and verbose error pages are disabled in production.',
    guidance: 'Do not display stack traces, database credentials, or internal paths to end users.',
    owaspMapping: 'A05:2021 — Security Misconfiguration',
  },
  {
    id: 'cd-2',
    category: 'Configuration and dependencies',
    criterion: 'Default credentials, sample endpoints, and unnecessary services are removed.',
    guidance: 'Change factory passwords and remove tutorial routes before deployment.',
    owaspMapping: 'A05:2021 — Security Misconfiguration',
  },
  {
    id: 'cd-3',
    category: 'Configuration and dependencies',
    criterion: 'Dependencies are maintained, supported, and updated.',
    guidance: 'Run dependency vulnerability scanners (npm audit, Snyk) and remove abandoned libraries.',
    owaspMapping: 'A06:2021 — Vulnerable Components',
  },
  {
    id: 'cd-4',
    category: 'Configuration and dependencies',
    criterion: 'Security headers and TLS settings follow framework guidance.',
    guidance: 'Configure Content-Security-Policy, Strict-Transport-Security, and X-Content-Type-Options.',
    owaspMapping: 'A05:2021 — Security Misconfiguration',
  },
  {
    id: 'cd-5',
    category: 'Configuration and dependencies',
    criterion: 'Uploads are size/type constrained, stored safely, and never executed as code.',
    guidance: 'Store uploaded files in isolated storage and never serve them from executable web roots.',
    owaspMapping: 'A04:2021 — Insecure Design',
  },

  // Integrity, logging, and outbound requests
  {
    id: 'il-1',
    category: 'Integrity, logging, and outbound requests',
    criterion: 'Critical updates and downloaded artifacts come from trusted sources with integrity checks.',
    guidance: 'Use hash verification, subresource integrity (SRI), and trusted repositories.',
    owaspMapping: 'A08:2021 — Software & Data Integrity Failures',
  },
  {
    id: 'il-2',
    category: 'Integrity, logging, and outbound requests',
    criterion: 'Logs capture useful security events but exclude passwords, session tokens, and secrets.',
    guidance: 'Record authentication events, failed logins, and access denials without logging credentials.',
    owaspMapping: 'A09:2021 — Logging & Monitoring Failures',
  },
  {
    id: 'il-3',
    category: 'Integrity, logging, and outbound requests',
    criterion: 'Logs are access-controlled and monitored.',
    guidance: 'Protect log storage against tampering and set up alerts for anomalous access spikes.',
    owaspMapping: 'A09:2021 — Logging & Monitoring Failures',
  },
  {
    id: 'il-4',
    category: 'Integrity, logging, and outbound requests',
    criterion: 'User-controlled URLs are not fetched without strict destination validation and network controls.',
    guidance: 'Validate outgoing URLs against explicit allow-lists to defend against SSRF.',
    owaspMapping: 'A10:2021 — Server-Side Request Forgery',
  },
  {
    id: 'il-5',
    category: 'Integrity, logging, and outbound requests',
    criterion: 'Error messages reveal no stack traces, secrets, or internal infrastructure details.',
    guidance: 'Show user-friendly generic messages on errors while logging technical details privately.',
    owaspMapping: 'A05:2021 — Security Misconfiguration',
  },

  // Process
  {
    id: 'pr-1',
    category: 'Process and AI verification',
    criterion: 'Threats and abuse cases were considered before implementation.',
    guidance: 'Formulate abuse scenarios (e.g., negative amounts, ID tampering) during initial design.',
    owaspMapping: 'A04:2021 — Insecure Design',
  },
  {
    id: 'pr-2',
    category: 'Process and AI verification',
    criterion: 'Security checks are part of code review and CI.',
    guidance: 'Incorporate automated static checks and pull request review questions.',
    owaspMapping: 'SDLC Best Practices',
  },
  {
    id: 'pr-3',
    category: 'Process and AI verification',
    criterion: 'AI-generated code was checked against official documentation and tested.',
    guidance: 'Treat AI output as a draft; verify citations against OWASP, NIST, and MDN.',
    owaspMapping: 'AI Verification Framework',
  },
  {
    id: 'pr-4',
    category: 'Process and AI verification',
    criterion: 'Practice is limited to owned local systems or approved training labs.',
    guidance: 'Do not test third-party systems without authorization; adhere strictly to ethical guidelines.',
    owaspMapping: 'Ethical Standards',
  },
];
