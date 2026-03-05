package com.unilink.backend.repository;

import com.unilink.backend.domain.report.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    // [중요 정책 반영] 신고자가 특정 모임을 이미 신고했는지 찾아보는 기능
    boolean existsByReporterIdAndMeetingId(Long reporterId, Long meetingId);
}