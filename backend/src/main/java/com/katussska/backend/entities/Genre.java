package com.katussska.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "Genre", indexes = {
        @Index(name = "idx_genre_genre_id_unq", columnList = "genre_id", unique = true)
})
public class Genre {
    @Id
    @Column(name = "genre_id", nullable = false)
    private Long genreId;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "genres")
    @JsonBackReference
    private List<Film> films;

}