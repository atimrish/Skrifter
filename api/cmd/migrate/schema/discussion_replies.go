package schema

func UpDiscussionReplies() string {
	query :=
		`CREATE TABLE discussion_replies
		(
			id            SERIAL NOT NULL UNIQUE,
			discussion_id INT,
			user_id       INT,
			text          TEXT   NOT NULL,
			create_date   TIMESTAMP,
			update_date   TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users (id),
			FOREIGN KEY (discussion_id) REFERENCES discussions (id)
		)
	`

	return query
}

func DropDiscussionReplies() string {
	query := `DROP TABLE discussion_replies`
	return query
}
