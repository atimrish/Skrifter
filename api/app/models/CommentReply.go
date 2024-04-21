package models

import "gorm.io/gorm"

type CommentReply struct {
	gorm.Model
	Id        int
	CommentId int
	UserId    int
	Text      string
}
