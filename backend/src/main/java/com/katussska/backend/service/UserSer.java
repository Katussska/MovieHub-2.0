package com.katussska.backend.service;

import com.katussska.backend.entities.AppUser;
import com.katussska.backend.repository.UserRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserSer {
    private final UserRep userRepository;

    @Autowired
    public UserSer(UserRep userRepository) {
        this.userRepository = userRepository;
    }

    public AppUser register(AppUser appUser) {
        AppUser existingAppUserByEmail = userRepository.findByEmail(appUser.getEmail());
        AppUser existingAppUserByUsername = userRepository.findByUsername(appUser.getUsername());
        if (existingAppUserByEmail != null)
            throw new IllegalArgumentException("Email is already taken");

        if (existingAppUserByUsername != null)
            throw new IllegalArgumentException("Username is already taken");

        appUser.setPassword(appUser.getPassword());
        return userRepository.save(appUser);
    }

    public AppUser login(String username, String password) {
        AppUser existingAppUser = userRepository.findByUsername(username);

        if (existingAppUser == null || (!Objects.equals(password, existingAppUser.getPassword())))
            throw new IllegalArgumentException("Invalid username or password");

        return existingAppUser;
    }

    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("User with id " + id + " does not exist");
        }
    }

    public AppUser findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public AppUser findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public AppUser saveUser(AppUser appUser) {
        return userRepository.save(appUser);
    }
}
