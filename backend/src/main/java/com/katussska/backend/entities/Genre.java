package com.katussska.backend.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "genreId")
public class Genre {
    @Id
    @Column(name = "genre_id", nullable = false)
    private Long genreId;

    @Column(name = "name", nullable = false)
    private String name;

    @JsonIgnoreProperties("genres")
    @ManyToMany(mappedBy = "genres")
    private List<Film> films;
}