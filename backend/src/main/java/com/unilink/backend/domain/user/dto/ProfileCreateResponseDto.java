package com.unilink.backend.domain.user.dto;

import com.unilink.backend.domain.user.User;
import com.unilink.backend.domain.user.enums.AgeRange;
import com.unilink.backend.domain.user.enums.Gender;
import com.unilink.backend.domain.user.enums.Mbti;
import com.unilink.backend.domain.user.enums.UserState;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileCreateResponseDto {
    Long userId;
    String nickname;
    Gender gender;
    Mbti mbti;
    AgeRange age;
    String introduction;
    String location;
    UserState userState;
    String jwtTokenRoleUser;

    public static ProfileCreateResponseDto from(User user, String token) {
        return ProfileCreateResponseDto.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .mbti(user.getMbti())
                .age(user.getAge())
                .introduction(user.getIntroduction())
                .location(user.getLocation())
                .userState(user.getState())
                .jwtTokenRoleUser(token)
                .build();
    }

}
