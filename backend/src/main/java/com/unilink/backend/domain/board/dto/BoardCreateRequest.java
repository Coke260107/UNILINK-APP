package com.unilink.backend.domain.board.dto;

import com.unilink.backend.domain.board.enums.Category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BoardCreateRequest(
    @NotBlank Category category,
    @NotBlank @Size(max = 50) String title,
    @NotBlank @Size(max = 2000) String content
) {}
