package com.unilink.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
public class LoginRequestDto {
    @NotBlank(message = "[ERROR] 카카오 access 토큰은 필수입니다.")
    private String accessToken;
}
