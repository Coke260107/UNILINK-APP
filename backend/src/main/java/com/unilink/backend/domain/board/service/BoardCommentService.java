package com.unilink.backend.domain.board.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unilink.backend.domain.board.entity.Board;
import com.unilink.backend.domain.board.entity.BoardComment;
import com.unilink.backend.domain.board.repository.BoardCommentRepository;
import com.unilink.backend.domain.board.repository.BoardRepository;
import com.unilink.backend.domain.user.User;
import com.unilink.backend.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardCommentService {
    private final BoardCommentRepository boardCommentRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    /* ==================== Get ==================== */

    /**
     * 댓글 조회 로직
     * @param boardId - 조회할 게시물 고유 번호
     * @return 작성자 정보가 포함된 댓글 리스트
     */
    public List<BoardComment> getCommentByBoard(Long boardId) {
        if (!boardRepository.existsById(boardId))
            throw new IllegalArgumentException("존재하지 않는 게시물입니다.");

        return boardCommentRepository.findAllByBoardIdWithAuthor(boardId);
    }

    /* ==================== Create ==================== */
    
    /**
     * 댓글 생성 로직
     * @param boardId - 게시물 고유 번호
     * @param userId - 사용자 고유 번허
     * @param content - 댓글 내용 (1000자)
     * @return 생성된 댓글의 고유 정보
     */
    @Transactional
    public Long createComment(Long boardId, Long userId, String content) {
        Board board = boardRepository
            .findById(boardId)
            .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다."));
        
        User user = userRepository
            .findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        
        BoardComment comment = BoardComment.builder()
            .content(content)
            .board(board)
            .author(user)
            .build();

        return boardCommentRepository.save(comment).getId();
    }

    /* ==================== Delete ==================== */
    
    /**
     * 댓글 삭제 로직
     * @param boardCommentId - 삭제할 댓글 고유 번호
     * @param userId - 사용자 고유 번호
     */
    @Transactional
    public void deleteComment(Long boardCommentId, Long userId) {
        BoardComment comment = boardCommentRepository
            .findById(boardCommentId)
            .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다."));
        
        if (comment.getAuthor().getUserId().equals(userId)) {
            throw new IllegalStateException("삭제 권한이 없습니다.");
        }

        boardCommentRepository.delete(comment);
    }
}
