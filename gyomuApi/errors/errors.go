package errors

import (
	"errors"
	"fmt"
	"log"
	"net/http"
)

// Error interface implementations for custom wrappers.
func (re *ResponseError) Error() string {
	if re.Err != nil {
		return re.Err.Error()
	}
	return re.Message
}

func (de *DebugError) Error() string {
	return fmt.Sprintf("%v %v: %v", de.Object, de.Origin, de.Err)
}

// Wrapping essentials functions from errors package
// to ease use throuhought code.

// Is checks if the received error matches the targeted error.
func Is(err error, target error) bool {
	return errors.Is(err, target)
}

// As finds the first error that matches the target.
func As(err error, target interface{}) bool {
	return errors.As(err, target)
}

// New returns an error based on a string.
func New(text string) error {
	return errors.New(text)
}

// Error wrapper to upstream relevant, human redable errors to the client.

// ResponseError contains data to be provided
// to an http.Error aimed at the front end user.
type ResponseError struct {
	StatusCode int
	Err        error
	Message    string
}

// NewResponseError returns a filled responseError object.
func NewResponseError(code int, msg string, err error) error {
	return &ResponseError{
		StatusCode: code,
		Err:        err,
		Message:    msg,
	}
}

func DoErrorResponse(w http.ResponseWriter, err error) {
	var re *ResponseError
	if errors.As(err, &re) {
		http.Error(w, re.Message, re.StatusCode)
	}
}

// Errors wrapper to provide contextualized, detailed errors to developers.

// DebugError provide context for backend developper.
type DebugError struct {
	Origin string
	Object string
	Err    error
}

// NewDebugError builds a debug error and logs it.
func NewDebugError(origin, object string, err error) {
	de := &DebugError{
		Origin: origin,
		Object: object,
		Err:    err,
	}

	log.Println(de)
}
