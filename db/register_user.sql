INSERT INTO users (email, password, first_name, last_name, validation, login_dates)
VALUES ($1, $2, $3, $4, 'false', current_timestamp);