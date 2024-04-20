package com.katussska.backend.service;

import com.katussska.backend.dto.GenreDto;
import com.katussska.backend.entities.Genre;
import com.katussska.backend.repository.GenreRep;

import java.util.List;
import java.util.stream.Collectors;

public class GenreSer {
    private final TMDbSer tmdbSer;
    private final GenreRep genreRepository;

    public GenreSer(TMDbSer tmdbSer, GenreRep genreRepository) {
        this.tmdbSer = tmdbSer;
        this.genreRepository = genreRepository;
    }

    public void fetchAndSaveGenres(String searched) {
        List<GenreDto> GenreDtos = tmdbSer.fetchGenres();

        List<Genre> Genres = GenreDtos.stream()
                .map(this::convertDtoToEntity)
                .filter(Genre -> !genreRepository.existsById(Genre.getGenreId()))
                .collect(Collectors.toList());

        List<Genre> savedGenres = genreRepository.saveAll(Genres);
    }

    private Genre convertDtoToEntity(GenreDto GenreDto) {
        Genre Genre = new Genre();
        Genre.setGenreId(GenreDto.getId());
        Genre.setName(GenreDto.getName());
        return Genre;
    }
}
