package com.katussska.backend.service;

import com.katussska.backend.entities.Review;
import com.katussska.backend.repository.ReviewRep;
import org.springframework.stereotype.Service;

@Service
public class ReviewSer {
    private final ReviewRep reviewReppository;

    public ReviewSer(ReviewRep reviewReppository) {
        this.reviewReppository = reviewReppository;
    }

    public Review saveReview(Review review) {
        return reviewReppository.save(review);
    }
}