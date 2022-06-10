package router

import (
	"fmt"
	"net/http"
)

func getItems(w http.ResponseWriter, r *http.Request) error {
	w.Header().Set("content-type", "application/json")
	return nil
}

func getItem(w http.ResponseWriter, r *http.Request) error {
	_, err := fmt.Fprintf(w, "Item Endpoint Hit")
	if err != nil {
		return err
	}
	return nil
}

func createItem(w http.ResponseWriter, r *http.Request) error {
	_, err := fmt.Fprintf(w, "Item Creation Endpoint Hit")
	w.Header().Set("content-type", "application/json")
	if err != nil {
		return err
	}
	return nil
}

func updateItem(w http.ResponseWriter, r *http.Request) error {
	_, err := fmt.Fprintf(w, "Item Update Endpoint Hit")
	if err != nil {
		return err
	}
	return nil
}
func deleteItem(w http.ResponseWriter, r *http.Request) error {
	_, err := fmt.Fprintf(w, "Item Deletion Endpoint Hit")
	if err != nil {
		return err
	}
	return nil
}
