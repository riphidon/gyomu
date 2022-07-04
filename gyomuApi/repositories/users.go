package repositories

import (
	"regexp"
	"strings"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/riphidon/gyomu/api/hash"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"

	"github.com/riphidon/gyomu/api/rand"
)

var (
	ErrNotFound          entityError = "entity: ressource not found"
	ErrIDInvalid         entityError = "entity: invalid ID"
	ErrPasswordIncorrect entityError = "entity: incorrect password"
	ErrPasswordTooShort  entityError = "entity: password must be at least 8 characters long"
	ErrPasswordRequired  entityError = "entity: password is required"
	ErrRemembertooShort  entityError = "entity: remember token must be at least 32 bytes"
	ErrRememberRequired  entityError = "entity: remember token is required"
	ErrEmailRequired     entityError = "entity: email adress is required"
	ErrEmailInvalid      entityError = "entity: email adress is not valid"
	ErrEmailTaken        entityError = "entity: email adress is already taken"
)

type entityError string

func (e entityError) Error() string {
	return string(e)
}

func (e entityError) Public() string {
	s := strings.Replace(string(e), "entity: ", "", 1)
	split := strings.Split(s, " ")
	split[0] = cases.Title(language.Und, cases.NoLower).String(split[0])
	return strings.Join(split, " ")
}

// User represents the user entity stored in database
// This is used for user accounts, storing both an email
// address and a password so users can log in and gain
// access to their content.
type User struct {
	gorm.Model
	Name         string
	Email        string `gorm:"not null;unique_index"`
	Nickname     string
	SuperUSer    bool
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

// userGorm represents database interaction layer
// and implements the UserDB interface fully.
type userGorm struct {
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

func NewUserService(db *gorm.DB, pepper, hmacKey string) IUserService {
	ug := &userGorm{db}
	hmac := hash.NewHMAC(hmacKey)
	uv := newUserValidator(ug, hmac, pepper)
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
		return nil, err
	}
	err = bcrypt.CompareHashAndPassword([]byte(founduser.PasswordHash), []byte(password+us.pepper))
	switch err {
	case nil:
		return founduser, nil
	case bcrypt.ErrMismatchedHashAndPassword:
		return nil, ErrPasswordIncorrect
	default:
		return nil, err
	}
}

// ByRemember looks up a user with the given remember token
// and returns that user. This method expects the remember
// token to already be hashed.
func (ug *userGorm) ByRemember(rememberHash string) (*User, error) {
	var user User
	err := first(ug.db.Where("remember_hash = ?", rememberHash), &user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// Create provided user and backfill data
// like the ID, CreatedAt, and UpdatedAt fields.
func (ug *userGorm) Create(user *User) error {
	return ug.db.Create(user).Error
}

// Update the provided user.
func (ug *userGorm) Update(user *User) error {
	return ug.db.Save(user).Error
}

// Delete the user with the provided ID
func (ug *userGorm) Delete(id uint) error {
	user := User{Model: gorm.Model{ID: id}}
	return ug.db.Delete(&user).Error
}

// ByID looks up a user with the provided ID.
// If user found, returns a nil error
// If user not found, returns ErrNotFound
// If there is another error, return error providing context.
func (ug *userGorm) ByID(id uint) (*User, error) {
	var user User
	db := ug.db.Where("id = ?", id)
	err := first(db, &user)
	if err != nil {
		return nil, err
	}
	return &user, nil

}

// ByEmail looks up a user with the given email address and
// returns that user.
// If user found, returns a nil error
// If user not found, returns ErrNotFound
// If there is another error, returns error providing context.
func (ug *userGorm) ByEmail(email string) (*User, error) {
	var user User
	db := ug.db.Where("email = ?", email)
	err := first(db, &user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// first will query using the provided gorm.DB and it will
// get the first item returned and place it into dst. If
// nothing is found in the query, it will return ErrNotFound.
func first(db *gorm.DB, dst interface{}) error {
	err := db.First(dst).Error
	if err == gorm.ErrRecordNotFound {
		return ErrNotFound
	}
	return err
}

/////////////////////// USER VALIDATOR /////////////////////////////////////////////
// userValidator is the validation layer that validates
// and normalizes data before passing it on to the next
// UserDB in the interface chain.
type userValidator struct {
	IUserDB
	hmac        hash.HMAC
	pepper      string
	emailRegexp *regexp.Regexp
}

type userValFn func(*User) error

func newUserValidator(udb IUserDB, hmac hash.HMAC, pepper string) *userValidator {
	return &userValidator{
		IUserDB:     udb,
		hmac:        hmac,
		pepper:      pepper,
		emailRegexp: regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,16}$`),
	}
}
func runUserValFns(user *User, fns ...userValFn) error {
	for _, fn := range fns {
		if err := fn(user); err != nil {
			return err
		}
	}
	return nil
}

//////////////////////////////////////////////////// ValFuncs
// bcryptPassword will hash a user's password with an
// app-wide pepper and bcrypt, which salts for us.
func (uv *userValidator) bcryptPassword(user *User) error {
	if user.Password == "" {
		return nil
	}
	pwBytes := []byte(user.Password + uv.pepper)
	hashedBytes, err := bcrypt.GenerateFromPassword(pwBytes, bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.PasswordHash = string(hashedBytes)
	user.Password = ""
	return nil
}

func (uv *userValidator) hmacRememmber(user *User) error {
	if user.Remember == "" {
		return nil
	}
	user.RememberHash = uv.hmac.Hash(user.Remember)
	return nil
}

func (uv *userValidator) setRememberIfUnset(user *User) error {
	if user.Remember != "" {
		return nil
	}
	token, err := rand.RememberToken()
	if err != nil {
		return err
	}
	user.Remember = token
	return nil
}

func (uv *userValidator) idGreaterThan(n uint) userValFn {
	return userValFn(func(user *User) error {
		if user.ID <= n {
			return ErrIDInvalid
		}
		return nil
	})
}

func (uv *userValidator) normalizeEmail(user *User) error {
	user.Email = strings.ToLower(user.Email)
	user.Email = strings.TrimSpace(user.Email)
	return nil
}

func (uv *userValidator) requireEmail(user *User) error {
	if user.Email == "" {
		return ErrEmailRequired
	}
	return nil
}

func (uv *userValidator) emailFormat(user *User) error {
	if user.Email == "" {
		return nil
	}
	if !uv.emailRegexp.MatchString(user.Email) {
		return ErrEmailInvalid
	}
	return nil
}

func (uv *userValidator) emailIsAvailable(user *User) error {
	existing, err := uv.ByEmail(user.Email)
	if err == ErrNotFound {
		return nil
	}
	if err != nil {
		return err
	}
	if user.ID != existing.ID {
		return ErrEmailTaken
	}
	return nil
}

func (uv *userValidator) passwordMinLength(user *User) error {
	if user.Password == "" {
		return nil
	}
	if len(user.Password) < 8 {
		return ErrPasswordTooShort
	}
	return nil
}
func (uv *userValidator) passwordRequired(user *User) error {
	if user.Password == "" {
		return ErrPasswordRequired
	}
	return nil
}

func (uv *userValidator) passwordHashRequired(user *User) error {
	if user.PasswordHash == "" {
		return ErrPasswordRequired
	}
	return nil
}

func (uv *userValidator) rememberMinBytes(user *User) error {
	if user.Remember == "" {
		return nil
	}
	n, err := rand.NBytes(user.Remember)
	if err != nil {
		return err
	}
	if n < 32 {
		return ErrRemembertooShort
	}
	return nil
}

func (uv *userValidator) rememberHashRequired(user *User) error {
	if user.RememberHash == "" {
		return ErrRememberRequired
	}
	return nil
}

////////////////////////////////////////////////////////////////////////////
// ByRemember will hash the remember token and then call
// ByRemember on the subsequent UserDB layer.
func (uv *userValidator) ByRemember(token string) (*User, error) {
	user := User{
		Remember: token,
	}
	if err := runUserValFns(&user, uv.hmacRememmber); err != nil {
		return nil, err
	}
	rememberHash := uv.hmac.Hash(token)
	return uv.IUserDB.ByRemember(rememberHash)
}

// ByEmail will normalize an email address before passing
// it on to the database layer to perform the query.
func (uv *userValidator) ByEmail(email string) (*User, error) {
	user := User{
		Email: email,
	}
	err := runUserValFns(&user, uv.normalizeEmail)
	if err != nil {
		return nil, err
	}
	return uv.IUserDB.ByEmail(user.Email)
}

// Create will create the provided user and backfill data
// like the ID, CreatedAt, and UpdatedAt fields.
func (uv *userValidator) Create(user *User) error {
	if err := runUserValFns(user,
		uv.passwordRequired,
		uv.passwordMinLength,
		uv.bcryptPassword,
		uv.passwordHashRequired,
		uv.setRememberIfUnset,
		uv.rememberMinBytes,
		uv.hmacRememmber,
		uv.rememberHashRequired,
		uv.normalizeEmail,
		uv.requireEmail,
		uv.emailFormat,
		uv.emailIsAvailable); err != nil {
		return err
	}

	return uv.IUserDB.Create(user)
}

// Update will hash a remember token if it is provided.
func (uv *userValidator) Update(user *User) error {
	if err := runUserValFns(user,
		uv.passwordMinLength,
		uv.bcryptPassword,
		uv.passwordHashRequired,
		uv.rememberMinBytes,
		uv.hmacRememmber,
		uv.rememberHashRequired,
		uv.normalizeEmail,
		uv.requireEmail,
		uv.emailFormat,
		uv.emailIsAvailable); err != nil {
		return err
	}
	return uv.IUserDB.Update(user)
}

// Delete will delete the user with the provided ID
func (uv *userValidator) Delete(id uint) error {
	var user User
	user.ID = id
	err := runUserValFns(&user, uv.idGreaterThan(0))
	if err != nil {
		return err
	}
	return uv.IUserDB.Delete(id)
}
