package com.unilink.backend.domain.board.entity;

import com.unilink.backend.domain.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;

@Entity
@Table(
    name = "board_likes",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"board_id", "user_id"})
    }
)
@Getter
public class BoardLike {
    
    /* 기본키 */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* board_id */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    /* user_id */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    protected BoardLike() {}

    /* ==================== Constructors ==================== */
    public BoardLike(Board board, User user) {
        if (board == null) throw new IllegalArgumentException("board is required");
        if (user == null) throw new IllegalArgumentException("user is required");

        this.board = board;
        this.user = user;
    }
}
