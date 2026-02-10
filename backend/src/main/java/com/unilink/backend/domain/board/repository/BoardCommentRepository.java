package com.unilink.backend.domain.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.unilink.backend.domain.board.entity.BoardComment;

@Repository
public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {
    
    /**
     * 작성자를 포함한 전체 댓글 조회
     * @param boardId - 댓글을 가지고 올 게시물 고유 번호(Id)
     * @return
     */
    @Query("""
        SELECT board_comment from BoardComment board_comment 
        join fetch board_comment.author 
        where board_comment.board.id = :boardId 
        order by board_comment.createdAt asc
    """)
    List<BoardComment> findAllByBoardIdWithAuthor(@Param("boardId") Long boardId);

}
