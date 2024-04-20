package com.katussska.backend.repository;

import com.katussska.backend.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRep extends JpaRepository<Review, Long> {
}
