# Pair 3 — Server-side input validation (Python)

**Risk:** Trusting browser-only validation allows unexpected values to reach application logic.

### Insecure (do not use)
```python
# BAD: assumes the browser has already validated this value.
age = int(request.form["age"])
create_profile(age=age)
```

### Secure
```python
# GOOD: validate type and business range on the server.
raw_age = request.form.get("age", "")
try:
    age = int(raw_age)
except (TypeError, ValueError):
    raise ValueError("Age must be a whole number")

if not 13 <= age <= 120:
    raise ValueError("Age is outside the accepted range")

create_profile(age=age)
```

In a real web app, return a suitable client error instead of exposing an unhandled exception. Apply framework-specific validation and limits too.

**Verify:** OWASP Input Validation Cheat Sheet.
