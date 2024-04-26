package models

import "gorm.io/gorm"

type CommentReply struct {
	gorm.Model
	CommentId int
	UserId    int
	Text      string
}
