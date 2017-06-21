UPDATE users
SET validation_token = $2
WHERE email = $1