package com.unilink.backend.domain.meeting.controller;

import com.unilink.backend.domain.meeting.dto.MeetingCreateRequest;
import com.unilink.backend.domain.meeting.entity.Meeting;
import com.unilink.backend.domain.meeting.entity.MeetingParticipant;
import com.unilink.backend.domain.meeting.service.MeetingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    // 모임 생성 (1번 기능 반영)
    @PostMapping("/{userId}")
    public ResponseEntity<Long> create(@RequestBody MeetingCreateRequest dto, @PathVariable Long userId) {
        return ResponseEntity.ok(meetingService.createMeeting(dto, userId));
    }

    // 참여자 목록 조회 (2번 기능 반영)
    @GetMapping("/{meetingId}/participants")
    public ResponseEntity<List<MeetingParticipant>> getParticipants(@PathVariable Long meetingId) {
        return ResponseEntity.ok(meetingService.getParticipants(meetingId));
    }

    @GetMapping // 검색 및 조회
    public ResponseEntity<List<Meeting>> search(@RequestParam(required = false) String category, @RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(meetingService.searchMeetings(category, keyword));
    }

    @PostMapping("/{meetingId}/join/{userId}") // 참여
    public ResponseEntity<Void> join(@PathVariable Long meetingId, @PathVariable Long userId) {
        meetingService.joinMeeting(meetingId, userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{meetingId}/vote/{userId}") // 삭제 투표
    public ResponseEntity<Void> vote(@PathVariable Long meetingId, @PathVariable Long userId) {
        meetingService.voteAndDelete(meetingId, userId);
        return ResponseEntity.ok().build();
    }
}