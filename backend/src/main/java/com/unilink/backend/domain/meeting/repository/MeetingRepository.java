package com.unilink.backend.domain.meeting.repository;

import com.unilink.backend.domain.meeting.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    /**
     * 모임 검색 페이지: 전체 모임 표시 (기본 제공 findAll() 사용 가능)
     */

    /**
     * 정책: 모임 제목으로 검색
     * findByTitleContaining: 제목에 특정 키워드가 포함된 모든 모임 조회 (LIKE %keyword%)
     */
    List<Meeting> findByTitleContaining(String title);

    /**
     * 정책: 카테고리 + 검색어(제목) 조합 검색
     * 카테고리가 일치하면서 제목에 키워드가 포함된 모임 조회
     */
    List<Meeting> findByCategoryAndTitleContaining(String category, String title);

    /**
     * 정책: 카테고리별 모임 목록 조회
     */
    List<Meeting> findByCategory(String category);
}