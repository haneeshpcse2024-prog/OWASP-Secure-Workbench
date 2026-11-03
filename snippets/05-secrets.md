# Pair 5 — Secret management (Python)

**Risk:** Hard-coding credentials can expose them in source control, logs, and copied project files.

### Insecure (do not use)
```python
# BAD: secret is committed with the source code.
DATABASE_PASSWORD = "my-database-password"
```

### Secure
```python
# GOOD: read configuration from the runtime environment.
import os

DATABASE_PASSWORD = os.environ["DATABASE_PASSWORD"]
```

For production, use the hosting platform's secret manager where available, restrict access, rotate exposed credentials, and never print secrets. A `.env` file should remain untracked and must not be committed.

**Verify:** NIST SSDF and your hosting platform's official secret-management guide.
