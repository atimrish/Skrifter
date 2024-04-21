package schema

func UpComments() string {
	query :=
		`CREATE TABLE comments
		(
			id          SERIAL NOT NULL UNIQUE,
			product_id  INT,
			user_id     INT,
			text        TEXT   NOT NULL,
			create_date TIMESTAMP,
			update_date TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users (id),
			FOREIGN KEY (product_id) REFERENCES products (id)
		)
	`

	return query
}

func DropComments() string {
	query := `DROP TABLE comments`
	return query
}
