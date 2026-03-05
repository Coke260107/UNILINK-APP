package com.unilink.backend.service;

import com.unilink.backend.domain.meeting.Meeting;
import com.unilink.backend.repository.MeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // 데이터 조회 시 성능 최적화
public class MeetingService {

    private final MeetingRepository meetingRepository;

    /**
     * 모임 생성 기능
     */
    @Transactional // 데이터가 바뀌는 작업은 이 어노테이션이 필수예요!
    public Long createMeeting(Meeting meeting) {
        Meeting savedMeeting = meetingRepository.save(meeting);
        return savedMeeting.getMeetingId();
    }

    /**
     * 모임 전체 목록 조회 기능
     */
    public List<Meeting> findAllMeetings() {
        return meetingRepository.findAll();
    }
}