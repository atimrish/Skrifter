package schema

func UpProductGenres() string {
	query :=
		`CREATE TABLE product_genres
		(
			id         SERIAL NOT NULL UNIQUE,
			genre_id   INT,
			product_id INT,
			FOREIGN KEY (product_id) REFERENCES products (id),
			FOREIGN KEY (genre_id) REFERENCES genres (id)
		)
	`

	return query
}

func DropProductGenres() string {
	query := `DROP TABLE product_genres`
	return query
}
