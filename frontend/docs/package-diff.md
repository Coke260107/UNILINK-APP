# package.json 비교 분석

> 기준: 제공된 참조 버전 vs 현재 프로젝트 버전
> 작성일: 2026-03-01

---

## 요약

| 구분 | 수 |
|------|----|
| 현재에만 있는 패키지 (신규 추가) | 13개 |
| 버전이 다른 패키지 | 4개 |
| 동일한 패키지 | 6개 |
| 참조에만 있는 패키지 (현재에서 제거됨) | 0개 |

---

## 1. 신규 추가된 패키지 (현재 프로젝트에만 존재)

| 패키지명 | 현재 버전 | 용도 |
|----------|-----------|------|
| `@gorhom/bottom-sheet` | ^5.2.8 | 바텀 시트 UI 컴포넌트 |
| `@gorhom/portal` | ^1.0.14 | 바텀 시트 의존성 |
| `@mj-studio/react-native-naver-map` | ^2.7.0 | 네이버 지도 |
| `@react-native-community/geolocation` | ^3.4.0 | GPS 위치 정보 |
| `@react-native-vector-icons/fontawesome6` | ^12.3.0 | 아이콘 폰트 |
| `axios` | ^1.13.5 | HTTP 클라이언트 |
| `react-native-gesture-handler` | ^2.30.0 | 제스처 처리 (바텀 시트 의존성) |
| `react-native-keyboard-controller` | ^1.20.7 | 키보드 제어 |
| `react-native-keychain` | ^10.0.0 | 보안 토큰 저장 (Keychain/Keystore) |
| `react-native-loader-kit` | ^4.1.0 | 로딩 애니메이션 |
| `react-native-permissions` | ^5.4.4 | 권한 요청 (위치 등) |
| `react-native-reanimated` | ^4.2.1 | 애니메이션 (바텀 시트 의존성) |
| `react-native-worklets` | ^0.7.3 | Reanimated 의존성 |

---

## 2. 버전이 다른 패키지

| 패키지명 | 참조 버전 | 현재 버전 | 변경 방향 |
|----------|-----------|-----------|-----------|
| `@react-navigation/native-stack` | ^7.10.1 | ^7.12.0 | ↑ 업그레이드 |
| `react-native-safe-area-context` | ^5.5.2 | ^5.6.2 | ↑ 업그레이드 |
| `react-native-screens` | ^4.20.0 | ^4.23.0 | ↑ 업그레이드 |
| `react-native-svg` | ^15.15.1 | ^15.15.3 | ↑ 업그레이드 (패치) |

---

## 3. 동일한 패키지

| 패키지명 | 버전 |
|----------|------|
| `@react-native-kakao/core` | ^2.4.4 |
| `@react-native-kakao/user` | ^2.4.4 |
| `@react-native/new-app-screen` | 0.83.1 |
| `@react-navigation/native` | ^7.1.28 |
| `react` | 19.2.0 |
| `react-native` | 0.83.1 |

---

## 4. devDependencies

참조 버전과 현재 버전 **완전 동일**. 변경 사항 없음.

---

## 비고

- 현재 프로젝트는 **지도 기능** (`naver-map`, `geolocation`, `permissions`)과 **인증 보안** (`keychain`), **UI 개선** (`bottom-sheet`, `reanimated`) 관련 패키지가 대거 추가됨.
- `react-native-reanimated`, `react-native-gesture-handler`, `@gorhom/portal`은 `@gorhom/bottom-sheet`의 필수 의존성.
- `react-native-worklets`는 `react-native-reanimated` v4의 의존성.
