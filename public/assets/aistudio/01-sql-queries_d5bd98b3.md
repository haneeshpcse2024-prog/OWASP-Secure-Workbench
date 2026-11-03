# Pair 1 — SQL injection prevention (Python DB-API)

**Risk:** Joining user text into SQL can change the query structure.

### Insecure (do not use)
```python
# BAD: user input is merged into SQL text.
query = "SELECT id, name FROM users WHERE email = '" + email + "'"
cursor.execute(query)
```

### Secure
```python
# GOOD: the driver sends the value as a parameter.
cursor.execute(
    "SELECT id, name FROM users WHERE email = ?",
    (email,)
)
```

Use the placeholder style required by your database driver (`?`, `%s`, or named parameters). Never assume every driver uses the same placeholder. Prefer an ORM when appropriate, while still understanding how it handles raw queries.

**Verify:** Read the driver's parameterized-query documentation and OWASP SQL Injection Prevention Cheat Sheet.
