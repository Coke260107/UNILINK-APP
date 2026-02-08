package com.unilink.backend.domain.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.unilink.backend.domain.board.enums.Category;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Board> findByCategoryOrderByCreatedAtDesc(Category category, Pageable pageable);
}
