package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/riphidon/gyomu/api/middleware"
	"github.com/riphidon/gyomu/api/repositories"
	"github.com/riphidon/gyomu/api/routes"
	"github.com/riphidon/gyomu/api/server"
	"github.com/rs/cors"
)

func main() {
	boolPtr := flag.Bool("prod", false, "Provide this flag in production."+
		"This ensures that a .config file is provided before the application starts.")
	flag.Parse()
	// boolPtr is a pointer, make sure to pass its value in LoadConfig().

	cfg := LoadConfig(*boolPtr)
	dbCfg := cfg.DataBase
	services, err := repositories.NewServices(
		repositories.OpenDB(dbCfg.Dialect(PSQL), dbCfg.ConnectionInfo()),
		// Only log when not in prod.
		repositories.EnableLogMode(!cfg.IsProd()),
		repositories.SetUserService(cfg.Pepper, cfg.HMACKey),
	)
	if err != nil {
		panic(err)
	}

	defer services.Close()

	// services.DestructiveReset()
	services.AutoMigrate()

	// b, err := rand.Bytes(32)
	// if err != nil {
	// 	panic(err)
	// }
	// csrfMw := csrf.Protect(b, csrf.Secure(cfg.IsProd()))

	r := routes.NewRouter()

	// Set up cors policies to accept request from angular web app.
	handler := cors.Default().Handler(r)

	routes.SetupUser(r, services)

	userMw := middleware.User{
		IUserService: services.User,
	}

	// Create a new server and run it.
	srv := server.New(userMw.AppHandler(handler), fmt.Sprintf(":%d", cfg.Port))
	err = srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
