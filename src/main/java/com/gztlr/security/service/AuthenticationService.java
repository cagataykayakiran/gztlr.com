package com.gztlr.security.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gztlr.dto.TokenDto;
import com.gztlr.dto.UserDto;
import com.gztlr.dto.user.login.AuthResponse;
import com.gztlr.dto.user.request.UserLoginRequest;
import com.gztlr.dto.user.request.UserRegisterRequest;
import com.gztlr.entity.User;
import com.gztlr.exception.user.UsernameException;
import com.gztlr.repository.UserRepository;
import com.gztlr.utils.DtoUtils;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;

    public AuthResponse register(UserRegisterRequest userRequest) throws Exception {
        if (userRepository.findByUsername(userRequest.getUsername()).isPresent()) {
            throw new UsernameException("Username already exits");
        }
        if (userRequest.getUsername().isEmpty()) {
            throw new UsernameException("Username not blank");
        }
        userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        User user = (User) new DtoUtils().convertToEntity(new User(), userRequest);
        var savedUser = userRepository.save(user);
        var accessToken = jwtService.generateToken(userRequest.getUsername());
        var refresh_token = jwtService.generateRefreshToken(userRequest.getUsername());
        var userDto = new DtoUtils().convertToDto(savedUser, new UserDto());
        var tokenDto = TokenDto.builder().access_token(accessToken).refresh_token(refresh_token).expires_in(jwtService.getJwtExpiration()).build();
        return AuthResponse.builder().token(tokenDto).user(userDto).build();
    }
    public AuthResponse login(UserLoginRequest userRequest) {
        authenticationManager.
                authenticate(
                        new UsernamePasswordAuthenticationToken(
                                userRequest.getUsername(),
                                userRequest.getPassword()
                        )
                );
        User user = userRepository.findByUsername(userRequest.getUsername()).
                orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String accessToken = jwtService.generateToken(userRequest.getUsername());
        String refresh_token = jwtService.generateRefreshToken(userRequest.getUsername());
        var userDto = new DtoUtils().convertToDto(user, new UserDto());
        var tokenDto = TokenDto.builder().access_token(accessToken).refresh_token(refresh_token).expires_in(jwtService.getJwtExpiration()).build();
        return AuthResponse.builder().token(tokenDto).user(userDto).build();
    }
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException, java.io.IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String username;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);
        if (username != null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtService.validateToken(refreshToken, userDetails)) {
                String accessToken = jwtService.generateToken(username);
                var authResponse = TokenDto.builder()
                        .access_token(accessToken)
                        .refresh_token(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
