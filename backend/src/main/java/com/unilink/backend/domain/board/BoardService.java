package com.unilink.backend.domain.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unilink.backend.domain.board.dto.BoardCreateRequest;
import com.unilink.backend.domain.board.dto.BoardDetailResponse;
import com.unilink.backend.domain.board.dto.BoardListItemResponse;
import com.unilink.backend.domain.board.dto.BoardUpdateRequest;
import com.unilink.backend.domain.board.enums.Category;
import com.unilink.backend.domain.user.User;
import com.unilink.backend.domain.user.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
    
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    /* ==================== Create ==================== */
    /* 게시물 작성 */
    @Transactional
    public Long create(BoardCreateRequest req, Long authorUserId) {
        User author = userRepository
            .findById(authorUserId)
            .orElseThrow(() -> 
                new EntityNotFoundException("user not found: " + authorUserId));

        Board board = Board.builder()
            .category(req.category())
            .title(req.title())
            .content(req.content())
            .author(author)
            .build();

        return boardRepository.save(board).getBoardId();
    }

    /* ==================== Update ==================== */
    /* 게시물 수정 */
    @Transactional
    public void update(Long boardId, Long requestUserId, BoardUpdateRequest req) {
        Board board = boardRepository
            .findById(boardId)
            .orElseThrow(() -> new EntityNotFoundException("board not found: " + boardId));
        
        if (!board.getAuthor().getUserId().equals(requestUserId)) {
            throw new AccessDeniedException("not the author");
        }

        if (req.category() != null) {
            board.changeCategory(req.category());
        }
        if (req.title() != null) {
            String t = req.title().trim();
            if (t.isBlank()) throw new IllegalArgumentException("title must not be blank");
            board.changeTitle(t);
        }
        if (req.content() != null) {
            String c = req.content().trim();
            if (c.isBlank()) throw new IllegalArgumentException("content must not be blank");
            board.changeContent(c);
        }
    }

    /* ==================== Get ==================== */
    /* 게시물 목록 */
    @Transactional(readOnly = true)
    public Page<BoardListItemResponse> list(Category category, Pageable pageable) {
        Page<Board> page = ( category == null)
            ? boardRepository.findAllByOrderByCreatedAtDesc(pageable)
            : boardRepository.findByCategoryOrderByCreatedAtDesc(category, pageable);

        return page.map(BoardListItemResponse::from);
    }

    /* 게시물 상세 */
    @Transactional(readOnly = true)
    public BoardDetailResponse get(Long boardId) {
        Board board = boardRepository
            .findById(boardId)
            .orElseThrow(() -> new EntityNotFoundException("board not found: " + boardId));

        return BoardDetailResponse.from(board);
    }

    /* ==================== Delete ==================== */
    /* 게시물 삭제 */
    @Transactional
    public void delete(Long boardId, Long requestUserId) {
        Board board = boardRepository
            .findById(boardId)
            .orElseThrow(() -> new EntityNotFoundException("board not found: " + boardId));

        if (!board.getAuthor().getUserId().equals(requestUserId)) {
            throw new AccessDeniedException("not the author");
        }
        
        boardRepository.delete(board);
    }
}
