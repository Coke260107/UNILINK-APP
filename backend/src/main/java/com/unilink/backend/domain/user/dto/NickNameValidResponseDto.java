package com.unilink.backend.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class NickNameValidResponseDto {
    private boolean isValid;

    public static NickNameValidResponseDto from(boolean isValid) {
        return NickNameValidResponseDto.builder().isValid(isValid).build();
    }
}
