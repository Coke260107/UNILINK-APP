package com.unilink.backend.domain.user.dto;

import com.unilink.backend.domain.user.User;
import com.unilink.backend.domain.user.enums.AgeRange;
import com.unilink.backend.domain.user.enums.Gender;
import com.unilink.backend.domain.user.enums.Mbti;
import com.unilink.backend.domain.user.enums.UserState;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProfileEditResponseDto {
    private Long userId;
    private String nickname;
    private Gender gender;
    private Mbti mbti;
    private AgeRange age;
    private String introduction;
    private String location;

    public static ProfileEditResponseDto from(User user) {
        return ProfileEditResponseDto.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .mbti(user.getMbti())
                .age(user.getAge())
                .introduction(user.getIntroduction())
                .location(user.getLocation())
                .build();
    }
}
