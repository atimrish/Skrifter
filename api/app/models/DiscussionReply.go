package models

import "gorm.io/gorm"

type DiscussionReply struct {
	gorm.Model
	DiscussionId int
	UserId       int
	Text         string
}
