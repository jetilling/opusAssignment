SELECT first_name, last_name, email, id
FROM users
WHERE id = $1;