// Report.java (실제 신고 내역)
package com.unilink.backend.domain.report;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId; // 신고 고유 ID

    private Long typeId; // 설계도의 type_id (어떤 사유인지)

    @Column(columnDefinition = "TEXT")
    private String detail; // 신고 상세 내용

    private Long reporterId; // 신고한 사람 ID
    private Long targetUserId; // 신고 당한 사람 ID

    private Long meetingId; // 피신고 모임 (없으면 Null)
    private Long boardId;   // 피신고 게시글 (없으면 Null)
    private Long commentId; // 피신고 댓글 (없으면 Null)

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}