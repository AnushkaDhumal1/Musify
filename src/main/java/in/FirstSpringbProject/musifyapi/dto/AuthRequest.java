package in.FirstSpringbProject.musifyapi.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
