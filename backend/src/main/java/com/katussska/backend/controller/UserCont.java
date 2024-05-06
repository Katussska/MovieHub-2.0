package com.katussska.backend.controller;

import com.katussska.backend.dto.ErrorResponse;
import com.katussska.backend.entities.AppUser;
import com.katussska.backend.service.UserSer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Pattern;

@RestController
@RequestMapping("/users")
public class UserCont {
    private final UserSer userService;

    @Autowired
    public UserCont(UserSer userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AppUser appUser) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(emailRegex);
        if (!pattern.matcher(appUser.getEmail()).matches()) {
            return new ResponseEntity<>(new ErrorResponse("Invalid email format"), HttpStatus.BAD_REQUEST);
        }
        if (appUser.getUsername().isEmpty() || appUser.getFirstName().isEmpty() || appUser.getLastName().isEmpty()) {
            return new ResponseEntity<>(new ErrorResponse("Username, firstname and lastname must not be empty"), HttpStatus.BAD_REQUEST);
        }
        try {
            AppUser registeredAppUser = userService.register(appUser);
            return new ResponseEntity<>(registeredAppUser, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AppUser> login(@RequestBody AppUser appUser) {
        try {
            AppUser authenticatedAppUser = userService.login(appUser);
            return new ResponseEntity<>(authenticatedAppUser, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // In UserCont.java
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestParam Long id, @RequestBody AppUser updatedAppUser) {
        try {
            AppUser existingAppUser = userService.findById(id);
            if (existingAppUser == null)
                return new ResponseEntity<>(new ErrorResponse("User with id " + id + " does not exist"), HttpStatus.NOT_FOUND);


            AppUser appUserWithSameUsername = userService.findByUsername(updatedAppUser.getUsername());
            if (appUserWithSameUsername != null && !appUserWithSameUsername.getUserId().equals(id))
                return new ResponseEntity<>(new ErrorResponse("Username is already in use"), HttpStatus.BAD_REQUEST);


            existingAppUser.setUsername(updatedAppUser.getUsername());
            existingAppUser.setFirstName(updatedAppUser.getFirstName());
            existingAppUser.setLastName(updatedAppUser.getLastName());

            AppUser savedAppUser = userService.saveUser(existingAppUser);
            return new ResponseEntity<>(savedAppUser, HttpStatus.OK);
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