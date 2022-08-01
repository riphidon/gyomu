package repositories

import "regexp"

type projectValidator struct {
	IProjectDB
	nameRegexp *regexp.Regexp
}

type projectValFunc func(*Project) error

func newProjectValidator(pdb IProjectDB) *projectValidator {
	return &projectValidator{
		IProjectDB: pdb,
		nameRegexp: regexp.MustCompile(`^[a-zA-Z0-9_.-]*$`),
	}
}
