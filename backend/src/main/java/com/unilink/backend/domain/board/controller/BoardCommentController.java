package com.unilink.backend.domain.board.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unilink.backend.domain.board.dto.BoardCommentCreateRequest;
import com.unilink.backend.domain.board.dto.BoardCommentResponse;
import com.unilink.backend.domain.board.service.BoardCommentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/boards/{boardId}/comments")
@RequiredArgsConstructor
public class BoardCommentController {
    
    private final BoardCommentService boardCommentService;

    @PostMapping
    public ResponseEntity<Long> createComment (
        @PathVariable Long boardId,
        @Valid @RequestBody BoardCommentCreateRequest request,
        @RequestParam Long userId
    ) {
        Long commentId = boardCommentService.createComment(boardId, userId, request.content());
        return ResponseEntity.ok(commentId);
    }

    @GetMapping
    public  ResponseEntity<List<BoardCommentResponse>> getComment(@PathVariable Long boardId) {
        List<BoardCommentResponse> responses = boardCommentService.getCommentByBoard(boardId)
            .stream()
            .map(BoardCommentResponse::from)
            .toList();
            
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{boardCommentId}")
    public ResponseEntity<Void> deleteComment(
        @PathVariable Long boardCommentId,
        @RequestParam Long userId
    ) {
        boardCommentService.deleteComment(boardCommentId, userId);
        return ResponseEntity.noContent().build();
    }
}
