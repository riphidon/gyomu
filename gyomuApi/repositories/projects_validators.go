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

func runPrjectValidations(project *Project, fns ...projectValFunc) error {
	for _, fn := range fns {
		if err := fn(project); err != nil {
			return err
		}
	}
	return nil
}

func (pv *projectValidator) requireName(project *Project) error {
	if project.Name == "" {
		return ErrNameRequired
	}
	return nil
}

func (pv *projectValidator) nameFormat(project *Project) error {
	if project.Name == "" {
		return nil
	}
	if !pv.nameRegexp.MatchString(project.Name) {
		return ErrNameInvalid
	}
	return nil
}

func (pv *projectValidator) requireDescription(project *Project) error {
	if project.Description == "" {
		return ErrDescriptionRequired
	}
	return nil
}

func (pv *projectValidator) Create(project *Project) (uint, error) {
	if err := runPrjectValidations(project,
		pv.requireName,
		pv.nameFormat,
		pv.requireDescription); err != nil {
		return 0, err
	}
	return pv.IProjectDB.Create(project)
}
