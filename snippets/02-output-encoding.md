# Pair 2 — Safe text rendering (browser JavaScript)

**Risk:** Inserting untrusted text as HTML can create cross-site scripting (XSS).

### Insecure (do not use)
```javascript
// BAD: treats user-controlled text as HTML.
messageBox.innerHTML = commentFromUser;
```

### Secure
```javascript
// GOOD: renders the value as text, not markup.
messageBox.textContent = commentFromUser;
```

If rich HTML is a genuine requirement, use a maintained HTML sanitization library with a carefully defined policy. Contextual output encoding matters; `textContent` is appropriate for plain text nodes, not every output context.

**Verify:** MDN Web Security and OWASP Cross Site Scripting Prevention Cheat Sheet.
