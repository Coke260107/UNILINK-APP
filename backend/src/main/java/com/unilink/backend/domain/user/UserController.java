package com.unilink.backend.domain.user;

import com.unilink.backend.domain.user.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<LoginResponseDto> kakaoLogIn(@Valid @RequestBody LoginRequestDto request) {
        LoginResponseDto response = userService.logInWithKakao(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/profile")
    public ResponseEntity<ProfileCreateResponseDto> createProfile(@AuthenticationPrincipal Long userId,
                                                                  @Valid @RequestBody ProfileSaveRequestDto request) {
        ProfileCreateResponseDto response = userService.createProfile(userId, request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping(value = "/profile")
    public ResponseEntity<ProfileEditResponseDto> editProfile(@AuthenticationPrincipal Long userId,
                                                              @Valid @RequestBody ProfileSaveRequestDto request) {
        ProfileEditResponseDto response = userService.editProfile(userId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/duplicate")
    public ResponseEntity<NickNameValidResponseDto> checkDuplicate(@AuthenticationPrincipal Long userId,
                                                                   @Valid @ModelAttribute NickNameValidRequestDto request) {
        NickNameValidResponseDto response = userService.checkNicknameDuplicate(userId, request);
        return ResponseEntity.ok(response);
    }
}
