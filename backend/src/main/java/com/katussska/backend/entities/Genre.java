package com.katussska.backend.entities;

import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "Genre", indexes = {
        @Index(name = "idx_genre_genre_id_unq", columnList = "genre_id", unique = true)
})
@NoArgsConstructor
public class Genre {
    @Id
    @Column(name = "genre_id", nullable = false)
    private Long genreId;

    @JsonValue
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "genres")
    private List<Film> films;
}