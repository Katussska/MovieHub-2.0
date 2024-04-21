package com.katussska.backend.service;

import com.katussska.backend.entities.Users;
import com.katussska.backend.repository.UserRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserSer {
    private final UserRep userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserSer(UserRep userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Users register(Users users) {
        Users existingUsersByEmail = userRepository.findByEmail(users.getEmail());
        Users existingUsersByUsername = userRepository.findByUsername(users.getUsername());
        if (existingUsersByEmail != null)
            throw new IllegalArgumentException("Email is already taken");

        if (existingUsersByUsername != null)
            throw new IllegalArgumentException("Username is already taken");

        users.setPassword(passwordEncoder.encode(users.getPassword()));
        return userRepository.save(users);
    }

    public Users login(Users users) {
        Users existingUsers = userRepository.findByEmail(users.getEmail());

        if (existingUsers == null || !passwordEncoder.matches(users.getPassword(), existingUsers.getPassword()))
            throw new IllegalArgumentException("Invalid email or password");

        return existingUsers;
    }

    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("User with id " + id + " does not exist");
        }
    }

    public Users findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Users findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Users saveUser(Users users) {
        return userRepository.save(users);
    }
}
