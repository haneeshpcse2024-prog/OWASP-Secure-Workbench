#!/usr/bin/env python3
"""Tiny teaching aid: heuristic checks for a few risky code patterns.

This is NOT a security scanner. It scans text files and may miss issues or
report false positives. Never use its output as proof that code is secure.
"""
import argparse
from pathlib import Path
import re
import sys

RULES = [
    ("SQL string concatenation", re.compile(r"""execute\s*\(\s*["'][^"']*\s*\+\s*[A-Za-z_]""", re.I),
     "Review query construction; use driver-supported parameterized queries."),
    ("Untrusted HTML insertion", re.compile(r"""\.innerHTML\s*=""", re.I),
     "For plain text, use textContent; for rich HTML, use a vetted sanitizer."),
    ("Possible hard-coded secret", re.compile(r"""(?i)(password|secret|api[_-]?key)\s*=\s*["'][^"']{4,}["']"""),
     "Move secrets to environment configuration or a secret manager."),
    ("Possible eval usage", re.compile(r"""\beval\s*\(""", re.I),
     "Avoid evaluating dynamic strings; use explicit parsing and safe APIs."),
]

EXTENSIONS = {".py", ".js", ".ts", ".jsx", ".tsx", ".java", ".php", ".html"}

def scan_file(path):
    findings = []
    try:
        lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
    except OSError as exc:
        print(f"Could not read {path}: {exc}", file=sys.stderr)
        return findings
    for number, line in enumerate(lines, 1):
        for title, pattern, advice in RULES:
            if pattern.search(line):
                findings.append((path, number, title, advice))
    return findings

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--path", default=".", help="File or directory to scan")
    args = parser.parse_args()
    target = Path(args.path)
    if not target.exists():
        parser.error(f"path does not exist: {target}")
    files = [target] if target.is_file() else [
        p for p in target.rglob("*") if p.is_file() and p.suffix.lower() in EXTENSIONS
    ]
    findings = []
    for file in files:
        findings.extend(scan_file(file))
    if findings:
        print("Potential issues (manual review required):")
        for path, line, title, advice in findings:
            print(f"- {path}:{line}: {title}\n  Advice: {advice}")
    else:
        print("No configured patterns detected. This does NOT mean the code is secure.")
    print("\nLimitations: pattern-based only; false positives and false negatives are expected.")
    return 1 if findings else 0

if __name__ == "__main__":
    raise SystemExit(main())
