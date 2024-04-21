package schema

func UpProducts() string {
	query :=
		`CREATE TABLE products
		(
			id              SERIAL       NOT NULL UNIQUE,
			mongo_id        VARCHAR(255) NOT NULL,
			cover_photo     VARCHAR(255) NULL,
			description     TEXT         NOT NULL,
			year_of_issue   INT          NULL,
			age_rating_id   INT,
			product_type_id INT,
			FOREIGN KEY (age_rating_id) REFERENCES age_rating (id),
			FOREIGN KEY (product_type_id) REFERENCES product_types (id)
		)
	`

	return query
}

func DropProducts() string {
	query := `DROP TABLE products`
	return query
}
