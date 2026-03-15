package com.unilink.backend.domain.board.entity;

import java.time.LocalDateTime;

import com.unilink.backend.domain.user.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;;

@Entity
@Table(name = "board_comments")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardComment {
    
    /* 게시물 댓글 고유 번호 (기본키) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* 내용 (1000자) */
    @Column(nullable = false, columnDefinition = "TEXT")
    @Size(max = 1000)
    private String content;

    /* 댓글을 작성한 게시물 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    /* 댓글을 작성한 사용자 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    /* 댓글 작성 일시 */
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    /* ==================== Constructors ==================== */
    @Builder
    public BoardComment(String content, Board board, User author) {
        if (content == null || content.isBlank()) throw new IllegalArgumentException("댓글의 내용이 비어 있습니다.");
        if (content.trim().length() > 1000) throw new IllegalArgumentException("댓글의 내용은 1000자 이하여야 합니다.");
        if (board == null) throw new IllegalArgumentException("해당 게시글을 찾을 수 없습니다.");
        if (author == null) throw new IllegalArgumentException("작성자를 찾을 수 없습니다.");

        this.content = content;
        this.board = board;
        this.author = author;
    }

    /* ==================== JPA Lifecycle ==================== */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
