# Secure-Coding Checklist

Use this checklist during design, coding, code review, and before a demo. Mark each item **Pass / Needs work / Not applicable** and record evidence.

## Access control and identity
- [ ] The server checks authorization for every protected action and resource.
- [ ] Access is denied by default; users receive only the permissions they need.
- [ ] Object ownership / tenant boundaries are checked server-side.
- [ ] Authentication uses a maintained framework/library.
- [ ] Passwords are stored using a modern password-hashing function (never plaintext or reversible encryption).
- [ ] Session cookies use `HttpOnly`, `Secure` (under HTTPS), and an appropriate `SameSite` setting.

## Input, output, and data
- [ ] Database queries use parameterized statements or a safe ORM.
- [ ] Input is validated by type, length, range, and allow-list where practical.
- [ ] Output is encoded for its context; untrusted text is not inserted as raw HTML.
- [ ] CSRF protections are enabled for state-changing browser requests where applicable.
- [ ] Sensitive data is minimized and encrypted in transit using HTTPS.
- [ ] Secrets are stored outside source control and rotated if exposed.

## Configuration and dependencies
- [ ] Debug mode and verbose error pages are disabled in production.
- [ ] Default credentials, sample endpoints, and unnecessary services are removed.
- [ ] Dependencies are maintained, supported, and updated.
- [ ] Security headers and TLS settings follow framework guidance.
- [ ] Uploads are size/type constrained, stored safely, and never executed as code.

## Integrity, logging, and outbound requests
- [ ] Critical updates and downloaded artifacts come from trusted sources and have integrity checks.
- [ ] Logs capture useful security events but exclude passwords, session tokens, and secrets.
- [ ] Logs are access-controlled and monitored.
- [ ] User-controlled URLs are not fetched without strict destination validation and network controls.
- [ ] Error messages reveal no stack traces, secrets, or internal infrastructure details.

## Process
- [ ] Threats and abuse cases were considered before implementation.
- [ ] Security checks are part of code review and CI.
- [ ] AI-generated code was checked against official documentation and tested.
- [ ] Practice is limited to owned local systems or approved training labs.
