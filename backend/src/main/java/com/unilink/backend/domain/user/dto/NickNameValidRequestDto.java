package com.unilink.backend.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NickNameValidRequestDto {
    @NotBlank(message = "[ERROR] 닉네임은 필수입니다.")
    private String nickname;
}
