package models

import "github.com/riphidon/gyomu/api/repositories"

// Below are models that satisfy outer facing contracts.

// SignupForm is the model for sign up / register a user.
type SignupForm struct {
	FirstName string
	LastName  string
	Nickname  string
	SuperUser bool
	Email     string `schema:"email"`
	Password  string `schema:"password"`
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

func SignUpToUser(form SignupForm) repositories.User {
	return repositories.User{
		FirstName: form.FirstName,
		LastName:  form.LastName,
		Email:     form.Email,
		Nickname:  form.Nickname,
		SuperUser: form.SuperUser,
		Password:  form.Password,
	}
}

func GyomuUserModel(user *repositories.User) *GyomuUser {
	return &GyomuUser{
		ID:          int(user.ID),
		Name:        user.LastName + " " + user.LastName,
		Nick:        user.Nickname,
		Email:       user.Email,
		IsSuperUser: user.SuperUser,
	}
}
