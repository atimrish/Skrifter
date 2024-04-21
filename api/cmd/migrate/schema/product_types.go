package schema

func UpProductTypes() string {
	query :=
		`CREATE TABLE product_types
		(
			id   SERIAL       NOT NULL UNIQUE,
			name VARCHAR(255) NOT NULL
		);
	`

	return query
}

func DropProductTypes() string {
	query := `DROP TABLE product_types`
	return query
}
