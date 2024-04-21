package com.katussska.backend.controller;

import com.katussska.backend.dto.ErrorResponse;
import com.katussska.backend.entities.Users;
import com.katussska.backend.service.UserSer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserCont {
    private final UserSer userService;

    @Autowired
    public UserCont(UserSer userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users users) {
        try {
            Users registeredUsers = userService.register(users);
            return new ResponseEntity<>(registeredUsers, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Users> login(@RequestBody Users users) {
        try {
            Users authenticatedUsers = userService.login(users);
            return new ResponseEntity<>(authenticatedUsers, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // In UserCont.java
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestParam Long id, @RequestBody Users updatedUsers) {
        try {
            Users existingUsers = userService.findById(id);
            if (existingUsers == null)
                return new ResponseEntity<>(new ErrorResponse("User with id " + id + " does not exist"), HttpStatus.NOT_FOUND);


            Users usersWithSameUsername = userService.findByUsername(updatedUsers.getUsername());
            if (usersWithSameUsername != null && !usersWithSameUsername.getUserId().equals(id))
                return new ResponseEntity<>(new ErrorResponse("Username is already in use"), HttpStatus.BAD_REQUEST);


            existingUsers.setUsername(updatedUsers.getUsername());
            existingUsers.setFirstName(updatedUsers.getFirstName());
            existingUsers.setLastName(updatedUsers.getLastName());

            Users savedUsers = userService.saveUser(existingUsers);
            return new ResponseEntity<>(savedUsers, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteUser(@RequestParam Long id) {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}