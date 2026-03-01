# package.json 비교 분석 v2

> 기준: 제공된 참조 버전(v2) vs 현재 프로젝트 버전
> 작성일: 2026-03-01
> ※ v1 문서의 오류(참조에만 있는 패키지 누락, fontawesome6 분류 오류, devDependencies 차이 누락) 수정

---

## 요약

| 구분 | 수 |
|------|----|
| 동일한 패키지 | 7개 |
| 버전이 다른 패키지 | 4개 |
| 현재에만 있는 패키지 (신규 추가) | 12개 |
| 참조(v2)에만 있는 패키지 (현재에서 제거됨) | 5개 |

---

## 1. 동일한 패키지 (버전 완전 일치)

| 패키지명 | 버전 |
|----------|------|
| `@react-native-kakao/core` | ^2.4.4 |
| `@react-native-kakao/user` | ^2.4.4 |
| `@react-native-vector-icons/fontawesome6` | ^12.3.0 |
| `@react-native/new-app-screen` | 0.83.1 |
| `@react-navigation/native` | ^7.1.28 |
| `react` | 19.2.0 |
| `react-native` | 0.83.1 |

---

## 2. 버전이 다른 패키지 (둘 다 존재)

| 패키지명 | 참조(v2) | 현재 | 변경 방향 |
|----------|----------|------|-----------|
| `@react-navigation/native-stack` | ^7.10.1 | ^7.12.0 | ↑ 업그레이드 |
| `react-native-safe-area-context` | ^5.5.2 | ^5.6.2 | ↑ 업그레이드 |
| `react-native-screens` | ^4.20.0 | ^4.23.0 | ↑ 업그레이드 |
| `react-native-svg` | ^15.15.1 | ^15.15.3 | ↑ 패치 업그레이드 |

---

## 3. 현재에만 있는 패키지 (신규 추가됨)

| 패키지명 | 현재 버전 | 용도 |
|----------|-----------|------|
| `@gorhom/bottom-sheet` | ^5.2.8 | 바텀 시트 UI 컴포넌트 |
| `@gorhom/portal` | ^1.0.14 | 바텀 시트 의존성 (Portal 레이어) |
| `@mj-studio/react-native-naver-map` | ^2.7.0 | 네이버 지도 |
| `@react-native-community/geolocation` | ^3.4.0 | GPS 위치 정보 |
| `axios` | ^1.13.5 | HTTP 클라이언트 |
| `react-native-gesture-handler` | ^2.30.0 | 제스처 처리 (바텀 시트 의존성) |
| `react-native-keyboard-controller` | ^1.20.7 | 키보드 제어 |
| `react-native-keychain` | ^10.0.0 | 보안 토큰 저장 (Keychain/Keystore) |
| `react-native-loader-kit` | ^4.1.0 | 로딩 애니메이션 |
| `react-native-permissions` | ^5.4.4 | 권한 요청 (위치 등) |
| `react-native-reanimated` | ^4.2.1 | 애니메이션 (바텀 시트 의존성) |
| `react-native-worklets` | ^0.7.3 | Reanimated v4 의존성 |

---

## 4. 참조(v2)에만 있는 패키지 (현재에서 제거됨)

> ⚠️ v1 문서에서 "0개"로 잘못 기록된 항목

| 패키지명 | 참조(v2) 버전 | 비고 |
|----------|---------------|------|
| `@fortawesome/react-fontawesome` | ^3.1.1 | React용 FontAwesome (RN 전용 아님, 불필요하여 제거 추정) |
| `@react-native-vector-icons/fontawesome5` | ^12.3.0 | FontAwesome 5 아이콘 (fontawesome6로 통일) |
| `@react-navigation/bottom-tabs` | ^7.12.0 | 탭 내비게이터 (현재 사용 안 함) |
| `react-native-calendars` | ^1.1300.0 | 캘린더 UI (현재 사용 안 함) |
| `react-native-vector-icons` | ^10.3.0 | 범용 벡터 아이콘 (개별 패키지로 대체) |

---

## 5. devDependencies

> ⚠️ v1 문서에서 "완전 동일"로 잘못 기록. 실제로는 2곳 차이 있음

| 패키지명 | 참조(v2) | 현재 | 비고 |
|----------|----------|------|------|
| `@react-native/typescript-config` | `^0.83.1` | `0.83.1` | caret(^) 유무 차이 |
| `typescript` | `^5.9.3` | `^5.8.3` | ↓ 다운그레이드 (현재가 낮음) |

나머지 devDependencies는 완전 동일.

---

## 변경 흐름 요약

현재 프로젝트는 참조(v2) 대비 다음 방향으로 발전:

- **지도 기능 추가**: `naver-map`, `geolocation`, `permissions`
- **인증 보안 강화**: `keychain` (토큰 안전 저장)
- **UI 고도화**: `bottom-sheet`, `reanimated`, `gesture-handler`, `loader-kit`
- **네트워크 계층**: `axios`
- **정리/제거**: 사용하지 않는 `calendars`, `bottom-tabs`, 중복 아이콘 패키지 제거
- **TypeScript 버전**: v2보다 낮은 `^5.8.3` 사용 중 (`^5.9.3` 업그레이드 가능)
