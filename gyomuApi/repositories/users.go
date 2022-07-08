package repositories

import (
	"net/http"

	"github.com/jinzhu/gorm"
	"github.com/riphidon/gyomu/api/errors"
	"github.com/riphidon/gyomu/api/hash"
	"golang.org/x/crypto/bcrypt"
)

// User represents the user entity stored in database
// This is used for user accounts, storing both an email
// address and a password so users can log in and gain
// access to their content.
type User struct {
	gorm.Model
	FirstName    string
	LastName     string
	Email        string `gorm:"not null;unique_index"`
	Nickname     string
	SuperUser    bool
	Password     string `gorm:"-"`
	PasswordHash string `gorm:"not null"`
	Remember     string `gorm:"-"`
	RememberHash string `gorm:"not null"`
}

// IUserService is a set of methods used to manipulate and
// work with the user entity
type IUserService interface {
	// Authenticate will verify the provided email address and
	// password are correct.
	Authenticate(email, password string) (*User, error)
	IUserDB
}

type userService struct {
	IUserDB
	pepper string
}

// userAccessor represents database interaction layer
// and implements the UserDB interface fully.
type userAccessor struct {
	db *gorm.DB
}

// IUserDB is an interface to  interact with the users database.
// If the user is found, returns nil error
// If the user is not found,returns ErrNotFound
// If there is another error, returns error providing context.
type IUserDB interface {
	// Single user querying
	ByID(id uint) (*User, error)
	ByEmail(email string) (*User, error)
	ByRemember(token string) (*User, error)

	// Users altering methods
	Create(user *User) error
	Update(user *User) error
	Delete(id uint) error
}

// NewUserService return an instance of IUserService
func NewUserService(db *gorm.DB, pepper, hmacKey string) IUserService {
	ua := &userAccessor{db}
	hmac := hash.NewHMAC(hmacKey)
	uv := newUserValidator(ua, hmac, pepper)
	return &userService{
		IUserDB: uv,
		pepper:  pepper,
	}
}

// Authenticate user with the
// provided email address and password.
// If email address provided is invalid, returns nil, ErrNotFound
// If password provided is invalid, returns nil, ErrPasswordIncorrect
// If email and password are both valid, returns user, nil
// Otherwise if another error is encountered returns nil, error
func (us *userService) Authenticate(email, password string) (*User, error) {
	founduser, err := us.ByEmail(email)
	if err != nil {
		errors.NewDebugError(repoKey, userKey, err)
		return nil, errors.NewResponseError(http.StatusNotFound, msgUserNotFound, err)
	}
	err = bcrypt.CompareHashAndPassword([]byte(founduser.PasswordHash), []byte(password+us.pepper))
	switch err {
	case nil:
		return founduser, nil
	case bcrypt.ErrMismatchedHashAndPassword:
		return nil, errors.NewResponseError(http.StatusOK, string(ErrPasswordIncorrect), err)
	default:
		errors.NewDebugError(repoKey, userKey, err)
		return nil, errors.NewResponseError(http.StatusNotFound, msgLoginUser, err)
	}
}

// ByRemember looks up a user with the given remember token
// and returns that user. This method expects the remember
// token to already be hashed.
func (ua *userAccessor) ByRemember(rememberHash string) (*User, error) {
	var user User
	err := first(ua.db.Where("remember_hash = ?", rememberHash), &user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// Create provided user and backfill data
// like the ID, CreatedAt, and UpdatedAt fields.
func (ua *userAccessor) Create(user *User) error {
	if user.Nickname == "" {
		user.Nickname = user.FirstName
	}
	err := ua.db.Create(user).Error
	if err != nil {
		errors.NewDebugError(repoKey, userKey, err)
		return errors.NewResponseError(http.StatusOK, msgCreateUser, err)
	}
	return nil
}

// Update the provided user.
func (ua *userAccessor) Update(user *User) error {
	err := ua.db.Save(user).Error
	if err != nil {
		errors.NewDebugError(repoKey, userKey, err)
		return errors.NewResponseError(http.StatusInternalServerError, msgUpdateUser, err)
	}
	return nil
}

// Delete the user with the provided ID
func (ua *userAccessor) Delete(id uint) error {
	user := User{Model: gorm.Model{ID: id}}
	err := ua.db.Delete(&user).Error
	if err != nil {
		errors.NewDebugError(repoKey, userKey, err)
		return errors.NewResponseError(http.StatusInternalServerError, msgDeleteUser, err)
	}
	return nil
}

// ByID looks up a user with the provided ID.
// If user found, returns a nil error
// If user not found, returns ErrNotFound
// If there is another error, return error providing context.
func (ua *userAccessor) ByID(id uint) (*User, error) {
	var user User
	db := ua.db.Where("id = ?", id)
	err := first(db, &user)
	if err != nil {
		errors.NewDebugError(repoKey, userKey, err)
		return nil, errors.NewResponseError(http.StatusNotFound, msgUserNotFound, err)
	}
	return &user, nil

}

// ByEmail looks up a user with the given email address and
// returns that user.
// If user found, returns a nil error
// If user not found, returns ErrNotFound
// If there is another error, returns error providing context.
func (ua *userAccessor) ByEmail(email string) (*User, error) {
	var user User
	db := ua.db.Where("email = ?", email)
	err := first(db, &user)
	if err != nil {
		errors.NewDebugError(repoKey, userKey, err)
		return nil, err
	}
	return &user, nil
}
