package com.katussska.backend.service;

import com.katussska.backend.dto.FilmDto;
import com.katussska.backend.entities.Film;
import com.katussska.backend.repository.FilmRep;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FilmSer {
    private final TMDbSer tmdbSer;
    private final FilmRep filmRepository;

    public FilmSer(TMDbSer tmdbSer, FilmRep filmRepository) {
        this.tmdbSer = tmdbSer;
        this.filmRepository = filmRepository;
    }

    public List<Film> fetchAndSaveTrendingMovies() {
        List<FilmDto> filmDtos = tmdbSer.fetchTrendingMovies();

        List<Film> films = filmDtos.stream()
                .map(this::convertDtoToEntity)
                .filter(film -> !filmRepository.existsById(film.getFilmId()))
                .collect(Collectors.toList());

        List<Film> savedFilms = filmRepository.saveAll(films);

        return savedFilms;
    }

    public List<Film> fetchAndSaveSearchedMovies(String searched) {
        List<FilmDto> filmDtos = tmdbSer.fetchSearchedMovies(searched);

        List<Film> films = filmDtos.stream()
                .map(this::convertDtoToEntity)
                .filter(film -> !filmRepository.existsById(film.getFilmId()))
                .collect(Collectors.toList());

        List<Film> savedFilms = filmRepository.saveAll(films);

        return savedFilms;
    }

    private Film convertDtoToEntity(FilmDto filmDto) {
        Film film = new Film();
        film.setAdult(filmDto.isAdult());
        film.setFilmId(filmDto.getId());
        film.setTitle(filmDto.getTitle());
        film.setDescription(filmDto.getOverview());
        film.setPosterPath(filmDto.getPosterPath());
        film.setRelease(filmDto.getReleaseDate());
        film.setRating(filmDto.getVoteAverage());
        return film;
    }


}
