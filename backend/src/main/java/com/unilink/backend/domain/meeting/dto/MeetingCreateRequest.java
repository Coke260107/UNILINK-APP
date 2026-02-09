package com.unilink.backend.domain.meeting.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
public class MeetingCreateRequest {
    private String title;
    private String category;
    private String description;
    private String location;
    private LocalDateTime recruitmentDeadline;
    private LocalDateTime meetingTime;
}
