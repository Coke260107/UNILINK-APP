package com.unilink.backend.controller;

import com.unilink.backend.domain.meeting.Meeting;
import com.unilink.backend.service.MeetingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings") // 이 API의 기본 주소를 설정해요
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    /**
     * 모임 등록 API (POST 주소: http://localhost:8080/api/meetings)
     */
    @PostMapping
    public Long create(@RequestBody Meeting meeting) {
        return meetingService.createMeeting(meeting);
    }

    /**
     * 전체 모임 조회 API (GET 주소: http://localhost:8080/api/meetings)
     */
    @GetMapping
    public List<Meeting> list() {
        return meetingService.findAllMeetings();
    }
}