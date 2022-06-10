package router

import (
	"github.com/gorilla/mux"
)

func InitRouter() *mux.Router {
	mux := mux.NewRouter()
	return mux
}
