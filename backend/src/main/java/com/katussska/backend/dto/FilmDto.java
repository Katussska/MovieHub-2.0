package com.katussska.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FilmDto {
    @JsonProperty("backdrop_path")
    private String backdropPath;
    private Long id;
    @JsonProperty("original_title")
    private String originalTitle;
    private String overview;
    @JsonProperty("poster_path")
    private String posterPath;
    private boolean adult;
    @JsonProperty("genre_ids")
    private List<Integer> genreIds;
    @JsonProperty("original_language")
    private String originalLanguage;
    private double popularity;
    @JsonProperty("release_date")
    private String releaseDate;
    private String title;
    private boolean video;
    @JsonProperty("vote_average")
    private double voteAverage;
    @JsonProperty("vote_count")
    private int voteCount;
}