package schema

func UpFavoriteStatuses() string {
	query :=
		`CREATE TABLE favorite_statuses
		(
			id   SERIAL       NOT NULL UNIQUE,
			name VARCHAR(255) NOT NULL
		)
	`

	return query
}

func DropFavoriteStatuses() string {
	query := `DROP TABLE favorite_statuses`
	return query
}
