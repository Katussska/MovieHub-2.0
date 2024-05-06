package com.katussska.backend.repository;

import com.katussska.backend.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRep extends JpaRepository<AppUser, Long> {
    AppUser findByEmail(String email);

    AppUser findByUsername(String username);
}
