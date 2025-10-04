package in.FirstSpringbProject.musifyapi.service;

import in.FirstSpringbProject.musifyapi.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import in.FirstSpringbProject.musifyapi.document.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.Collection;
import java.util.Collections;

@Data
@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        in.FirstSpringbProject.musifyapi.document.User existingUser = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User not found for Email " +email));
       return new org.springframework.security.core.userdetails.User(existingUser.getEmail(),existingUser.getPassword(),getAuthorities(existingUser));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(User existingUser) {
      return Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+existingUser.getRole().name()));
    }
}
