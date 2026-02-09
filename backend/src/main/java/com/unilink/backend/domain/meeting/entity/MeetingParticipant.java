package com.unilink.backend.domain.meeting.entity; // 반드시 포함해야 합니다!

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter // 투표 상태 변경 등을 위해 추가
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MeetingParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long meetingId;

    @Column(nullable = false)
    private Long userId;

    private boolean isHost;        // 방장 여부

    @Builder.Default
    private boolean voteForDelete = false; // 삭제 찬성 여부 (기본값 false)

    // 비즈니스 로직: 투표 상태 변경
    public void castDeleteVote() {
        this.voteForDelete = true;
    }
}