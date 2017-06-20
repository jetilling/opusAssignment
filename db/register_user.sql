INSERT INTO users (email, password, first_name, last_name, validated, validation_token)
VALUES ($1, $2, $3, $4, 'false', $5);