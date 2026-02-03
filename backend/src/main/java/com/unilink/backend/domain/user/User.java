package com.unilink.backend.domain.user;

import com.unilink.backend.domain.user.enums.AgeRange;
import com.unilink.backend.domain.user.enums.Gender;
import com.unilink.backend.domain.user.enums.Mbti;
import com.unilink.backend.domain.user.enums.UserState;
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

    @Column(name = "age_range")
    @Enumerated(EnumType.STRING)
    private AgeRange age;

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
                              String introduction, AgeRange ageRange, String location) {
        if (nickname != null && !nickname.isBlank()) {
            this.nickname = nickname;
        }
        //profileImage는 일단 보류
        this.profileImage = profileImage;

        if (mbti != null) {
            this.mbti = mbti;
        }
        if (gender != null) {
            this.gender = gender;
        }
        if (introduction != null && !introduction.isBlank()) {
            this.introduction = introduction;
        }
        if (ageRange != null) {
            this.age = ageRange;
        }
        if (location != null && !location.isBlank()) {
            this.location = location;
        }
    }

    public void upgradeToUser() {
        this.state = UserState.USER;
    }

}
