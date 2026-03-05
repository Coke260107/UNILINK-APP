// ReportType.java (신고 유형 리스트)
package com.unilink.backend.domain.report;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ReportType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportTypeId; // 신고 유형 고유 ID

    private String typeContent; // 예: 욕설, 도배

    private String category; // 예: MEETING, BOARD, COMMENT
}