package routes

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/riphidon/gyomu/api/context"
	"github.com/riphidon/gyomu/api/middleware"
	"github.com/riphidon/gyomu/api/rand"
	"github.com/riphidon/gyomu/api/repositories"
)

// Users allows user service access bey being passed as signature.
type Users struct {
	us repositories.IUserService
}

// Below are models that satisfy outer facing contracts.

// SignupForm is the model for sign up / register a user.
type SignupForm struct {
	Name     string `schema:"name"`
	Email    string `schema:"email"`
	Password string `schema:"password"`
}

// LoginForm is the model that contains credentials to ligin user.
type LoginForm struct {
	Email    string `schema:"email"`
	Password string `schema:"password"`
}

// GyomuUser is the model for the classic user.
type GyomuUser struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Nick        string `json:"nick"`
	Email       string `json:"email"`
	IsSuperUser bool   `json:"isSuperUser"`
}

// NewUsers is used to create a new IUserService access.
// Should only be used during initial setup.
func NewUsers(us repositories.IUserService) *Users {
	return &Users{
		us: us,
	}
}

// Create is used to process the signup form when a user
// submits it. This is used to create a new user account.
//
// POST /signup
func (u *Users) Create(w http.ResponseWriter, r *http.Request) {

	var form SignupForm

	if err := parseJSONBody(r, &form); err != nil {
		http.Error(w, "Couldn't parse form", http.StatusBadRequest)
		return
	}

	// user := repositories.User{
	// 	Name:     form.Name,
	// 	Email:    form.Email,
	// 	Password: form.Password,
	// }

	// if err := u.us.Create(&user); err != nil {
	// 	http.Error(w, err.Error(), http.StatusBadRequest)
	// 	return
	// }

	// err := u.signIn(w, &user)
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusBadRequest)
	// 	return
	// }
}

// Login is used to verify the provided email address and
// password and then log the user in if they are correct.
//
// POST /login
func (u *Users) Login(w http.ResponseWriter, r *http.Request) {

	form := LoginForm{}
	if err := parseJSONBody(r, &form); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	user, err := u.us.Authenticate(form.Email, form.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	err = u.signIn(w, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

// Logout is used to delete a users session cookie (remember_token)
// and then will update the user resource with a new remmeber
// token.
//
// POST /logout
func (u *Users) Logout(w http.ResponseWriter, r *http.Request) {
	// First expire user's cookie
	cookie := http.Cookie{
		Name:     "remember_token",
		Value:    "",
		Expires:  time.Now(),
		HttpOnly: true,
	}
	http.SetCookie(w, &cookie)
	// Then update user with a new remember token
	user := context.User(r.Context())
	token, _ := rand.RememberToken()
	user.Remember = token
	u.us.Update(user)
}

// signIn is used to sign the given user in via cookies
func (u *Users) signIn(w http.ResponseWriter, user *repositories.User) error {
	if user.Remember == "" {
		token, err := rand.RememberToken()
		if err != nil {
			return err
		}
		user.Remember = token
		err = u.us.Update(user)
		if err != nil {
			return err
		}
	}

	cookie := http.Cookie{
		Name:     "remember_token",
		Value:    user.Remember,
		HttpOnly: true,
	}

	http.SetCookie(w, &cookie)

	gu := &GyomuUser{
		ID:          int(user.ID),
		Name:        user.Name,
		Nick:        user.Nickname,
		Email:       user.Email,
		IsSuperUser: user.SuperUSer,
	}

	json.NewEncoder(w).Encode(gu)
	return nil
}

// SetupUser registers all routes for user related endpoints.
func SetupUser(r *mux.Router, s *repositories.DBServices) {
	userCheckMw := middleware.UserChecker{}
	userCtrl := NewUsers(s.User)
	r.HandleFunc("/signup", userCtrl.Create).Methods("POST")
	r.HandleFunc("/login", userCtrl.Login).Methods("POST")
	r.Handle("/logout", userCheckMw.AuthFn(userCtrl.Logout)).Methods("POST")
}
