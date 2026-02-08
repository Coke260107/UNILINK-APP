package com.unilink.backend.domain.board.dto;

import java.time.LocalDateTime;

import com.unilink.backend.domain.board.Board;
import com.unilink.backend.domain.board.enums.Category;

public record BoardListItemResponse(
    Long boardId,
    Category category,
    String title,
    Long authorId,
    String authorNickname,
    int likeCount,
    LocalDateTime createdAt
) {
    public static BoardListItemResponse from(Board board) {
        return new BoardListItemResponse(
            board.getBoardId(),
            board.getCategory(),
            board.getTitle(),
            board.getAuthor().getUserId(),
            board.getAuthor().getNickname(),
            board.getLikeCount(),
            board.getCreatedAt()
        );
    }
}
