package schema

func UpProductAuthors() string {
	query :=
		`CREATE TABLE product_authors
		(
			id         SERIAL NOT NULL UNIQUE,
			author_id  INT,
			product_id INT,
			FOREIGN KEY (author_id) REFERENCES authors (id),
			FOREIGN KEY (product_id) REFERENCES products (id)
		)
	`

	return query
}

func DropProductAuthors() string {
	query := `DROP TABLE product_authors`
	return query
}
