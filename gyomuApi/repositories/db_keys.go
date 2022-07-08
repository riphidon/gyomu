package repositories

// Keys to reference entities in repository package.
const (
	repoKey = "repository"
	userKey = "user"
)

// Keys to build contextualized helpers.
const (
	msgStem         = "A problem occured while trying to"
	msgWrapUp       = " Please try again later."
	msgCreateUser   = msgStem + " create user." + msgWrapUp
	msgUpdateUser   = msgStem + " update user." + msgWrapUp
	msgDeleteUser   = msgStem + " delete user." + msgWrapUp
	msgLoginUser    = msgStem + " login." + msgWrapUp
	msgUserNotFound = "User does not exists"
)

// Errors in human readable forms.
var (
	ErrNotFound          entityError = "ressource not found"
	ErrIDInvalid         entityError = "invalid ID"
	ErrPasswordIncorrect entityError = "incorrect password"
	ErrPasswordTooShort  entityError = "password must be at least 8 characters long"
	ErrPasswordRequired  entityError = "password is required"
	ErrRemembertooShort  entityError = "remember token must be at least 32 bytes"
	ErrRememberRequired  entityError = "remember token is required"
	ErrEmailRequired     entityError = "email adress is required"
	ErrEmailInvalid      entityError = "email adress is not valid"
	ErrEmailTaken        entityError = "email adress is already taken"
)

type entityError string

// Error implementation for entityError type
// to be used as error type.
func (e entityError) Error() string {
	return string(e)
}
