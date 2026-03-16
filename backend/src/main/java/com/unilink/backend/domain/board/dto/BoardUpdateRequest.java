package com.unilink.backend.domain.board.dto;

import com.unilink.backend.domain.board.enums.Category;

import jakarta.validation.constraints.Size;

public record BoardUpdateRequest(
    Category category,
    @Size(max = 50) String title,
    @Size(max = 2000) String content
) {}
