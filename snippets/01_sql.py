
# BAD: user input is merged into SQL text.
query = "SELECT id, name FROM users WHERE email = '" + email + "'"
cursor.execute(query)
