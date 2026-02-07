package com.unilink.backend.global.jwt;

import com.unilink.backend.domain.user.enums.UserState;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private Key key;

    @PostConstruct
    protected void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(Long userId, UserState state) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + expiration);

        Claims claims = Jwts.claims().setSubject(userId.toString());
        claims.put("state", state.name());

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(expirationDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("잘못된 구조 or 서명값 불일치");
        } catch (ExpiredJwtException e) {
            log.error("토큰 유효기간 만료");
        } catch (IllegalArgumentException e) {
            log.error("토큰 null or 공백 or 빈 문자열");
        } catch (UnsupportedJwtException e) {
            log.error("지원 X 토큰");
        }
        return false;
    }

    public Authentication getAuthentication(String validToken) {
        Claims claims = getClaims(validToken);

        String userId = claims.getSubject();

        String role = claims.get("state").toString();
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.asList((new SimpleGrantedAuthority(role)));

        UserDetails principal = new User(userId, "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Long getUserId(String validToken) {
        String idString = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(validToken)
                .getBody()
                .getSubject();

        return Long.valueOf(idString);
    }
}
