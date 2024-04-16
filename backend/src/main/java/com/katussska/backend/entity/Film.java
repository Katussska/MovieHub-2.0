package com.katussska.backend.entity;
import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Data
@Entity
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nazev;
    private String popis;
    private double hodnoceni;

    // Případně další atributy a konstruktory, pokud jsou potřeba
}
