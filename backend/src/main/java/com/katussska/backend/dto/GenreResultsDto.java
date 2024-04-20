package com.katussska.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GenreResultsDto {
    private List<GenreDto> genres;
}
