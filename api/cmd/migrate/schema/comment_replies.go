package schema

func UpCommentReplies() string {
	query :=
		`CREATE TABLE comment_replies
		(
			id          SERIAL NOT NULL UNIQUE,
			comment_id  INT,
			user_id     INT,
			text        TEXT   NOT NULL,
			create_date TIMESTAMP,
			update_date TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users (id),
			FOREIGN KEY (comment_id) REFERENCES comments (id)
		)
	`

	return query
}

func DropCommentReplies() string {
	query := `DROP TABLE comment_replies`
	return query
}
