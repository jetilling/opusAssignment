UPDATE users SET login_dates = array_append(login_dates, current_timestamp) WHERE id = $1
