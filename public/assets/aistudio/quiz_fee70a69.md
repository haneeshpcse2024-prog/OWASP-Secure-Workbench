# Knowledge Check — 10 Questions

Choose the best answer.

1. What should enforce access to a private record?
   - A. Hiding the link in the browser
   - B. A server-side authorization check
   - C. Changing the button colour
   - D. A comment in the source code

2. Which approach best prevents SQL injection?
   - A. Remove spaces from input
   - B. Use parameterized queries
   - C. Hide SQL errors only
   - D. Use a longer SQL string

3. What is the safest way to display a user comment as plain text in the browser?
   - A. `innerHTML`
   - B. `eval()`
   - C. `textContent`
   - D. Concatenate it into a script

4. Why should passwords not be stored as plain text?
   - A. They take more disk space
   - B. A database leak would expose readable passwords
   - C. Browsers cannot display them
   - D. They cannot be searched

5. Which is an example of security misconfiguration?
   - A. Debug mode enabled on a public production site
   - B. Using parameterized queries
   - C. Checking record ownership
   - D. Updating dependencies

6. What should developers do about outdated dependencies?
   - A. Ignore them if the app runs
   - B. Keep an inventory and update supported packages
   - C. Download random replacement files
   - D. Disable all logs

7. What does authentication answer?
   - A. What a user is allowed to do
   - B. Who the user is
   - C. Which CSS theme is active
   - D. Where a server is hosted

8. Which information should normally be excluded from application logs?
   - A. Timestamp
   - B. Event type
   - C. Passwords and session tokens
   - D. Request outcome

9. What is a defensive SSRF measure?
   - A. Fetch every URL without restrictions
   - B. Allow-list expected destinations and apply network controls
   - C. Trust browser validation
   - D. Disable authentication

10. How should AI-generated security advice be treated?
   - A. Always correct
   - B. Safe if confidently worded
   - C. A draft that must be checked against reliable sources and tested
   - D. A replacement for code review

## Answer key

1. **B** — The server must authorize each protected request.
2. **B** — Parameters keep input separate from SQL syntax.
3. **C** — `textContent` inserts plain text rather than parsing HTML.
4. **B** — Plain-text storage exposes credentials immediately after a leak.
5. **A** — Debug details can disclose sensitive implementation information.
6. **B** — Track, review, and update maintained components.
7. **B** — Authentication establishes identity; authorization checks permissions.
8. **C** — Secrets in logs can be exposed to readers of log systems.
9. **B** — Restrict outbound destinations and network reachability.
10. **C** — AI output can be wrong, outdated, or unsafe.
