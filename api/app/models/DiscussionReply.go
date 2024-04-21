package models

import "gorm.io/gorm"

type DiscussionReply struct {
	gorm.Model
	Id           int
	DiscussionId int
	UserId       int
	Text         string
}
