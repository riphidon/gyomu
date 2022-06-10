package server

import (
	"net/http"
	"time"
)

func New(h http.Handler, addr string) *http.Server {
	srv := &http.Server{
		Addr:         addr,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
		//TLSConfig:    tlsConfig,
		Handler: h,
	}
	return srv
}
