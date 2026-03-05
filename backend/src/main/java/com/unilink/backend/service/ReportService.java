package com.unilink.backend.service;

import com.unilink.backend.domain.report.Report;
import com.unilink.backend.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReportService {

    private final ReportRepository reportRepository;

    /**
     * 신고 생성 (정책: 한 모임에 대해 한 번만 신고 가능)
     */
    @Transactional
    public Long createReport(Report report) {
        // 1. 만약 모임 신고라면, 이미 신고했는지 체크!
        if (report.getMeetingId() != null) {
            boolean alreadyReported = reportRepository.existsByReporterIdAndMeetingId(
                    report.getReporterId(), report.getMeetingId()
            );

            if (alreadyReported) {
                throw new IllegalStateException("이미 신고한 모임입니다.");
            }
        }

        // 2. 통과되면 저장!
        return reportRepository.save(report).getReportId();
    }
}