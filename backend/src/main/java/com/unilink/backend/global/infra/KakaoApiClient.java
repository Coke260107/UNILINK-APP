package com.unilink.backend.global.infra;

import com.unilink.backend.global.infra.dto.KakaoResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "kakaoClient", url = "https://kapi.kakao.com")
public interface KakaoApiClient {
    @PostMapping(value = "/v2/user/me",
            consumes = "application/x-www-form-urlencoded;charset=utf-8")
    KakaoResponseDto getUserKakaoId(@RequestHeader("Authorization") String accessToken);
}
