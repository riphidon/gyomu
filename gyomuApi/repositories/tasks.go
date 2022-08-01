package repositories

import "github.com/jinzhu/gorm"

// Task entity, can only belongs to one project.
type Task struct {
	gorm.Model
	ProjectID   uint
	Name        string
	Description string   `gorm:"type:varchar(512)"`
	Tags        []string `gorm:"serializer:json"`
}

type taskAccessor struct {
	db *gorm.DB
}
