package repositories

import (
	"net/http"
	"time"

	"github.com/jinzhu/gorm"
	"github.com/riphidon/gyomu/api/errors"
)

// Project entity stored in DB.
type Project struct {
	gorm.Model
	Name        string
	Description string   `gorm:"type:varchar(1024)"`
	Tags        []string `gorm:"serializer:json"`
	Deadline    *time.Time
}

type IProjectService interface {
	IProjectDB
}
type projectService struct {
	IProjectDB
}

type projectAccessor struct {
	db *gorm.DB
}

type IProjectDB interface {
	// Read.
	ByID(id uint) (*Project, error)

	Create(project *Project) (uint, error)
	Update(project *Project) error
	Delete(id uint) error
}

func NewProjectService(db *gorm.DB) IProjectService {
	pa := &projectAccessor{db}
	pv := newProjectValidator(pa)
	return &projectService{
		IProjectDB: pv,
	}
}

func (pa *projectAccessor) ByID(id uint) (*Project, error) {
	var project Project
	err := first(pa.db.Where("id = ?", id), &project)
	if err != nil {
		errors.NewDebugError(repoKey, projectKey, err)
		return nil, errors.NewResponseError(http.StatusNotFound, msgProjectNotFound, err)
	}
	return &project, nil
}

func (pa *projectAccessor) Create(project *Project) (uint, error) {
	err := pa.db.Create(project).Error
	if err != nil {
		errors.NewDebugError(repoKey, projectKey, err)
		return 0, errors.NewResponseError(http.StatusNotFound, msgProjectNotFound, err)
	}
	return project.ID, nil
}
func (pa *projectAccessor) Update(project *Project) error {
	err := pa.db.Save(project).Error
	if err != nil {
		errors.NewDebugError(repoKey, projectKey, err)
		return errors.NewResponseError(http.StatusInternalServerError, msgUpdateProject, err)
	}
	return nil
}
func (pa *projectAccessor) Delete(id uint) error {
	project := Project{Model: gorm.Model{ID: id}}
	err := pa.db.Delete(&project).Error
	if err != nil {
		errors.NewDebugError(repoKey, projectKey, err)
		return errors.NewResponseError(http.StatusInternalServerError, msgDeleteProject, err)
	}
	return nil
}
