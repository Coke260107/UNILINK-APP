package com.unilink.backend.controller;

import com.unilink.backend.domain.report.Report;
import com.unilink.backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports") // 이 주소로 요청을 보내면 신고가 접수
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    /**
     * 신고 접수 API (POST 주소: http://localhost:8080/api/reports)
     */
    @PostMapping
    public Long create(@RequestBody Report report) {
        // 우리 서비스의 '이미 신고했는지 체크하는 로직'을 실행
        return reportService.createReport(report);
    }
}