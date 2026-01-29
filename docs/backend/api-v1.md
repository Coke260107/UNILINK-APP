# 2026-01-29
# 주의사항
1. API 이름은 임의로 작성해둔 것이므로 변경 가능하다.
2. 필요한 제공값과 반환값이 있으면 작성(및 수정) 후 해당 기능을 맡은 사람에게 연락한다. 
3. 제공값과 반환값은 다음과 같이 표기한다.
	- `변수명: 타입`
4. 제공값: `frontend -> backend`
5. 반환값: `backend -> frontend`
6. *기울임*으로 표시된 값은 `Enum`으로 하단을 참고한다.
# 첫 화면 (로그인 / 회원가입)
## 화면 이미지
<img width="485" height="1031" alt="스크린샷 2026-01-29 205950" src="https://github.com/user-attachments/assets/8c980bec-b773-4930-860d-e53deb3617a5" />

## API
### `Login`
- **제공값**
	- `accessToken: string`
	- `idToken: string`
- **반환값**
	- *`userRole: UserRole`*
	- `jwt: string`

---
# 이름(닉네임) 설정 화면 (회원가입_1)
## 화면 이미지
<img width="490" height="1033" alt="스크린샷 2026-01-29 210650" src="https://github.com/user-attachments/assets/273bcaed-2dfb-4bf9-b8c4-dc5ce3c48f83" />

## API
### `CheckNickname`
- **제공값**
	- `nickname: string` (최대 20자)
- **반환값**
	- `isValid: boolean`

---
# 프로필 생성 화면 (회원가입_2)
## 화면 이미지
<img width="484" height="1031" alt="Pasted image 20260129214403" src="https://github.com/user-attachments/assets/2311daae-c38b-428b-9381-76e880266378" />

## API
### `CreateProfile`
- **제공값**
	- `nickname: string`
	- *`gender: GenderType`*
	- *`mbti: MbtiType`*
	- *`age: AgeType`*
	- `introduction: string` (최대 100자)
- **반환값** 
	- 추가 예정

---
# Enum
## *`UserRole`*
``` ts
// UserRole //
type UserRole = 'Guest' | 'User' | 'Banned';
```
## *`GenderType`*
``` ts
// GenderType //
type GenderType = 'MALE' | 'FEMALE' | 'OTHER' | 'PRIVATE';
```
## *`MbtiType`*
``` ts
// MbtiType //
type MbtiType = 
	| 'ENFJ' | 'ENFP' | 'ENTJ' | 'ENTP'  
	| 'ESFJ' | 'ESFP' | 'ESTJ' | 'ESTP'  
	| 'INFJ' | 'INFP' | 'INTJ' | 'INTP' 
	| 'ISFJ' | 'ISFP' | 'ISTJ' | 'ISTP'
	| 'PRIVATE';
```
## *`AgeType`*
``` ts
// AgeType //
type AgeType =
	| 'AGE_10'
	| 'AGE_20'
	| 'AGE_30'
	| 'AGE_40'
	| 'AGE_50'
	| 'AGE_60'
	| 'PRIVATE';
```
