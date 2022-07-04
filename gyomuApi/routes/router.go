package routes

import (
	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	r := mux.NewRouter()
	mux.CORSMethodMiddleware(r)
	return r
}
