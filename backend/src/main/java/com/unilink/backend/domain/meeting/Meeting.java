package com.unilink.backend.domain.meeting;

import com.unilink.backend.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table (
  name = "meetings",
  indexes = {
    @Index(name = "idx_meetings_category", columnList = "category"),
    @Index(name = "idx_meetings_host", columnList = "host_user_id"),
    @Index(name = "idx_meetings_expire_at", columnList = "expire_at"),
  }
)

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Meeting {
  /* Enum 정의 */
  public enum Category {
    STUDY, GAME, MEAL, EXERCISE
  }

  /* 기본키 */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /* 카테고리 */
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private Category category;

  /* 모임 제목 */
  @Column(nullable = false, length = 200)
  private String title;

  /* 모임 방장 */
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "host_user_id", nullable = false)
  private User host;

  /* 모임 좋아요 개수 */
  @Column(name = "like_count", nullable = false)
  private int likeCount;

  /* 모임 정원 */
  @Column(name = "max_member", nullable = false)
  private int maxMember;

  /* 현재 모임 참여자 수 */
  @Column(name = "cur_member", nullable = false)
  private int curMember;

  /* 모임 만료 날짜 + 시각 */
  @Column(name = "expire_at", nullable = false)
  private Instant expireAt;

  /* 모임 참여자를 모임 테이블과 1:N 관계로 지정*/
  @OneToMany(
    mappedBy = "meeting",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  private final List<MeetingParticipant> participants = new ArrayList<>();

  /**
   * 모임 기본 생성자
   * 
   * @param category    카테고리
   * @param title       제목
   * @param host        방장
   * @param maxMember   최대 참여자
   * @param expireAt    만료 날짜 및 시각
   */
  public Meeting(Category category, String title, User host, int maxMember, Instant expireAt) {
    this.category = category;
    this.title = title;
    this.host = host;
    this.maxMember = maxMember;
    this.expireAt = expireAt;
    this.likeCount = 0;

    // 정책: host는 생성 시 자동 참가 + curMember = 1
  }
}
