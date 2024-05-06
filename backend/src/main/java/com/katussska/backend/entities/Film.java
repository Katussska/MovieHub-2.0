package com.katussska.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "Film", indexes = {
        @Index(name = "idx_film_film_id_unq", columnList = "film_id", unique = true)
})
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "filmId")
public class Film {
    @Column(name = "18+", nullable = false)
    private Boolean adult;

    @ManyToMany
    @JoinTable(
            name = "film_genre",
            joinColumns = @JoinColumn(name = "film_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "genre_id", nullable = false)
    )
    private List<Genre> genres;

    @Id
    @Column(name = "film_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long filmId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    @Column(name = "poster_path", nullable = false)
    private String posterPath;

    @Column(name = "release_date", nullable = false)
    private String release;

    @Column(name = "rating", nullable = false)
    private Double rating;

    @OneToMany(mappedBy = "film")
    private List<Review> reviews;
}