package com.katussska.backend.service;

import com.katussska.backend.dto.FilmDto;
import com.katussska.backend.entities.Film;
import com.katussska.backend.entities.Genre;
import com.katussska.backend.repository.FilmRep;
import com.katussska.backend.repository.GenreRep;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FilmSer {
    private final TMDbSer tmdbService;
    private final FilmRep filmRepository;
    private final GenreRep genreRepository;

    public FilmSer(TMDbSer tmdbService, FilmRep filmRepository, GenreRep genreRepository) {
        this.tmdbService = tmdbService;
        this.filmRepository = filmRepository;
        this.genreRepository = genreRepository;
    }

    public List<Film> fetchAndSaveMovies(String url) {
        List<FilmDto> filmDtos = tmdbService.fetchMovies(url);

        return getFilms(filmDtos);
    }

    public List<Film> fetchAndSaveSearchedMovies(String searched) {
        List<FilmDto> filmDtos = tmdbService.fetchSearchedMovies(searched);

        return getFilms(filmDtos);
    }

    private List<Film> getFilms(List<FilmDto> filmDtos) {
        List<Film> films = filmDtos.stream()
                .map(filmDto -> {
                    if (filmRepository.existsById(filmDto.getId())) {
                        return filmRepository.findById(filmDto.getId()).get();
                    } else {
                        Film film = convertDtoToEntity(filmDto);
                        filmRepository.save(film);
                        return film;
                    }
                })
                .collect(Collectors.toList());

        return films;
    }

    private Film convertDtoToEntity(FilmDto filmDto) {
        List<Genre> allGenres = genreRepository.findAll();
        Map<Long, Genre> genreIdToGenreMap = allGenres.stream().collect(Collectors.toMap(Genre::getGenreId, genre -> genre));

        Film film = new Film();
        film.setAdult(filmDto.isAdult());
        film.setFilmId(filmDto.getId());
        film.setTitle(filmDto.getTitle());
        film.setDescription(filmDto.getOverview());
        film.setPosterPath(filmDto.getPosterPath());
        film.setRelease(filmDto.getReleaseDate());
        film.setRating(filmDto.getVoteAverage());
        film.setGenres(filmDto.getGenres()
                .stream()
                .map(genreIdToGenreMap::get)
                .collect(Collectors.toList()));
        return film;
    }

}
