# Before / After Analysis and Final Demo

## Example comparison

| Topic | Before (unsafe approach) | After (defensive approach) | Benefit |
|---|---|---|---|
| SQL query | Build SQL by concatenating input | Use parameterized query | Input remains data |
| Browser output | Insert user text with `innerHTML` | Use `textContent` for plain text | Avoids parsing untrusted text as HTML |
| Validation | Trust browser form checks | Validate type/range on server | Rejects unexpected values at trust boundary |
| Authorization | Fetch record by ID only | Scope lookup to current user / permission | Enforces ownership server-side |
| Secrets | Commit password in source | Load from environment/secret manager | Keeps credentials out of repository |

## Expected outcomes

The secure versions reduce specific risks, but no short snippet proves an entire application is secure. Framework configuration, data flow, permissions, deployment, and tests also matter.

## Final demo plan (5–7 minutes)

1. Introduce the audience and project question (30 seconds).
2. Explain three OWASP risks in plain language (90 seconds).
3. Open the five before/after code pairs and explain one defensive fix (2 minutes).
4. Run the checklist scanner locally: `python scripts/checklist_scan.py --path snippets` (1 minute).
5. Show the checklist, quiz, and one-page cheat sheet (1 minute).
6. Explain how AI outputs were verified and the ethical boundaries (1 minute).

## Demo safety

Use only the included local examples or an application you own. Do not test public websites, classmates' accounts, college systems, or any third-party service without explicit written authorization. Do not demonstrate exploit payloads or attack tools.
