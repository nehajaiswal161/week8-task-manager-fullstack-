package com.taskmanager.controller;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        if ("neha".equals(loginRequest.getUsername()) && "password".equals(loginRequest.getPassword())) {
            return "{\"token\": \"fake-jwt-token-123\"}";
        }
        throw new RuntimeException("Invalid credentials");
    }
}
class LoginRequest {
    private String username;
    private String password;
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
