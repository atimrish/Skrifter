package schema

func UpAuthors() string {
	query :=
		`CREATE TABLE authors
		(
			id            SERIAL       NOT NULL UNIQUE,
			surname       VARCHAR(255) NULL,
			name          VARCHAR(255) NULL,
			patronymic    VARCHAR(255) NULL,
			nickname      VARCHAR(255) NULL,
			year_of_birth INT          NOT NULL,
			photo         VARCHAR(255)
		)
	`

	return query
}

func DropAuthors() string {
	query := `DROP TABLE authors`
	return query
}
