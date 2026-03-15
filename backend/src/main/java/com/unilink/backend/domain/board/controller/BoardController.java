package com.unilink.backend.domain.board.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unilink.backend.domain.board.dto.BoardCreateRequest;
import com.unilink.backend.domain.board.dto.BoardDetailResponse;
import com.unilink.backend.domain.board.dto.BoardListItemResponse;
import com.unilink.backend.domain.board.dto.BoardUpdateRequest;
import com.unilink.backend.domain.board.enums.Category;
import com.unilink.backend.domain.board.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {
    private final BoardService boardService;

    /* 게시물 작성 */
    @PostMapping
    public ResponseEntity<Long> create(
        Long userId,
        @Valid @RequestBody BoardCreateRequest req
    ) {
        Long boardId = boardService.create(req, userId);
        return ResponseEntity.ok(boardId);
    }

    /* 게시글 목록 */
    @GetMapping
    public ResponseEntity<Page<BoardListItemResponse>> list(
        @RequestParam(required = false) Category category,
        Pageable pageable
    ) {
        return ResponseEntity.ok(boardService.list(category, pageable));
    }

    /* 게시글 상세 */
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardDetailResponse> get(@PathVariable Long boardId) {
        return ResponseEntity.ok(boardService.get(boardId));
    }

    /* 게시글 수정 */
    @PutMapping("/{boardId}")
    public ResponseEntity<Void> update(
        Long userId,
        @PathVariable Long boardId,
        @Valid @RequestBody BoardUpdateRequest req
    ) {
        boardService.update(boardId, userId, req);
        return ResponseEntity.noContent().build();
    }

    /* 게시글 삭제 */
    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> delete(
        Long userId,
        @PathVariable Long boardId
    ) {
        boardService.delete(boardId, userId);
        return ResponseEntity.noContent().build();
    }
}
