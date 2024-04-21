package schema

func UpGenres() string {
	query :=
		`CREATE TABLE genres
		(
			id   SERIAL       NOT NULL UNIQUE,
			name VARCHAR(255) NOT NULL
		)
	`

	return query
}

func DropGenres() string {
	query := `DROP TABLE genres`
	return query
}
