package com.unilink.backend.domain.board.dto;

import java.time.LocalDateTime;

import com.unilink.backend.domain.board.Board;
import com.unilink.backend.domain.board.enums.Category;

public record BoardDetailResponse(
    Long boardId,
    Category category,
    String title,
    String content,
    Long authorId,
    String authorNickname,
    int likeCount,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    public static BoardDetailResponse from(Board board) {
        return new BoardDetailResponse(
            board.getBoardId(),
            board.getCategory(),
            board.getTitle(),
            board.getContent(),
            board.getAuthor().getUserId(),
            board.getAuthor().getNickname(),
            board.getLikeCount(),
            board.getCreatedAt(),
            board.getUpdatedAt()
        );
    }
}
