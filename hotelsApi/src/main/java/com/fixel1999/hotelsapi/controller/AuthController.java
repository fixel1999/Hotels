package com.fixel1999.hotelsapi.controller;

import com.fixel1999.hotelsapi.dto.AuthRequest;
import com.fixel1999.hotelsapi.dto.RegisterRequest;
import com.fixel1999.hotelsapi.security.jwt.JwtService;
import com.fixel1999.hotelsapi.model.Role;
import com.fixel1999.hotelsapi.model.UserEntity;
import com.fixel1999.hotelsapi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authManager) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authManager = authManager;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        UserEntity user = UserEntity.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        UserEntity savedUser = userService.save(user);
        return ResponseEntity.ok("User registered with role: " + savedUser.getRole());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody AuthRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        var user = userService.loadUserByUsername(request.getUsername());
        String jwt = jwtService.generateToken(user);
        return ResponseEntity.ok(jwt);
    }
}