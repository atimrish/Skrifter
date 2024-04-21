package schema

func UpRoles() string {
	query :=
		`CREATE TABLE roles
		(
			id   SERIAL NOT NULL UNIQUE,
			name VARCHAR(255)
		)
	`

	return query
}

func DropRoles() string {
	query := `DROP TABLE roles`
	return query
}
