package schema

func UpAgeRating() string {
	query :=
		`CREATE TABLE age_rating
		(
			id   SERIAL       NOT NULL UNIQUE,
			name VARCHAR(255) NOT NULL
		)
	`

	return query
}

func DropAgeRating() string {
	query := `DROP TABLE age_rating`
	return query
}
