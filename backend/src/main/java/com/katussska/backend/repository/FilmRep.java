package com.katussska.backend.repository;

import com.katussska.backend.entities.Film;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilmRep extends JpaRepository<Film, Long> {
}
