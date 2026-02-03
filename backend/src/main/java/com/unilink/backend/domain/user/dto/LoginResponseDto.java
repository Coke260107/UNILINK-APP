package com.unilink.backend.domain.user.dto;

import com.unilink.backend.domain.user.User;
import com.unilink.backend.domain.user.enums.UserState;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponseDto {
    private Long userId;
    private Long kakaoId;
    private UserState state;

    public static LoginResponseDto from(User user) {
        return LoginResponseDto.builder()
                .userId(user.getUserId())
                .kakaoId(user.getKakaoId())
                .state(user.getState())
                .build();
    }
}
