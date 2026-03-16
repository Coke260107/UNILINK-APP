package com.unilink.backend.domain.board.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.unilink.backend.domain.board.entity.BoardLike;

public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {
    boolean existsByBoard_BoardIdAndUser_UserId(Long boardId, Long userId);

    Optional<BoardLike> findByBoard_BoardIdAndUser_UserId(Long boardId, Long userId);

    long countByBoard_BoardId(Long boardId);

    @Query("""
        SELECT bl.board.boardId
        FROM BoardLike bl
        WHERE bl.user.userId = :userId
        AND bl.board.boardId IN :boardIds
            """)
    List<Long> findLikeBoardIdsByUserIdAndBoardIds(
        @Param("userId") Long userId,
        @Param("boardIds") Collection<Long> boardIds
    );

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("""
        DELETE FROM BoardLike bl
        WHERE bl.board.boardId = :boardId AND bl.user.userId = :userId
            """)
    void deleteByBoardIdAndUserId(@Param("boardId") Long boardId, @Param("userId") Long userId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("""
        DELETE FROM BoardLike bl
        WHERE bl.board.boardId = :boardId
            """)
    void deleteAllByBoardId(@Param("boardId") Long boardId);
}
