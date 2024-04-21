package com.katussska.backend.service;

import com.katussska.backend.entities.Review;
import com.katussska.backend.repository.ReviewRep;
import org.springframework.stereotype.Service;

@Service
public class ReviewSer {
    private final ReviewRep reviewRepository;

    public ReviewSer(ReviewRep reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }
}