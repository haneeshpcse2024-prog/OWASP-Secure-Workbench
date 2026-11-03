# Research Report — Secure Coding Guide for Beginners

## 1. Project question and audience

**Question:** How can AI help beginners understand common web vulnerabilities and write safer code, without producing attack tools?

**Target audience:** Second-year Computer Science and Engineering students who know basic HTML, CSS, JavaScript, and introductory programming, but are new to application security.

**Learning goal:** Use AI as a tutor and reviewer—not as an authority or exploit generator. Students should be able to describe a risk, recognize a risky coding pattern, apply a defensive fix, and verify the result against primary documentation.

## 2. Research method

The research workflow is deliberately source-first:

1. Read the OWASP Top 10 category descriptions and prevention guidance.
2. Cross-check secure-development lifecycle principles against NIST SSDF.
3. Check browser and JavaScript behavior against MDN Web Docs.
4. Consult the official documentation for the framework actually used (for example, Django, Flask, Express, Spring, or ASP.NET Core).
5. Ask AI tools to explain concepts at beginner level and suggest questions for review.
6. Verify every technical claim and code sample against the primary sources; reject unsupported or unsafe suggestions.

### AI research tools to use and document

Use at least two tools for the research requirement and at least four free AI tools overall if your instructor expects four. Access and free-tier limits vary by region and date, so record the actual date, plan, prompts, and outputs. This repository does **not** claim that every tool below was independently queried.

| Tool | Appropriate task | Verification rule |
|---|---|---|
| ChatGPT | Simplify OWASP categories; review a defensive snippet | Compare with OWASP / framework docs |
| Google Gemini | Generate a beginner explanation and quiz draft | Check every answer against primary sources |
| Perplexity | Discover source pages and publication dates | Open and read the cited primary page |
| NotebookLM | Summarize source documents supplied by the student | Check the summary against the original documents |
| Claude / DeepSeek (optional alternative) | Second-opinion explanation or code review | Treat output as untrusted; verify independently |

**Research log to complete before submission:** Tool, date, exact prompt, sources opened, useful output, errors found, and correction made. Do not invent tool usage or citations.

## 3. OWASP Top 10:2021 summary

The OWASP Top 10:2021 is an awareness document describing important web application security risk categories. The following plain-language summaries are intentionally short:

1. **A01 Broken Access Control:** A user can perform an action or access data they should not be allowed to.
2. **A02 Cryptographic Failures:** Sensitive information is exposed because encryption or secret handling is missing or weak.
3. **A03 Injection:** Untrusted data is interpreted as part of a command or query.
4. **A04 Insecure Design:** Security requirements and threat scenarios were not considered during design.
5. **A05 Security Misconfiguration:** Unsafe defaults, unnecessary features, verbose errors, or incorrect settings expose the app.
6. **A06 Vulnerable and Outdated Components:** Libraries, frameworks, or other components have known weaknesses or are unsupported.
7. **A07 Identification and Authentication Failures:** Login, identity checks, or session handling can be bypassed or misused.
8. **A08 Software and Data Integrity Failures:** The application trusts code, updates, or data without verifying integrity.
9. **A09 Security Logging and Monitoring Failures:** Important security events are not recorded or reviewed effectively.
10. **A10 Server-Side Request Forgery (SSRF):** A server is tricked into making requests to destinations it should not reach.

## 4. Safe coding themes

- Enforce authorization on the server for every protected action and object.
- Use parameterized queries or a well-maintained ORM.
- Validate input against explicit allow-lists and expected types; encode output for its context.
- Use HTTPS, modern password hashing, and managed secret storage.
- Use framework-provided authentication, CSRF protection, and secure session settings.
- Keep dependencies patched and remove unused packages.
- Apply secure defaults, least privilege, and safe error handling.
- Log security-relevant events without logging passwords, tokens, or sensitive personal data.
- Validate outbound destinations and restrict server network access to reduce SSRF risk.
- Include security requirements and review throughout the development lifecycle.

## 5. Reliable source register

The project prioritizes primary standards and official documentation:

- OWASP Top 10:2021 — https://owasp.org/Top10/
- OWASP Cheat Sheet Series — https://cheatsheetseries.owasp.org/
- OWASP SQL Injection Prevention Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
- OWASP Input Validation Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
- OWASP Authorization Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- NIST Secure Software Development Framework (SSDF), SP 800-218 — https://csrc.nist.gov/pubs/sp/800/218/final
- MDN Web Security — https://developer.mozilla.org/en-US/docs/Web/Security
- Express production security best practices — https://expressjs.com/en/advanced/best-practice-security.html
- Django security documentation — https://docs.djangoproject.com/en/stable/topics/security/

Always check the edition and “last updated” date when you use a source. The framework guide should match the framework in your own project.

## 6. Findings and limitations

AI can make unfamiliar terms approachable, create analogies, produce quizzes, and explain why a defensive code pattern is safer. It can also invent API behavior, recommend deprecated methods, omit authorization checks, or generate dangerous payloads. Therefore, AI output is a draft, not evidence. The student remains responsible for source verification, testing, and safe scope.

The sample scanner in this repository uses simple text-pattern checks. It can produce false positives and false negatives and cannot understand program behavior, data flow, configuration, or deployment. It must not be presented as a replacement for code review, dependency scanning, testing, or a professional security assessment.
