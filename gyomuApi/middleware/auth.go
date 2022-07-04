package middleware

import (
	"errors"
	"net/http"

	"github.com/riphidon/gyomu/api/context"
	"github.com/riphidon/gyomu/api/repositories"
)

type User struct {
	repositories.IUserService
}

func (mw *User) AppHandler(next http.Handler) http.HandlerFunc {
	return mw.AuthFn(next.ServeHTTP)
}

func (mw *User) AuthFn(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		cookie, err := r.Cookie("remember_token")
		if err != nil {
			next(w, r)
			return
		}
		user, err := mw.IUserService.ByRemember(cookie.Value)
		if err != nil {
			next(w, r)
			return
		}
		// Get the context from our request
		ctx := r.Context()
		// Create a new context from the existing one that
		// has our user stored in it with the private user key
		ctx = context.WithUser(ctx, user)
		// Create a new request from existing one with our
		// context attached to it and assign it back to r.
		r = r.WithContext(ctx)
		// call next(w, r) with our updated context.
		next(w, r)

	})
}

type RequireUser struct {
	User
}

// AuthFn will return an http.HandlerFunc that will
// check to see if a user is logged in and then
// call next(w, r) if they are.
func (mw *RequireUser) AuthFn(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user := context.User(r.Context())
		if user == nil {
			errors.New("You are not authorised")
		}
		next(w, r)
	})

}

func (mw *RequireUser) AppHandler(next http.Handler) http.HandlerFunc {
	return mw.AuthFn(next.ServeHTTP)
}
