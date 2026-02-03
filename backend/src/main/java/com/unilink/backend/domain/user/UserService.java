package com.unilink.backend.domain.user;

import com.unilink.backend.domain.user.dto.LoginRequestDto;
import com.unilink.backend.domain.user.dto.LoginResponseDto;
import com.unilink.backend.global.infra.KakaoApiClient;
import com.unilink.backend.global.infra.dto.KakaoResponseDto;
import com.unilink.backend.global.jwt.JwtTokenProvider;
import feign.FeignException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final KakaoApiClient kakaoApiClient;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public LoginResponseDto logInWithKakao(LoginRequestDto request) {
        KakaoResponseDto kakaoResponse = null;
        try {
            kakaoResponse = kakaoApiClient.getUserKakaoId("Bearer " + request.getAccessToken());
        } catch (FeignException e) {
            log.error("통신 실패, 상태코드: {}, 메세지: {}", e.status(), e.contentUTF8());
            throw new IllegalArgumentException("카카오 통신 실패");
        }

        Long kakaoId = kakaoResponse.getKakaoId();

        User user = userRepository.findByKakaoId(kakaoId)
                .orElseGet(() -> {
                    User newUser = User.builder().kakaoId(kakaoId).build();
                    return userRepository.save(newUser);
                });

        String jwtToken = createJwtToken(user);

        return LoginResponseDto.from(user, jwtToken);
    }

    private String createJwtToken(User user) {
        return jwtTokenProvider.createToken(user.getUserId(), user.getState());
    }

}
