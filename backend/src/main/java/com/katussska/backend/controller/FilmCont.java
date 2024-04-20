package com.katussska.backend.controller;

import com.katussska.backend.entities.Film;
import com.katussska.backend.service.FilmSer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/films")
public class FilmCont {

    private final FilmSer filmSer;

    public FilmCont(FilmSer filmSer) {
        this.filmSer = filmSer;
    }

    @GetMapping("/trending")
    public List<Film> getTrendingMovies() {
        return filmSer.fetchAndSaveTrendingMovies();
    }

    @GetMapping("/search")
    public List<Film> searchFilms(@RequestParam String query) {
        return filmSer.fetchAndSaveSearchedMovies(query);
    }
}