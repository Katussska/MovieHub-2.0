package com.katussska.backend.repository;

import com.katussska.backend.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRep extends JpaRepository<Review, Long> {
    List<Review> findByFilmId(Long filmId);
}
