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
  public enum UserState { GUEST, USER, BANNED }
  public enum MBTI {
      PRIVATE,
      ENFJ, ENFP, ENTJ, ENTP,
      ESFJ, ESFP, ESTJ, ESTP,
      INFJ, INFP, INTJ, INTP,
      ISFJ, ISFP, ISTJ, ISTP,
  }
  public enum Gender {
    PRIVATE,
    MALE,
    FEMALE,
    OTHER,
  }

  /* 기본키, 자동증가 */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  /* 유저 상태 */
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private UserState state;

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

  /* MBTI */
  @Column(nullable = false, length = 20)
  @Enumerated(EnumType.STRING)
  private MBTI mbti;

  /* 성별 */
  @Column(nullable = false, length = 20)
  @Enumerated(EnumType.STRING)
  private Gender gender;

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

  /**
   * User 기본 생성자
   * 
   * @param provider        인증 제공자
   * @param providerUserId  사용자 식별 번호
   * @param email           이메일
   * @param nickname        닉네임 
   * @param mbti            mbti
   * @param gender          성별
   * @param profileImageUrl 프로필 이미지
   */
  private User(Provider provider, String providerUserId, String email, String nickname, MBTI mbti, Gender gender, String profileImageUrl) {
    this.provider = provider;
    this.providerUserId = providerUserId;
    this.email = email;
    this.nickname = nickname;
    this.mbti = mbti;
    this.gender = gender;
    this.profileImageUrl = profileImageUrl;
  }

  /**
   * Kakao 인증 규칙
   * 
   * @param kakaoUserId     카카오 고유 사용자 번호
   * @param email           이메일
   * @param nickname        닉네임
   * @param mbti            mbti
   * @param gender          성별
   * @param profileImageUrl 프로필 이미지
   * @return
   */
  public static User kakao(String kakaoUserId, String email, String nickname, MBTI mbti, Gender gender, String profileImageUrl) {
    if (kakaoUserId == null || kakaoUserId.isBlank())
      throw new IllegalArgumentException("kakaoUserId is required");
    if (nickname == null || nickname.isBlank())
      throw new IllegalArgumentException("nickname is required");
    if (mbti == null) mbti = MBTI.PRIVATE;
    if (gender == null) gender = Gender.PRIVATE;
      
    return new User(Provider.KAKAO, kakaoUserId, email, nickname, mbti, gender, profileImageUrl);
  }

  /**
   * User 프로필 업데이트
   * 
   * @param nickname          닉네임
   * @param mbti              mbti
   * @param gender            성별
   * @param profileImageUrl   프로필 이미지
   */
  public void updateProfile(String nickname, MBTI mbti, Gender gender, String profileImageUrl) {
    if (nickname != null && !nickname.isBlank()) this.nickname = nickname;
    if (mbti != null) this.mbti = mbti;
    if (gender != null) this.gender = gender;
    if (profileImageUrl != null) this.profileImageUrl = profileImageUrl;
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
