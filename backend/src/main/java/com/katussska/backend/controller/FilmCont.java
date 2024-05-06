package com.katussska.backend.controller;

import com.katussska.backend.entities.Film;
import com.katussska.backend.repository.FilmRep;
import com.katussska.backend.service.FilmSer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/films")
public class FilmCont {

    private final FilmSer filmService;
    private final FilmRep filmRepository;
    @Autowired
    private ResourceLoader resourceLoader;

    public FilmCont(FilmSer filmService, FilmRep filmRepository) {
        this.filmService = filmService;
        this.filmRepository = filmRepository;
    }

    @GetMapping("/trending")
    public List<Film> getTrendingMovies() {
        String trendingMoviesUrl = "https://api.themoviedb.org/3/trending/movie/week?api_key=";
        return filmService.fetchAndSaveMovies(trendingMoviesUrl);
    }

    @GetMapping("/popular")
    public List<Film> getPopularMovies() {
        String popularMoviesUrl = "https://api.themoviedb.org/3/movie/popular?api_key=";
        return filmService.fetchAndSaveMovies(popularMoviesUrl);
    }

    @GetMapping("/nowPlaying")
    public List<Film> getNowPlayingMovies() {
        String nowPlayingMoviesUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
        return filmService.fetchAndSaveMovies(nowPlayingMoviesUrl);
    }

    @GetMapping("/topRated")
    public List<Film> getTopRatedMovies() {
        String topRatedMoviesUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=";
        return filmService.fetchAndSaveMovies(topRatedMoviesUrl);
    }

    @GetMapping("/upcoming")
    public List<Film> getUpcomingMovies() {
        String upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=";
        return filmService.fetchAndSaveMovies(upcomingMoviesUrl);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/search")
    public List<Film> searchFilms(@RequestParam String query) {
        return filmService.fetchAndSaveSearchedMovies(query);
    }

    @GetMapping("/filmInfo")
    public ResponseEntity<Film> getFilm(@RequestParam Long filmId) {
        Film film = filmRepository.findById(filmId).orElseThrow(() -> new RuntimeException("Film not found"));
        return new ResponseEntity<>(film, HttpStatus.OK);
    }
}