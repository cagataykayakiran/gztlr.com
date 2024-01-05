package com.gztlr.exception;

import com.gztlr.exception.image.ImageException;
import com.gztlr.exception.user.UsernameException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GeneralException {

    @ExceptionHandler(ImageException.class)
    public ResponseEntity<?> imageException(ImageException imageException) {
        return new ResponseEntity<>(new ErrorResponse(406, imageException.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameException.class)
    public ResponseEntity<?> usernameAlreadyExist(UsernameException usernameException) {
        return new ResponseEntity<>(new ErrorResponse(403, usernameException.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
