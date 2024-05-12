package models

import "gorm.io/gorm"

type DiscussionReply struct {
	gorm.Model
	DiscussionId int    `json:"discussion_id"`
	UserId       int    `json:"user_id"`
	Text         string `json:"text"`
}
