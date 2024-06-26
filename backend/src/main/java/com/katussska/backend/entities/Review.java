package com.katussska.backend.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "Review", indexes = {
        @Index(name = "idx_review_review_id_unq",
                columnList = "review_id", unique = true)
})
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "reviewId")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "review_id", nullable = false)
    private Long reviewId;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "date", nullable = false)
    private String date;

    @ManyToOne
    @JoinColumn(name = "film_id")
    private Film film;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser appUser;
}