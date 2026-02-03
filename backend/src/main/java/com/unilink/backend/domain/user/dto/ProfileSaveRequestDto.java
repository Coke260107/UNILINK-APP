package com.unilink.backend.domain.user.dto;

import com.unilink.backend.domain.user.enums.AgeRange;
import com.unilink.backend.domain.user.enums.Gender;
import com.unilink.backend.domain.user.enums.Mbti;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ProfileSaveRequestDto {
    String nickname;
    Gender gender;
    Mbti mbti;
    AgeRange age;
    String introduction;
    String location;
}
