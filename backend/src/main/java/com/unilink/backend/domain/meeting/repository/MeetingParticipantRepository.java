package com.unilink.backend.domain.meeting.repository;

import com.unilink.backend.domain.meeting.entity.MeetingParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface MeetingParticipantRepository extends JpaRepository<MeetingParticipant, Long> {

    // 특정 모임에 특정 유저가 있는지 확인
    Optional<MeetingParticipant> findByMeetingIdAndUserId(Long meetingId, Long userId);

    List<MeetingParticipant> findByMeetingId(Long meetingId); // 2번 기능: 참여자 목록 조회용
    // 특정 모임의 전체 참여자 수 조회
    long countByMeetingId(Long meetingId);

    // 특정 모임의 삭제 찬성자 수 조회
    long countByMeetingIdAndVoteForDeleteTrue(Long meetingId);

    // 모임 삭제 시 모든 참여자 정보 삭제
    void deleteByMeetingId(Long meetingId);

    boolean existsByMeetingIdAndUserId(Long meetingId, Long userId);
}