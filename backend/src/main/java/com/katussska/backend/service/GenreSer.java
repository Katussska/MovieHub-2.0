package com.katussska.backend.service;

import com.katussska.backend.dto.GenreDto;
import com.katussska.backend.entities.Genre;
import com.katussska.backend.repository.GenreRep;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GenreSer {
    private final TMDbSer tmdbService;
    private final GenreRep genreRepository;

    public GenreSer(TMDbSer tmdbService, GenreRep genreRepository) {
        this.tmdbService = tmdbService;
        this.genreRepository = genreRepository;
    }

    public List<Genre> fetchAndSaveGenres() {
        List<GenreDto> genreDtos = tmdbService.fetchGenres();

        List<Genre> genres = genreDtos.stream()
                .map(this::convertDtoToEntity)
                .filter(genre -> !genreRepository.existsById(genre.getGenreId()))
                .collect(Collectors.toList());

        genreRepository.saveAll(genres);
        return genres;
    }

    private Genre convertDtoToEntity(GenreDto GenreDto) {
        Genre genre = new Genre();
        genre.setGenreId(GenreDto.getId());
        genre.setName(GenreDto.getName());
        return genre;
    }
}