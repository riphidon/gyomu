package main

import (
	"log"

	"github.com/gorilla/mux"
	"github.com/riphidon/gyomu/api/router"
	"github.com/riphidon/gyomu/api/server"
	"github.com/rs/cors"
)

func main() {
	mux := mux.NewRouter()

	// Set up cors policies to accept request from angular web app.
	handler := cors.Default().Handler(mux)

	router.SetupRoutes(mux)

	// Create a new server and run it.
	srv := server.New(handler, ":3000")
	err := srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
