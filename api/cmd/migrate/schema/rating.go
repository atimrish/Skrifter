package schema

func UpRating() string {
	query :=
		`CREATE TABLE rating
		(
			id         SERIAL NOT NULL UNIQUE,
			user_id    INT,
			product_id INT,
			value      INT    NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users (id),
			FOREIGN KEY (product_id) REFERENCES products (id)
		);
	`

	return query
}

func DropRating() string {
	query := `DROP TABLE rating`
	return query
}
