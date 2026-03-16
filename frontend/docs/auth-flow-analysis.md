# 회원가입 플로우 분석

> 분석 일자: 2026-02-28

---

## 전체 플로우 구조

```
LoginScreen → SetNicknameScreen → SetUserMetaDataScreen → SetLocationScreen → Register API
```

각 화면에서 수집한 데이터는 `AuthContext`의 `user` 상태에 `updateUserMetaData()`로 누적되며,
마지막 `SetLocationScreen`에서 `Register()` API를 호출해 서버에 전송하는 구조.

---

## 완성된 부분

- 각 화면의 UI 및 로컬 상태 관리
- `SetNicknameScreen`: 닉네임 중복 확인(`CheckNicknameDuplication`) 후 다음 이동
- `SetUserMetaDataScreen`: 성별 / MBTI / 나이 / 소개글 수집 후 다음 이동
- `SetLocationScreen`: 지도 + 역지오코딩(`ReverseGeocode`)으로 주소 확인 후 `Register()` 호출
- `AuthContext`: `user` 상태 + `updateUserMetaData`로 각 화면 간 데이터 누적

---

## 문제점 목록

### 🔴 치명적 버그 (동작 안 함)

#### 1. 삭제된 파일 import
- 파일: `SetNicknameScreen.tsx:23`, `SetUserMetaDataScreen.tsx:23`
- `src/types/navigationType.ts` 파일이 삭제되었으나 두 화면에서 여전히 import 중

```ts
// 잘못된 경로 (파일 삭제됨)
import { AuthStackParamList } from '../../types/navigationType';

// 올바른 경로
import { AuthStackParamList } from '../../types/util/navigationType';
```

#### 2. Register 호출 시 location이 빠짐
- 파일: `SetLocationScreen.tsx:98-110`
- `updateUserMetaData`는 React setState 기반이라 **비동기**로 동작함
- 즉시 아래에서 `user`를 읽으면 location이 반영되기 전의 **구버전 user**가 사용됨

```ts
// 현재 코드 (버그)
updateUserMetaData(location);      // setState → 아직 반영 안 됨
const data = await Register(user); // user에 location 없음

// 올바른 방법
const fullUserData = { ...user, location: address };
const data = await Register(fullUserData);
```

#### 3. Register 성공 후 처리 없음
- 파일: `SetLocationScreen.tsx:110-111`
- 회원가입 성공 후 `console.log(data)` 만 있고, 다음 화면으로 이동하거나 유저 상태를 바꾸는 로직이 없음

```ts
const data = await Register(user);
console.log(data); // ← 여기서 플로우가 끊김
// 메인 화면 이동 + AuthContext 상태 업데이트 필요
```

---

### 🟡 로직 미완성

#### 4. `AuthContext.login` 함수가 빈 함수
- 파일: `AuthContext.tsx:68`

```ts
const login = (token: string, state: UserState) => {}; // 미구현
```

회원가입/로그인 완료 후 앱 전체 인증 상태를 변경하는 핵심 함수인데 구현이 없음.
내부에서 `user` 상태 업데이트 + 네비게이션 처리가 필요함.

#### 5. LoginScreen이 기존 유저를 구분하지 않음
- 파일: `LoginScreen.tsx:54-56`
- 이미 가입된 유저(`userState === 'USER'`)도 항상 회원가입 플로우로 진입함

```ts
// 현재: 항상 SetNickname으로 이동
navigation.navigate('SetNickname');

// 필요한 분기 처리
if (data.state === 'GUEST') {
  navigation.navigate('SetNickname');
} else {
  // 메인 화면으로 이동
}
```

---

### 🟢 사소한 문제

#### 6. LoginScreen에서 중복 hook 호출 + 미사용 변수
- 파일: `LoginScreen.tsx:31-33`

```ts
// 현재: useAuth()를 두 번 호출, authLogin은 미사용
const { setUser } = useAuth();
const { login: authLogin } = useAuth();

// 개선
const { setUser, login: authLogin } = useAuth();
```

---

## 완성도 요약

| 단계 | 화면 | 상태 | 주요 문제 |
|------|------|------|-----------|
| 1 | LoginScreen | 🟡 미완성 | 기존 유저 분기 없음 |
| 2 | SetNicknameScreen | 🔴 오류 | 삭제된 파일 import |
| 3 | SetUserMetaDataScreen | 🔴 오류 | 삭제된 파일 import |
| 4 | SetLocationScreen | 🔴 버그 | Register에 location 미포함, 완료 후 처리 없음 |
| 5 | AuthContext | 🟡 미완성 | `login()` 함수 미구현 |

---

## 우선순위별 수정 순서

1. **import 경로 수정** (SetNicknameScreen, SetUserMetaDataScreen) — 빌드 오류
2. **SetLocationScreen Register 호출 로직** — 데이터 손실 버그
3. **Register 성공 후 화면 전환** — 플로우 완성
4. **AuthContext.login 구현** — 인증 상태 관리
5. **LoginScreen 기존 유저 분기** — 재로그인 처리
