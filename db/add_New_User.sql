INSERT INTO users (email, first_name, last_name, validated, validation_token)
VALUES ($1, $2, $3, 'false', $4);