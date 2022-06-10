package router

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var id string

type AppHandler func(w http.ResponseWriter, r *http.Request) error
type AuthHandler func(w http.ResponseWriter, r *http.Request) error

func (fn AppHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	log.Printf("logged %v requested %v", r.RemoteAddr, r.URL)
	err := fn(w, r)
	if err != nil {
		http.Error(w, fmt.Sprintf("error : %+v\n", err), http.StatusInternalServerError)
	}
}

func (fn AuthHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	log.Printf("logged %v requested %v", r.RemoteAddr, r.URL)
}

//midleware for routes management
func SetupRoutes(mux *mux.Router) {
	mux.Handle("/", AppHandler(getItems)).Methods("GET")
	mux.Handle("/item/{id}", AppHandler(getItem)).Methods("GET")
	mux.Handle("/create", AppHandler(createItem)).Methods("POST")
	mux.Handle("/update/{id}", AppHandler(updateItem)).Methods("PUT")
	mux.Handle("/delete/{id}", AppHandler(deleteItem)).Methods("DELETE")
}
