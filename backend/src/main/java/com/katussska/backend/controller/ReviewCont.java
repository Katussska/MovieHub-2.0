package com.katussska.backend.controller;

import com.katussska.backend.dto.ReviewResponseDto;
import com.katussska.backend.entities.AppUser;
import com.katussska.backend.entities.Film;
import com.katussska.backend.entities.Review;
import com.katussska.backend.repository.FilmRep;
import com.katussska.backend.repository.ReviewRep;
import com.katussska.backend.repository.UserRep;
import com.katussska.backend.service.ReviewSer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reviews")
public class ReviewCont {
    private final ReviewSer reviewService;
    private final ReviewRep reviewRepository;

    @Autowired
    private FilmRep filmRepository;

    @Autowired
    private UserRep userRepository;

    public ReviewCont(ReviewSer reviewService, ReviewRep reviewRepository) {
        this.reviewService = reviewService;
        this.reviewRepository = reviewRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<Review> createReview(@RequestParam String content, @RequestParam String date,
                                               @RequestParam String username, @RequestParam Long filmId) {
        Review review = new Review();
        AppUser appUser = userRepository.findByUsername(username);
        Film film = filmRepository.findById(filmId).orElseThrow(() -> new RuntimeException("Film not found"));

        review.setContent(content);
        review.setDate(date);
        review.setAppUser(appUser);
        review.setFilm(film);

        Review savedReview = reviewService.saveReview(review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete")
    public void deleteReview(@RequestParam Long reviewId) {
        reviewRepository.findById(reviewId).ifPresent(reviewRepository::delete);
    }

    @PutMapping("/update")
    public void updateReview(@RequestParam Long reviewId, @RequestParam String content) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new RuntimeException("Review not found"));

        review.setContent(content);

        reviewRepository.save(review);
    }

    @GetMapping("/film/filmReviews")
    public ResponseEntity<List<ReviewResponseDto>> getReviewsForFilm(@RequestParam Long filmId) {
        List<Review> reviews = reviewRepository.findByFilm_FilmId(filmId);
        List<ReviewResponseDto> reviewResponseDtos = reviews.stream()
                .map(review -> {
                    ReviewResponseDto dto = new ReviewResponseDto();
                    dto.setDate(review.getDate());
                    dto.setContent(review.getContent());
                    dto.setUsername(review.getAppUser().getUsername());
                    return dto;
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(reviewResponseDtos, HttpStatus.OK);
    }
}
