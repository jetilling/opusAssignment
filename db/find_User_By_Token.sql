SELECT email, first_name, id
FROM users
WHERE validation_token = $1;