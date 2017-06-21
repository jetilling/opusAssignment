UPDATE users
SET password = $1
WHERE validation_token = $2;