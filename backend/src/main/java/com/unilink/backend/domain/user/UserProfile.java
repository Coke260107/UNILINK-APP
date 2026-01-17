package com.unilink.backend.domain.user;

import jakarta.persistence.*;

@Entity
public class UserProfile {

  // Enum 정의
  public enum MBTI {
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

  // Table Column 정의
  @Id
  private Long id; // = user.id (외래키)

  @MapsId
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @Enumerated(EnumType.STRING)
  private MBTI mbti;

  @Enumerated(EnumType.STRING)
  private Gender gender; 
}