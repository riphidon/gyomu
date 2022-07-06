package errors

import (
	"errors"
	"fmt"
)

// Is checks if the received error matches the targeted error.
func Is(err error, target error) bool {
	return errors.Is(err, target)
}

// As finds the first error that matches the target.
func As(err error, target interface{}) bool {
	return errors.As(err, target)
}

// Errors for client

func (re *ResponseError) Error() string {
	return re.Err
}

// ResponseError contains data to be provided
// to an http.Error aimed at the front end user.
type ResponseError struct {
	StatusCode int
	Err        string
}

// NewResponseError returns an empty ResponseError struct.
func NewResponseError(code int, msg string) error {
	return &ResponseError{
		StatusCode: code,
		Err:        msg}
}

// Errors for back end

// DebugError provide context for backend developper.
type DebugError struct {
	Origin string
	Item   string
	Err    error
}

func (de *DebugError) Error() string {
	return fmt.Sprintf("%v %v: %v", de.Item, de.Origin, de.Err)
}

// NewDebugError returns an empty DebugError struct.
func NewDebugError() error {
	return &DebugError{}
}
