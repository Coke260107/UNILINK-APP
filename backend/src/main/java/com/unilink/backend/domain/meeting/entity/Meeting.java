package com.unilink.backend.domain.meeting.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category; // 식사, 운동, 게임, 스터디 등

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private String location; // 모임 장소

    @Column(nullable = false)
    private LocalDateTime recruitmentDeadline; // 모집 마감 날짜

    @Column(nullable = false)
    private LocalDateTime meetingTime;          // 모임 D-Day + 시간

    @Column(nullable = false)
    private LocalDateTime expiryTime;           // 모임 만료 시간 (D-Day + 1일)

    private Long creatorId;

    // --- 비즈니스 로직 ---

    /**
     * 모임 생성 시 만료 시간을 자동으로 계산하는 메서드
     * (기획: 모임 D-Day 날짜로부터 하루 후)
     */
    public void calculateExpiryTime() {
        if (this.meetingTime != null) {
            this.expiryTime = this.meetingTime.plusDays(1);
        }
    }

    /**
     * 수정 가능 여부 체크
     * (기획: 모임 D-Day 날짜로부터 하루 전까지만 수정 가능)
     */
    public boolean isEditable() {
        return LocalDateTime.now().isBefore(this.meetingTime.minusDays(1));
    }

    /**
     * 모임 나가기 가능 여부 체크
     * (기획: 모집 마감 날짜 전까지 가능)
     */
    public boolean canLeave() {
        return LocalDateTime.now().isBefore(this.recruitmentDeadline);
    }
}