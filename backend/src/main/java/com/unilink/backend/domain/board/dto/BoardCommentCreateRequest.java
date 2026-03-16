package com.unilink.backend.domain.board.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BoardCommentCreateRequest(
    @NotBlank(message = "댓글 내용은 비어있을 수 없습니다.")
    @Size(max = 1000, message = "댓글은 1000자 이내로 작성해주세요.")
    String content
) {}
