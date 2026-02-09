package com.unilink.backend.domain.board.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unilink.backend.domain.board.entity.Board;
import com.unilink.backend.domain.board.entity.BoardLike;
import com.unilink.backend.domain.board.repository.BoardLikeRepository;
import com.unilink.backend.domain.board.repository.BoardRepository;
import com.unilink.backend.domain.user.User;
import com.unilink.backend.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardLikeService {
    
    private final BoardLikeRepository boardLikeRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Transactional
    public void toggleLike(Long boardId, Long userId) {
        Board board = boardRepository
            .findById(boardId)
            .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

        Optional<BoardLike> alreadyLike = boardLikeRepository.findByBoard_BoardIdAndUser_UserId(boardId, userId);

        if (alreadyLike.isPresent()) {
            boardLikeRepository.delete(alreadyLike.get());
            board.decreaseLikeCount();
        } else {
            User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

            BoardLike boardLike = new BoardLike(board, user);
            boardLikeRepository.save(boardLike);
            board.increaseLikeCount();
        }
    }

    public long getLikeCount(Long boardId) {
        return boardLikeRepository.countByBoard_BoardId(boardId);
    }
}
