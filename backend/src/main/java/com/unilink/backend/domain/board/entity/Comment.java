package com.unilink.backend.domain.board.entity;

import com.unilink.backend.domain.user.User;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comments")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User author;

    /* ==================== Constructors ==================== */
    @Builder
    public Comment(String content, Board board, User author) {
        if (content == null || content.isBlank()) throw new IllegalArgumentException("content is required");
        if (board == null) throw new IllegalArgumentException("board is required");
        if (author == null) throw new IllegalArgumentException("user is required");

        this.content = content;
        this.board = board;
        this.author = author;
    }
}
