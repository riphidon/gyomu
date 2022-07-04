package main

import (
	"encoding/json"
	"fmt"
	"os"
)

// Stored strings.
const (
	PSQL   = "postgres"
	SQL    = "sql"
	PROD   = "production"
	DEV    = "development"
	CONFIG = ".config"
)

type DBConfig struct {
	Host     string `json:"host"`
	Port     int    `json:"port"`
	User     string `json:"user"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

func (c DBConfig) Dialect(t string) string {
	return t
}

func (c DBConfig) ConnectionInfo() string {
	// Handle no password case.
	if c.Password == "" {
		return fmt.Sprintf("host=%s port=%d user=%s dbname=%s sslmode=disable",
			c.Host, c.Port, c.User, c.Name)
	}

	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		c.Host, c.Port, c.User, c.Password, c.Name)
}

func DefaultDBConfig() DBConfig {
	return DBConfig{
		Host:     "localhost",
		Port:     5432,
		User:     "user",
		Password: "",
		Name:     "gyomu_dev",
	}
}

type Config struct {
	Port     int    `json:"port"`
	Env      string `json:"env"`
	Pepper   string `json:"pepper"`
	HMACKey  string `json:"hmac_key"`
	DataBase DBConfig
}

func (c Config) IsProd() bool {
	return c.Env == PROD
}

func DefaultConfig() Config {
	return Config{
		Port:    3000,
		Env:     DEV,
		Pepper:  "pepper-mix",
		HMACKey: "secret-hmac-key",
	}
}

// LoadConfig loads configuration from .config file.
func LoadConfig(configReq bool) Config {
	// Open file.
	f, err := os.Open(CONFIG)
	if err != nil {
		// If error, fallback to default config, notify user.
		if configReq {
			panic(err)
		}
		fmt.Println("USing default config...")
		return DefaultConfig()
	}

	var c Config
	dec := json.NewDecoder(f)
	// Object mapped into struct using json tags.
	err = dec.Decode(&c)
	if err != nil {
		panic(err)
	}
	fmt.Println("Configuration successfully loaded.")
	return c
}
