package routes

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"
)

type requestError struct {
	status int
	msg    string
}

func (rq *requestError) Error() string {
	return rq.msg
}

func parseJSONBody(w http.ResponseWriter, r *http.Request, dst interface{}) error {

	// Check if content type is "application/json".
	val := r.Header.Get("Content-Type")
	if val != "application/json" {
		msg := "Content-Type is not set to application/json"
		return &requestError{
			status: http.StatusUnsupportedMediaType,
			msg:    msg,
		}
	}

	// Enforce maximum read of 1Mb to avoid "http: request body too large" error.
	r.Body = http.MaxBytesReader(w, r.Body, 1048576)

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	err := dec.Decode(&dst)
	if err != nil {
		// Todo handle different error cases.
		var syntaxErr *json.SyntaxError
		var unmarshalErr *json.UnmarshalTypeError

		switch {
		case errors.As(err, &syntaxErr):
			msg := fmt.Sprintf("Badly-formed JSON (at position %d)", syntaxErr.Offset)
			return &requestError{
				status: http.StatusBadRequest,
				msg:    msg,
			}

		case errors.Is(err, io.ErrUnexpectedEOF):
			msg := fmt.Sprintf("Badly-formed JSON")
			return &requestError{
				status: http.StatusBadRequest,
				msg:    msg,
			}

		case errors.Is(err, io.EOF):
			msg := "Request body must not be empty"
			return &requestError{
				status: http.StatusBadRequest,
				msg:    msg,
			}

		case errors.As(err, &unmarshalErr):
			msg := fmt.Sprintf("Request body contains an invalid value for the %q field (at position %d)", unmarshalErr.Field, unmarshalErr.Offset)
			return &requestError{
				status: http.StatusBadRequest,
				msg:    msg,
			}

		case strings.HasPrefix(err.Error(), "json: unknown field "):
			fieldName := strings.TrimPrefix(err.Error(), "json: unknown field ")
			msg := fmt.Sprintf("Request body contains unknown field %s", fieldName)
			return &requestError{
				status: http.StatusBadRequest,
				msg:    msg,
			}

		case err.Error() == "http: request body too large":
			msg := "Request body must not be larger than 1MB"
			return &requestError{
				status: http.StatusRequestEntityTooLarge,
				msg:    msg,
			}
		}
		return err
	}
	return nil
}
