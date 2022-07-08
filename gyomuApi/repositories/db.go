package repositories

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/lib/pq"
	"github.com/riphidon/gyomu/api/errors"
)

// DBServices regroup all services available in repository.
type DBServices struct {
	User IUserService
	db   *gorm.DB
}

// DBServicesConfig type function to interact with DBServices
type DBServicesConfig func(*DBServices) error

// NewServices accepts a list of config functions to run.
// Each functions accept a pointer to the current services object
// as its only argument and will edit that object inline and return an error
// if there is one. Once all configs are run returns the DBServices object.
func NewServices(cfgs ...DBServicesConfig) (*DBServices, error) {
	var s DBServices
	for _, cfg := range cfgs {
		// Run the function passing in a pointer to our services
		// and catch any errors.
		if err := cfg(&s); err != nil {
			return nil, err
		}
	}

	return &s, nil
}

// OpenDB initialize a new db connection.
func OpenDB(dialect, ConnectionInfo string) DBServicesConfig {
	return func(s *DBServices) error {
		db, err := gorm.Open(dialect, ConnectionInfo)
		if err != nil {
			return err
		}
		s.db = db
		return nil
	}
}

// EnableLogMode set log mode, `true` for detailed logs, `false` for no log.
//  Default, will only print error logs.
func EnableLogMode(mode bool) DBServicesConfig {
	return func(s *DBServices) error {
		s.db.LogMode(mode)
		return nil
	}
}

// SetUserService set UserService instance in DBServices.
func SetUserService(pepper, hmacKey string) DBServicesConfig {
	return func(s *DBServices) error {
		s.User = NewUserService(s.db, pepper, hmacKey)
		return nil
	}
}

// Close shut the database connection.
func (s *DBServices) Close() error {
	return s.db.Close()
}

// first do query using  provided gorm.DB,
// get the first item returned and place it into dst. If
// nothing found, return ErrNotFound.
func first(db *gorm.DB, dst interface{}) error {
	err := db.First(dst).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return ErrNotFound
	}
	return err
}

// AutoMigrate will attempt to automatically migrate all tables.
func (s *DBServices) AutoMigrate() error {
	return s.db.AutoMigrate(&User{}).Error
}

// DestructiveReset drops all the tables and rebuilds them.
func (s *DBServices) DestructiveReset() error {
	err := s.db.DropTableIfExists(&User{}).Error
	if err != nil {
		return err
	}
	return s.AutoMigrate()
}
