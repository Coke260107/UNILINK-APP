package com.unilink.backend.domain.user;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"kakao_id"})
        })
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "kakao_id", nullable = false)
    private Long kakaoId;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "image_url")
    private String profileImage;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private UserState state;

    @Column(name = "mbti")
    @Enumerated(EnumType.STRING)
    private Mbti mbti;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "introduction")
    private String introduction;

//    @Column(name="age")
//    연령 어떻게 할지 확정된 후 제작 예정

    @Column(name = "location")
    private String location;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

//    @Column(name = "last_login_at")
//    private LocalDateTime loginAt;

    @Builder
    public User(Long kakaoId) {
        this.kakaoId = kakaoId;
        state = UserState.GUEST;
    }

    public void updateProfile(String nickname, String profileImage, Mbti mbti, Gender gender,
                              String introduction, String location) {
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.mbti = mbti;
        this.gender = gender;
        this.introduction = introduction;
        this.location = location;
    }

    public void upgradeToUser() {
        this.state = UserState.USER;
    }

}
