# 🔗 UNILINK

> 대학생을 위한 모임 매칭 모바일 애플리케이션

[![React Native](https://img.shields.io/badge/React%20Native-0.83.1-61DAFB?logo=react)](https://reactnative.dev/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.9-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Java](https://img.shields.io/badge/Java-17-007396?logo=openjdk)](https://openjdk.org/)

---

## 참고사항
- **기존 개발 명세서(기획서)는 docs 폴더로 이동함**

---

## 📌 프로젝트 소개

UNILINK는 공통 관심사를 가진 사람들과 모임을 만들고 참여할 수 있는 모바일 플랫폼입니다.
위치 기반 모임 탐색, 카카오 소셜 로그인, 실시간 채팅 등을 지원합니다.

---

## 🛠 기술 스택

### Frontend
| 분류 | 기술 |
|---|---|
| Framework | React Native 0.83.1 |
| Language | TypeScript 5.9.3 |
| Navigation | React Navigation (Native Stack, Bottom Tabs) |
| Map | Naver Map (@mj-studio/react-native-naver-map) |
| Auth | Kakao OAuth |
| HTTP | Axios |
| Animation | React Native Reanimated |

### Backend
| 분류 | 기술 |
|---|---|
| Framework | Spring Boot 3.5.9 |
| Language | Java 17 |
| DB | PostgreSQL / H2 (개발) |
| ORM | Spring Data JPA |
| Auth | Spring Security + JWT |
| External API | Kakao API (OAuth, 역지오코딩) |

---

## 📁 프로젝트 구조

``` PlainText
UNILINK-APP/
├── frontend/          # React Native 앱
│   └── src/
│       ├── screens/   # 화면 컴포넌트
│       ├── components/
│       ├── api/
│       └── navigation/
├── backend/           # Spring Boot 서버
│   └── src/main/java/
│       ├── user/
│       ├── location/
│       └── board/
└── docs/              # 설계 문서
```



---

## ✅ 구현 현황

### 아이콘 소개
- ✅ - 개발 완료
- 🚧 - 개발 중
- ❌ - 오류 및 개발 안 함

### 사용자 (인증)
- **Frontend**
    - ✅ - 화면 디자인
    - ✅ - 카카오 소셜 로그인
    - ✅ - 프로필 생성 (닉네임, 성별, MBTI, 연령대, 자기소개, 위치)
    - 🚧 - 프로필 이미지 업로드

### 홈 화면
- **Frontend**
    - ✅ - 화면 디자인
    - ❌ - 상단 모임 필터
    - ❌ - 인기 모임 기능
    - ❌ - 인기 게시물 기능
    - ❌ - 캘린더 기능

### 모임 화면
- **Frontend**
    - ✅ - 화면 디자인
    - ❌ - 모임 상세보기 기능
    - 🚧 - 모임 생성 기능
    - ❌ - 모임 검색 기능


---

## 📷 스크린샷

> 추가 예정

---

## 🚀 실행 방법
> 추가 예정

## 👥 팀원 및 역할
> 추가 예정

---

**참고:**
- `✅ 구현 현황` 체크박스는 실제 완료 여부에 맞게 조정
- 팀원 표에 이름 추가
- 스크린샷 준비되면 `docs/` 폴더에 넣고 경로 연결하면 됩니다