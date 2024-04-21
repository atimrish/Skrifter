package schema

func UpFavorites() string {
	query :=
		`CREATE TABLE favorites
		(
			id                 SERIAL NOT NULL UNIQUE,
			user_id            INT,
			product_id         INT,
			favorite_status_id INT,
			create_date        TIMESTAMP,
			update_date        TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users (id),
			FOREIGN KEY (product_id) REFERENCES products (id),
			FOREIGN KEY (favorite_status_id) REFERENCES favorite_statuses (id)
		)
	`

	return query
}

func DropFavorites() string {
	query := `DROP TABLE favorites`
	return query
}
