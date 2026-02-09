package com.unilink.backend.domain.meeting.service;

import com.unilink.backend.domain.meeting.dto.MeetingCreateRequest;
import com.unilink.backend.domain.meeting.entity.Meeting;
import com.unilink.backend.domain.meeting.entity.MeetingParticipant;
import com.unilink.backend.domain.meeting.repository.MeetingParticipantRepository;
import com.unilink.backend.domain.meeting.repository.MeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final MeetingParticipantRepository participantRepository;

    /**
     * 1번 기능: 모임 생성 (DTO 적용)
     */
    @Transactional
    public Long createMeeting(MeetingCreateRequest dto, Long userId) {
        // DTO -> Entity 변환
        Meeting meeting = Meeting.builder()
                .title(dto.getTitle())
                .category(dto.getCategory())
                .description(dto.getDescription())
                .location(dto.getLocation())
                .recruitmentDeadline(dto.getRecruitmentDeadline())
                .meetingTime(dto.getMeetingTime())
                .build();

        meeting.calculateExpiryTime();
        Meeting savedMeeting = meetingRepository.save(meeting);

        // 방장 추가
        MeetingParticipant host = MeetingParticipant.builder()
                .meetingId(savedMeeting.getId())
                .userId(userId)
                .isHost(true)
                .build();
        participantRepository.save(host);

        return savedMeeting.getId();
    }

    /**
     * 2번 기능: 참여자 목록 조회
     */
    public List<MeetingParticipant> getParticipants(Long meetingId) {
        return participantRepository.findByMeetingId(meetingId);
    }

    /**
     * 모임 수정
     */
    @Transactional
    public void updateMeeting(Long meetingId, Long userId) {
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow();
        checkIsHost(meetingId, userId);
        if (!meeting.isEditable()) {
            throw new IllegalStateException("수정 가능 시간이 지났습니다.");
        }
    }

    /**
     * 모임 참여
     */
    @Transactional
    public void joinMeeting(Long meetingId, Long userId) {
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow();
        if (LocalDateTime.now().isAfter(meeting.getRecruitmentDeadline())) {
            throw new IllegalStateException("모집이 마감되었습니다.");
        }
        if (participantRepository.existsByMeetingIdAndUserId(meetingId, userId)) {
            throw new IllegalStateException("이미 참여 중입니다.");
        }
        participantRepository.save(MeetingParticipant.builder()
                .meetingId(meetingId).userId(userId).isHost(false).build());
    }

    /**
     * 강제 퇴장
     */
    @Transactional
    public void kickParticipant(Long meetingId, Long hostId, Long targetUserId) {
        checkIsHost(meetingId, hostId);
        MeetingParticipant target = participantRepository.findByMeetingIdAndUserId(meetingId, targetUserId).orElseThrow();
        participantRepository.delete(target);
    }

    /**
     * 모임 나가기
     */
    @Transactional
    public void leaveMeeting(Long meetingId, Long userId) {
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow();
        if (LocalDateTime.now().isAfter(meeting.getRecruitmentDeadline())) {
            throw new IllegalStateException("마감 후에는 나갈 수 없습니다.");
        }
        MeetingParticipant p = participantRepository.findByMeetingIdAndUserId(meetingId, userId).orElseThrow();
        participantRepository.delete(p);
    }

    /**
     * 과반수 삭제 투표
     */
    @Transactional
    public void voteAndDelete(Long meetingId, Long userId) {
        MeetingParticipant p = participantRepository.findByMeetingIdAndUserId(meetingId, userId).orElseThrow();
        p.castDeleteVote();

        long total = participantRepository.countByMeetingId(meetingId);
        long agree = participantRepository.countByMeetingIdAndVoteForDeleteTrue(meetingId);

        if (agree > (total / 2)) {
            meetingRepository.deleteById(meetingId);
            participantRepository.deleteByMeetingId(meetingId);
        }
    }

    /**
     * 모임 검색
     */
    public List<Meeting> searchMeetings(String category, String keyword) {
        if (category != null && keyword != null) return meetingRepository.findByCategoryAndTitleContaining(category, keyword);
        if (category != null) return meetingRepository.findByCategory(category);
        if (keyword != null) return meetingRepository.findByTitleContaining(keyword);
        return meetingRepository.findAll();
    }

    private void checkIsHost(Long meetingId, Long userId) {
        MeetingParticipant p = participantRepository.findByMeetingIdAndUserId(meetingId, userId).orElseThrow();
        if (!p.isHost()) throw new IllegalStateException("방장이 아닙니다.");
    }
}