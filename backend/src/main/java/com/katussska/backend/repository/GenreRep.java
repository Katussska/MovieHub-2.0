package com.katussska.backend.repository;

import com.katussska.backend.entities.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRep extends JpaRepository<Genre, Long> {
}
