package com.fixel1999.hotelsapi.dto;

import com.fixel1999.hotelsapi.model.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "Username cannot be empty")
    @Size(min = 3, max = 20, message = "Username must have between 3 and 20 characters")
    private String username;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 6, max = 100, message = "Password must have at least 6 characters")
    private String password;

    @NotBlank(message = "Role cannot be empty")
    @Pattern(regexp = "ADMIN|USER", message = "Role must be ADMIN or USER")
    private Role role;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
