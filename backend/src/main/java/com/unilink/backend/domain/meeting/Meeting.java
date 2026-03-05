package com.unilink.backend.domain.meeting;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "meeting")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long meetingId;

    private String category; // 모임 분류

    private Long hostId; // 주최자 ID

    private String title; // 모임 제목

    @Column(columnDefinition = "TEXT")
    private String introduction; // 상세 소개

    private Integer capacity; // 정원

    private Integer currentCnt; // 현인원 (성능 향상 목적)

    private String location; // 장소

    private LocalDateTime recruitDeadline; // 모집 마감

    private LocalDateTime meetingDate; // 모임 일시 (D-day)

    private Integer likeCnt; // 좋아요수 (성능 향상 목적)

    private String state; // 모집/종료 상태

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.currentCnt == null) this.currentCnt = 1;
        if (this.likeCnt == null) this.likeCnt = 0;
    }
}