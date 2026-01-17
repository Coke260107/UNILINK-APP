package com.unilink.backend.domain.user;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(
  name = "users",
  uniqueConstraints =  {
    @UniqueConstraint(
      name = "uk_users_provider_provider_user_id",
      columnNames = {"provider", "provider_user_id"}
    )
  },
  indexes = {
    @Index(name = "idx_users_provider_user_id", columnList = "provider, provider_user_id"),
    @Index(name = "idx_users_email", columnList = "email")
  }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

  /* user table에 필요한 Enum 정의 */
  public enum Provider { KAKAO }
  public enum MBTI {}

  /* 기본키, 자동증가 */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  /* 로그인 방식 (네이버 추가 예정) */
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private Provider provider;

  @Column(name = "provider_user_id", nullable = false, length = 64)
  private String providerUserId;

  /* 이메일 */
  @Column(length = 200)
  private String email;

  /* 닉네임 */
  @Column(nullable = false, length = 60)
  private String nickname;

  /* 프로필 이미지 */
  @Column(name = "profile_image_url", length = 500)
  private String profileImageUrl;

  /* 계정 생성 시각 */
  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  /* 마지막 계정 정보 변경 시각 */
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  /* 마지막 로그인 시각 */
  @Column(name = "last_login_at")
  private Instant lastLoginAt;

  // ====================

  // 기본 생성자
  private User(Provider provider, String providerUserId, String email, String nickname, String profileImageUrl) {
    this.provider = provider;
    this.providerUserId = providerUserId;
    this.email = email;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }

  // 규칙?
  public static User kakao(String kakaoUserId, String email, String nickname, String profileImageUrl) {
    if (kakaoUserId == null || kakaoUserId.isBlank())
      throw new IllegalArgumentException("kakaoUserId is required");
    if (nickname == null || nickname.isBlank())
      throw new IllegalArgumentException("nickname is required");

    return new User(Provider.KAKAO, kakaoUserId, email, nickname, profileImageUrl);
  }

  /* 엔티티가 DB에 처음 저장(INSERT)되기 직전에 호출되는 라이프사이클 훅 */
  @PrePersist
  void onCreate() {
    Instant now = Instant.now();

    this.createdAt = now;
    this.updatedAt = now;
    this.lastLoginAt = now;
  }

  /* update 될 때 */
  @PreUpdate
  void onUpdate() {
    this.updatedAt = Instant.now();
  }
  
}
