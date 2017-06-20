UPDATE users
SET validated = 'true'
WHERE validation_token = $1;