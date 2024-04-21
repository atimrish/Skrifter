package schema

func UpUsers() string {
	query :=
		`CREATE TABLE users
		(
			id            SERIAL       NOT NULL UNIQUE,
			login         VARCHAR(255) NOT NULL UNIQUE,
			nickname      VARCHAR(255) NOT NULL UNIQUE,
			email         VARCHAR(255) NOT NULL UNIQUE,
			year_of_birth INT          NOT NULL,
			password      VARCHAR(255) NOT NULL,
			role_id       INT,
			photo         VARCHAR(255),
			FOREIGN KEY (role_id) REFERENCES roles (id)
		)
	`

	return query
}

func DropUsers() string {
	query := `DROP TABLE users`
	return query
}
