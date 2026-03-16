package com.unilink.backend.domain.user.dto;

import com.unilink.backend.domain.user.enums.AgeRange;
import com.unilink.backend.domain.user.enums.Gender;
import com.unilink.backend.domain.user.enums.Mbti;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ProfileSaveRequestDto {
    @NotBlank(message = "[ERROR] 닉네임은 필수입니다.")
    @Size(min = 1, max = 20, message = "[ERROR] 닉네임은 1~10자여야 합니다.")
    private String nickname;
    private Gender gender;
    private Mbti mbti;
    private AgeRange age;
    @Size(max=100,message = "[ERROR] 소개서는 최대 100자까지 가능합니다.")
    private String introduction;
    private String location;
}
