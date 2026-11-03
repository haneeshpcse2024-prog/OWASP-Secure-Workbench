# Capstone 4 — Secure Coding Guide for Beginners (OWASP Top 10)

A defensive learning project for **second-year CSE students learning web development**. It explains common web application risks, demonstrates safer coding patterns, and includes a checklist, quiz, presentation, infographic, prompt library, verification plan, and a lightweight static checker.

> **Scope and safety:** Educational and defensive only. The examples show safe patterns, not working exploits. Run practice code only in an application and environment you own, or in intentionally vulnerable training environments such as OWASP Juice Shop / DVWA.

## Repository contents

| Path | What it contains |
|---|---|
| `docs/research-report.md` | Research summary, source review, AI-tool research workflow |
| `docs/secure-coding-checklist.md` | Practical review checklist |
| `docs/1000-word-guide.md` | Beginner-friendly guide to the OWASP Top 10 |
| `docs/quiz.md` | 10-question quiz and answer key |
| `docs/prompt-library.md` | Reusable prompts and AI-use documentation |
| `docs/verification-report.md` | Hallucination, safety, and freshness verification log/template |
| `docs/before-after-analysis.md` | Before/after comparison and demo plan |
| `snippets/` | Five insecure-versus-secure defensive code pairs |
| `scripts/checklist_scan.py` | Simple heuristic checker for selected risky patterns |
| `.github/workflows/security-check.yml` | GitHub Actions workflow to run the checker |
| `assets/owasp-top10-cheat-sheet.pdf` | One-page OWASP Top 10 cheat sheet |
| `slides/capstone4-presentation.pptx` | Six-slide presentation |

## Quick start

Requirements: Python 3.9+ (the checker uses only the Python standard library).

```bash
python scripts/checklist_scan.py --path snippets
```

The checker is a **teaching aid, not a security scanner**. It reports a few suspicious patterns and cannot prove that code is secure. Review every finding manually.

## GitHub upload

1. Extract the ZIP.
2. Open the extracted `capstone4_secure_coding_guide` folder.
3. Create a new GitHub repository.
4. Upload the folder contents (including hidden `.github` directory), or use Git:

```bash
git init
git add .
git commit -m "Add OWASP secure coding beginner guide"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## Important research note

This project uses the **OWASP Top 10:2021** categories as its teaching baseline. Before formal submission, compare the categories with the latest OWASP release and record the edition/date required by your instructor. AI tools and their free-tier limits can change; document the tools you actually used rather than claiming unperformed research.

## Learning outcomes

- Explain common web risks in plain language.
- Choose defensive coding patterns.
- Find and cite authoritative security guidance.
- Critically verify AI-generated explanations and code.
- Use a small automated check without treating it as proof of security.
