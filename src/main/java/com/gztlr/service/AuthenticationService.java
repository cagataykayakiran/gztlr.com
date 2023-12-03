package com.gztlr.service;

import com.gztlr.dto.UserRegisterResponse;
import com.gztlr.dto.UserLoginRequest;
import com.gztlr.dto.UserLoginResponse;
import com.gztlr.dto.UserRegisterRequest;
import com.gztlr.entity.User;
import com.gztlr.enums.Role;
import com.gztlr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public UserRegisterResponse register(UserRegisterRequest userRequest) {
        User user = User.builder()
                .username(userRequest.getUsername())
                .name(userRequest.getFirstname())
                .lastname(userRequest.getLastname())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(Role.ADMIN)
                .build();
        if (userRepository.findByUsername(userRequest.getUsername()).isPresent()) {
            return UserRegisterResponse.builder().token("varrrrrrrrrrrrr").build();
        }
        var savedUser = userRepository.save(user);
        var token = jwtService.generateToken(userRequest.getUsername());
        return UserRegisterResponse.builder().token(token).build();
    }

    public UserLoginResponse login(UserLoginRequest userRequest) {
        authenticationManager.
                authenticate(
                        new UsernamePasswordAuthenticationToken(
                                userRequest.getUsername(),
                                userRequest.getPassword()
                        )
                );
        User user = userRepository.findByUsername(userRequest.getUsername()).
                orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String token = jwtService.generateToken(userRequest.getUsername());
        List<String> list = new ArrayList<>();
        List<String> tokenList = new ArrayList<>();
        list.add(user.getName());
        list.add(user.getLastname());
        list.add(user.getUsername());
        tokenList.add(token);
        return UserLoginResponse.builder().userInfo(user).token(tokenList).build();
    }


}
