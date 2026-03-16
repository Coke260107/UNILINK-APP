package com.unilink.backend.global.jwt;

import com.unilink.backend.domain.user.User;
import com.unilink.backend.domain.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 프론트의 요청에 따른 1차 필터링 수행
     * jwt 토큰으로의 분리->토큰 유효성 검증->Authentication 객체 생성 및 등록->다음 필터링 순으로 진행
     *
     * @param request  프론트가 보내준 요청
     * @param response 필터링에 따른 프론트에게 보내줄 결과값
     * @param chain    다음 필터로 요청과 응답을 전달하기 위한 연결 고리
     * @throws IOException      입출력 처리 중 발생할 수 있는 에러(네트워크 끊김 등)
     * @throws ServletException 서블릿 사용 중, 발생할 수 있는 일반적 에러
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String token = resolveToken(httpRequest);

        if (token != null && jwtTokenProvider.validateToken(token)) {
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        chain.doFilter(request, response);
    }

    /**
     * 프론트의 요청값 중, jwt토큰에 해당하는 값으로 걸러내주는 메소드
     *
     * @param httpRequest 프론트에서의 요청값
     * @return 프론트가 보낸 jwt토큰
     */
    private String resolveToken(HttpServletRequest httpRequest) {
        String bearerToken = httpRequest.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
