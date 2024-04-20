package com.katussska.backend.service;

import com.katussska.backend.dto.FilmDto;
import com.katussska.backend.dto.FilmResultsDto;
import com.katussska.backend.dto.GenreDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;

@Service
public class TMDbSer {

    private static final Logger log = LoggerFactory.getLogger(TMDbSer.class);
    private final String API_KEY = "ef076b99225793040b2243b3b0b5b8c5";
    private final RestTemplate restTemplate;

    public TMDbSer(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<FilmDto> fetchTrendingMovies() {
        String url = "https://api.themoviedb.org/3/trending/movie/week?api_key=" + API_KEY;
        log.info("Sending request to: " + url);
        ResponseEntity<FilmResultsDto> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                FilmResultsDto.class
        );
        log.info("Received response: " + response.getBody());
        return Objects.requireNonNull(response.getBody()).getResults();
    }

    public List<FilmDto> fetchSearchedMovies(String searched) {
        String url = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=" + searched;
        log.info("Sending request to: " + url);
        ResponseEntity<FilmResultsDto> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                FilmResultsDto.class
        );
        log.info("Received response: " + response.getBody());
        return Objects.requireNonNull(response.getBody()).getResults();
    }

    public List<GenreDto> fetchGenres() {
        String url = "GET https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY;
        log.info("Sending request to: " + url);
        ResponseEntity<List<GenreDto>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {
                }
        );
        log.info("Received response: " + response.getBody());
        return response.getBody();
    }

}