package com.fixel1999.hotelsapi.service;

import com.fixel1999.hotelsapi.model.UserEntity;
import com.fixel1999.hotelsapi.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepo;

    public UserService(UserRepository repo) {
        this.userRepo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public UserEntity save(UserEntity user) {
        return userRepo.save(user);
    }
}
