package com.unilink.backend.domain.board;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.unilink.backend.domain.board.enums.Category;
import com.unilink.backend.domain.user.User;

@Entity
@Table(name = "boards")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board {
    /* 게시물 고유 번호 */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;

    /* 게시물 카테고리 */
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private Category category;

    /* 게시물 제목 (최대 50자) */
    @Size(max = 50)
    @Column(name = "title", nullable = false, length = 50)
    private String title;

    /* 게시물 내용 */
    @Lob
    @Size(max = 2000)   // 2000자
    @Column(name = "content", nullable = false)
    private String content;

    /* 게시물 작성자 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    /* 좋아요 개수 */
    @Column(name = "like_count", nullable = false)
    private int likeCount = 0;

    /* 연결된 모임 */ // Meeting 구현 예정
    // @Column(name = "meeting")
    // private Meeting meeting;

    /* 게시물 생성 시각 */
    @Column(name = "created_at",updatable = false, nullable = false)
    private LocalDateTime createdAt;

    /* 게시물 수정 시각 */
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /* ==================== Domain Methods ==================== */
    public void changeCategory(Category category) {
        if (category == null) {
            throw new IllegalArgumentException("category is required");
        }
        this.category = category;
    }

    public void changeTitle(String title) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("title is required");
        }
        if (title.length() > 50) {
            throw new IllegalArgumentException("title must be <= 50 characters");
        }
        this.title = title;
    }

    public void changeContent(String content) {
        if (content == null || content.isBlank()) {
            throw new IllegalArgumentException("content is");
        }
        if (content.length() > 2000) {
            throw new IllegalArgumentException("content must be <= 2000");
        }

        this.content = content;
    }

    /* ==================== Builder ==================== */
    @Builder
    private Board(Category category, String title, String content, User author) {
        if (category == null) 
            throw new IllegalArgumentException("category is required");
        if (title == null || title.isBlank())
            throw new IllegalArgumentException("title is required");
        if (content == null || content.isBlank())
            throw new IllegalArgumentException("content is required");
        if (author == null)
             throw new IllegalArgumentException("author is required");
        
        this.category = category;
        this.title = title;
        this.content = content;
        this.author = author;
    }

    /* ==================== JPA Lifecycle ==================== */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
