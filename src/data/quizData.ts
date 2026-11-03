export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  owaspCategory: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What should enforce access to a private record?',
    options: [
      { key: 'A', text: 'Hiding the link in the browser' },
      { key: 'B', text: 'A server-side authorization check' },
      { key: 'C', text: 'Changing the button colour' },
      { key: 'D', text: 'A comment in the source code' },
    ],
    correctAnswer: 'B',
    explanation: 'The server must authorize each protected request. Client-side controls can easily be bypassed by making direct HTTP calls via tools like curl or Postman.',
    owaspCategory: 'A01:2021 — Broken Access Control',
  },
  {
    id: 2,
    question: 'Which approach best prevents SQL injection?',
    options: [
      { key: 'A', text: 'Remove spaces from input' },
      { key: 'B', text: 'Use parameterized queries' },
      { key: 'C', text: 'Hide SQL errors only' },
      { key: 'D', text: 'Use a longer SQL string' },
    ],
    correctAnswer: 'B',
    explanation: 'Parameters keep user input completely separate from SQL grammar so the database engine never interprets data as SQL syntax.',
    owaspCategory: 'A03:2021 — Injection',
  },
  {
    id: 3,
    question: 'What is the safest way to display a user comment as plain text in the browser?',
    options: [
      { key: 'A', text: 'innerHTML' },
      { key: 'B', text: 'eval()' },
      { key: 'C', text: 'textContent' },
      { key: 'D', text: 'Concatenate it into a script' },
    ],
    correctAnswer: 'C',
    explanation: 'textContent inserts the value as a plain DOM TextNode rather than passing it to the browser HTML parser, preventing Cross-Site Scripting (XSS).',
    owaspCategory: 'A03:2021 — Injection (XSS)',
  },
  {
    id: 4,
    question: 'Why should passwords not be stored as plain text?',
    options: [
      { key: 'A', text: 'They take more disk space' },
      { key: 'B', text: 'A database leak would expose readable passwords' },
      { key: 'C', text: 'Browsers cannot display them' },
      { key: 'D', text: 'They cannot be searched' },
    ],
    correctAnswer: 'B',
    explanation: 'Plain-text storage immediately exposes all user credentials if the database or backups are leaked or accessed improperly. Always use salted password hashes like Argon2 or bcrypt.',
    owaspCategory: 'A02:2021 — Cryptographic Failures',
  },
  {
    id: 5,
    question: 'Which is an example of security misconfiguration?',
    options: [
      { key: 'A', text: 'Debug mode enabled on a public production site' },
      { key: 'B', text: 'Using parameterized queries' },
      { key: 'C', text: 'Checking record ownership' },
      { key: 'D', text: 'Updating dependencies' },
    ],
    correctAnswer: 'A',
    explanation: 'Debug details on public production systems can disclose stack traces, environment secrets, and internal directory paths to attackers.',
    owaspCategory: 'A05:2021 — Security Misconfiguration',
  },
  {
    id: 6,
    question: 'What should developers do about outdated dependencies?',
    options: [
      { key: 'A', text: 'Ignore them if the app runs' },
      { key: 'B', text: 'Keep an inventory and update supported packages' },
      { key: 'C', text: 'Download random replacement files' },
      { key: 'D', text: 'Disable all logs' },
    ],
    correctAnswer: 'B',
    explanation: 'Developers must track, review, and regularly update maintained components to patch known vulnerabilities and CVEs.',
    owaspCategory: 'A06:2021 — Vulnerable and Outdated Components',
  },
  {
    id: 7,
    question: 'What does authentication answer?',
    options: [
      { key: 'A', text: 'What a user is allowed to do' },
      { key: 'B', text: 'Who the user is' },
      { key: 'C', text: 'Which CSS theme is active' },
      { key: 'D', text: 'Where a server is hosted' },
    ],
    correctAnswer: 'B',
    explanation: 'Authentication establishes and verifies who the user is (identity), whereas authorization determines what permissions that user has.',
    owaspCategory: 'A07:2021 — Identification and Authentication Failures',
  },
  {
    id: 8,
    question: 'Which information should normally be excluded from application logs?',
    options: [
      { key: 'A', text: 'Timestamp' },
      { key: 'B', text: 'Event type' },
      { key: 'C', text: 'Passwords and session tokens' },
      { key: 'D', text: 'Request outcome' },
    ],
    correctAnswer: 'C',
    explanation: 'Logging credentials, session cookies, or API keys exposes sensitive secrets to anyone with access to log viewing tools, centralized log aggregators, or backups.',
    owaspCategory: 'A09:2021 — Security Logging and Monitoring Failures',
  },
  {
    id: 9,
    question: 'What is a defensive SSRF measure?',
    options: [
      { key: 'A', text: 'Fetch every URL without restrictions' },
      { key: 'B', text: 'Allow-list expected destinations and apply network controls' },
      { key: 'C', text: 'Trust browser validation' },
      { key: 'D', text: 'Disable authentication' },
    ],
    correctAnswer: 'B',
    explanation: 'Restricting outbound HTTP calls to an explicit allowlist of remote domains and blocking access to loopback (127.0.0.1) and internal network ranges prevents SSRF.',
    owaspCategory: 'A10:2021 — Server-Side Request Forgery (SSRF)',
  },
  {
    id: 10,
    question: 'How should AI-generated security advice be treated?',
    options: [
      { key: 'A', text: 'Always correct' },
      { key: 'B', text: 'Safe if confidently worded' },
      { key: 'C', text: 'A draft that must be checked against reliable sources and tested' },
      { key: 'D', text: 'A replacement for code review' },
    ],
    correctAnswer: 'C',
    explanation: 'AI tools can confidently invent APIs, hallucinate citations, or miss subtle security flaws. AI output must be treated as a draft and verified against authoritative documentation (OWASP, NIST, MDN).',
    owaspCategory: 'Verification & AI Governance',
  },
];
