package com.unilink.backend.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MeetingListResponse {
    private Long id;
    private String title;
    private String category;
    private String location;
    private boolean isClosed; // 모집 마감 여부 계산해서 전달
}