package com.unilink.backend.domain.board.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unilink.backend.domain.board.service.BoardLikeService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardLikeController {
    private final BoardLikeService boardLikeService;

    @PostMapping("/{boardId}/likes")
    public ResponseEntity<Void> toggleLike(
        @PathVariable Long boardId,
        @RequestParam Long userId
    ) {
        boardLikeService.toggleLike(boardId, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/{boardId/likes/count")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long boardId) {
        long count = boardLikeService.getLikeCount(boardId);
        return ResponseEntity.ok(count);
    }
    
}
