package com.katussska.backend.repository;

import com.katussska.backend.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRep extends JpaRepository<Users, Long> {
    Users findByEmail(String email);

    Users findByUsername(String username);
}
