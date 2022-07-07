package routes

import (
	"encoding/json"

	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/riphidon/gyomu/api/errors"
)

// Error constants for JSON parsing errors.
var (
	ErrInvalidJSON jsonParseError = errors.New("invalid JSON object")
	ErrWrongHeader jsonParseError = errors.New("wrong Content-Type")
	ErrEmptyBody   jsonParseError = errors.New("empty request body")
	ErrBodySize    jsonParseError = errors.New("body size too large")
)

type jsonParseError error

func parseJSONBody(w http.ResponseWriter, r *http.Request, dst interface{}) error {

	// Check if content type is "application/json".
	val := r.Header.Get("Content-Type")
	if val != "application/json" {
		msg := "Content-Type is not set to application/json"
		return errors.NewResponseError(http.StatusUnsupportedMediaType, msg, ErrWrongHeader)
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
			return errors.NewResponseError(http.StatusBadRequest, msg, ErrInvalidJSON)

		case errors.Is(err, io.ErrUnexpectedEOF):
			msg := fmt.Sprintf("Badly-formed JSON")
			return errors.NewResponseError(http.StatusBadRequest, msg, ErrInvalidJSON)

		case errors.Is(err, io.EOF):
			msg := "Request body must not be empty"
			return errors.NewResponseError(http.StatusBadRequest, msg, ErrEmptyBody)

		case errors.As(err, &unmarshalErr):
			msg := fmt.Sprintf("Request body contains an invalid value for the %q field (at position %d)", unmarshalErr.Field, unmarshalErr.Offset)
			return errors.NewResponseError(http.StatusBadRequest, msg, ErrInvalidJSON)

		case strings.HasPrefix(err.Error(), "json: unknown field "):
			fieldName := strings.TrimPrefix(err.Error(), "json: unknown field ")
			msg := fmt.Sprintf("Request body contains unknown field %s", fieldName)
			return errors.NewResponseError(http.StatusBadRequest, msg, ErrInvalidJSON)

		case err.Error() == "http: request body too large":
			msg := "Request body must not be larger than 1MB"
			return errors.NewResponseError(http.StatusRequestEntityTooLarge, msg, ErrBodySize)
		}
	}
	return nil
}
