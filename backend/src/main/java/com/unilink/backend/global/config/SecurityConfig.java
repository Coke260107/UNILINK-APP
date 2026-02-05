package com.unilink.backend.global.config;

import com.unilink.backend.domain.user.UserRepository;
import com.unilink.backend.global.jwt.JwtFilter;
import com.unilink.backend.global.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    /**
     * API 요청에 대한 보안 명세서
     * Cors 설정, HTTP Basic, Csrf, 세션(서버 저장X), jwt권한 설정
     *
     * @param http API 요청값
     * @return 해당 필터 다 통과한 요청값
     * @throws Exception 해당 필터에 걸러졌을 때의 에러값
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .httpBasic(httpBasic -> httpBasic.disable())    //자체 로그인 비활성화
                .csrf(csrf -> csrf.disable())   //프론트에서의 쿠키/세션 방식 자동 jwt탑재 비활성화
                .sessionManagement(session -> session   //서버 세션 비활성화
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll())
                .addFilterBefore(new JwtFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /**
     * cors값 설정(기존 WebConfig 설정값)
     *
     * @return cors 설정 적용된 source
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        /**
         * 요청 주소값 설정
         */
        configuration.setAllowedOriginPatterns(List.of("*"));

        //요청 방식 및 헤더, 쿠키, 인증정보 허용
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        //위에 cors값 설정 적용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
