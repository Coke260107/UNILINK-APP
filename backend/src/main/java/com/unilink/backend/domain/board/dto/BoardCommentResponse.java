package com.unilink.backend.domain.board.dto;

import java.time.LocalDateTime;

import com.unilink.backend.domain.board.entity.BoardComment;

public record BoardCommentResponse(
   Long id,
   String content,
   String authorName,
   LocalDateTime createdAt 
) {
    public static BoardCommentResponse from(BoardComment comment) {
        return new BoardCommentResponse(
            comment.getId(), 
            comment.getContent(), 
            comment.getAuthor().getNickname(), 
            comment.getCreatedAt()
        );
    } 
}
