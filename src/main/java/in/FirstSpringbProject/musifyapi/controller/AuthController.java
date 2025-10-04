package in.FirstSpringbProject.musifyapi.controller;

import in.FirstSpringbProject.musifyapi.document.User;
import in.FirstSpringbProject.musifyapi.dto.AuthRequest;
import in.FirstSpringbProject.musifyapi.dto.AuthResponse;
import in.FirstSpringbProject.musifyapi.dto.RegisterRequest;
import in.FirstSpringbProject.musifyapi.dto.UserResponse;
import in.FirstSpringbProject.musifyapi.service.AppUserDetailsService;
import in.FirstSpringbProject.musifyapi.service.UserService;
import in.FirstSpringbProject.musifyapi.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request){
       try{
           //Authenticate the user
           authenticationManager.authenticate((new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword())));

           //Load user detail
           UserDetails userDetails = appUserDetailsService.loadUserByUsername(request.getEmail());
           User existingUser = userService.findByEmail(request.getEmail());

           //Generate jwt token
           String token = jwtUtil.generateToken(userDetails,existingUser.getRole().name());


           return ResponseEntity.ok(new AuthResponse(token,request.getEmail(),existingUser.getRole().name()));
       }catch (BadCredentialsException e){
           return ResponseEntity.badRequest().body("Email/Password is incorrect");
       }catch (Exception e){
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
       }

    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){

        try{
            UserResponse response = userService.registerUser(request);
            return ResponseEntity.ok(response);
        }catch (Exception e){
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
