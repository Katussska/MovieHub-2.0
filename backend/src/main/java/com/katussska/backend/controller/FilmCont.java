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
        String trendingMoviesUrl = "https://api.themoviedb.org/3/trending/movie/week?api_key=";
        return filmSer.fetchAndSaveMovies(trendingMoviesUrl);
    }

    @GetMapping("/popular")
    public List<Film> getPopularMovies() {
        String popularMoviesUrl = "https://api.themoviedb.org/3/movie/popular?api_key=";
        return filmSer.fetchAndSaveMovies(popularMoviesUrl);
    }

    @GetMapping("/nowPlaying")
    public List<Film> getNowPlayingMovies() {
        String nowPlayingMoviesUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
        return filmSer.fetchAndSaveMovies(nowPlayingMoviesUrl);
    }

    @GetMapping("/topRated")
    public List<Film> getTopRatedMovies() {
        String topRatedMoviesUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=";
        return filmSer.fetchAndSaveMovies(topRatedMoviesUrl);
    }

    @GetMapping("/upcoming")
    public List<Film> getUpcomingMovies() {
        String upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=";
        return filmSer.fetchAndSaveMovies(upcomingMoviesUrl);
    }

    @GetMapping("/search")
    public List<Film> searchFilms(@RequestParam String query) {
        return filmSer.fetchAndSaveSearchedMovies(query);
    }
}