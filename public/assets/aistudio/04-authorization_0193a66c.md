# Pair 4 — Object-level authorization (Python-style pseudocode)

**Risk:** Looking up a record by ID without checking whether the current user may access it.

### Insecure (do not use)
```python
# BAD: any signed-in user who knows an ID may fetch the record.
document = Document.get(id=document_id)
return document
```

### Secure
```python
# GOOD: scope the lookup to the authenticated owner.
document = Document.get(
    id=document_id,
    owner_id=current_user.id
)
if document is None:
    return not_found()
return document
```

The exact syntax depends on the framework and data layer. For shared/team resources, check membership and role permissions as well as ownership. Enforce the rule on every server request.

**Verify:** OWASP Authorization Cheat Sheet.
