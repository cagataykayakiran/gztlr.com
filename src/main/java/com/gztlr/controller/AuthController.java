package com.gztlr.controller;

import com.gztlr.dto.UserRegisterResponse;
import com.gztlr.dto.UserLoginRequest;
import com.gztlr.dto.UserRegisterRequest;
import com.gztlr.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<UserRegisterResponse> register(@RequestBody UserRegisterRequest userRegisterRequest) {
        return ResponseEntity.ok(authenticationService.register(userRegisterRequest));
    }

   @PostMapping("/login")
    public ResponseEntity<?> auth(@RequestBody UserLoginRequest userLoginRequest) {
        return ResponseEntity.ok(authenticationService.login(userLoginRequest));
    }
}