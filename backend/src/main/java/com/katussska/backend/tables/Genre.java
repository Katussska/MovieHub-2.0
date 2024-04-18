package com.katussska.backend.tables;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long genre_id;

    private Long id; //id z api, mby useless, uvidime
    private String name;

    @ManyToMany(mappedBy = "genres")
    private List<Film> films;
}
