package com.unilink.backend.domain.meeting;

import com.unilink.backend.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(
  name = "meeting_participants",
  uniqueConstraints = {
    @UniqueConstraint(name = "uk_meeting_participants_meeting_user", columnNames = {"meeting_id", "user_id"})
  },
  indexes = {
    @Index(name = "idx_meeting_participants_meeting", columnList = "meeting_id"),
    @Index(name = "idx_meeting_participants_user", columnList = "user_id"),
  }
)

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingParticipant {
  /* Enum 정의 */
  public enum Role {
    HOST, MEMBER
  }

  /* 기본키 */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /* meeting 테이블과 N:1 관계 지정 */
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "meeting_id", nullable =  false)
  private Meeting meeting;

  /* user 테이블과 N:1 관계 지정 */
  @ManyToOne(fetch = FetchType.LAZY, optional =  false)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  /* host와 member를 구분 */
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 10)
  private Role role;

  /* 참여 날짜 및 시각 */
  @Column(name = "joined_at", nullable = false)
  private Instant joinedAt;

  /* 기본 생성자 */
  private MeetingParticipant(Meeting meeting, User user, Role role, Instant joinedAt) {
    this.meeting = meeting;
    this.user = user;
    this.role = role;
    this.joinedAt = joinedAt;
  }

  public static MeetingParticipant create(Meeting meeting, User user, Role role) {
    if (meeting == null) throw new IllegalArgumentException("meeting is required");
    if (user == null) throw new IllegalArgumentException("user is required");
    if (role == null) throw new IllegalArgumentException("role is required");
    return new MeetingParticipant(meeting, user, role, Instant.now());
  }
}
