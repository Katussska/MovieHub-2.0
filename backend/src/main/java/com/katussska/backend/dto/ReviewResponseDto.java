package com.katussska.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponseDto {
    private String date;
    private String content;
    private String username;
}
