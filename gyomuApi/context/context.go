package context

import (
	"context"

	"github.com/riphidon/gyomu/api/repositories"
)

type privateKey = string

const (
	// Keys are not to be exported so code outside of the package
	// can't to overwrite context values.
	userKey privateKey = "user"
)

func WithUser(ctx context.Context, user *repositories.User) context.Context {
	return context.WithValue(ctx, "user", user)
}

func User(ctx context.Context) *repositories.User {
	if temp := ctx.Value(userKey); temp != nil {
		if user, ok := temp.(*repositories.User); ok {
			return user
		}
	}
	return nil
}
