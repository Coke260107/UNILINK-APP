# DB 스키마 설계도-V1 (2025/01/25)

---

## # 유의 사항

#### -1. 채팅 관련 테이블 설계 미진행

#### -2. 컬럼명 등은 참고용

#### -3. 참고 사항 붙어 있는 항목들은 하단에 참고사항 필독

#### -4. 컬럼 추가 및 삭제 시, 별도의 파일로 수정 사항 명시하여 기록할 것

---

## 1. User

| 구분 | 컬럼명           | 설명            | 비고                    |
|:---|:--------------|:--------------|:----------------------|
| PK | user_id       | 회원 고유 ID      | 자동 증가                 |
|    | kakao_id      | 카카오 제공 ID     | 고유 ID(중복 X)           |
|    | nickname      | 닉네임           |                       |
|    | image_url     | 프로필 사진 url    |                       |
|    | state         | 유저 상태 정보(정지?) | 보류(컬럼 확정 X)           |
|    | mbti          | MBTI          | MBTI 16 + 비공개 예정      |
|    | gender        | 성별            | 성별 2 + 비공개, 그 외 성별 예정 |
|    | introduction  | 사용자 상세 소개     |                       |
|    | age(_range)   | 사용자 연령 정보     | 연령대 or 연령 미정          |
|    | location      | 사용자 위치 정보     | 정확한 형식 확정 X           |
|    | created_at    | 사용자 계정 생성 시각  | 디버깅용                  |
|    | updated_at    | 프로필 업데이트 시각   | 디버깅용                  |
|    | last_login_at | 로그인 시각        | 디버깅용(컬럼 확정 X)         |

---

## 2. Meeting

| 구분 | 컬럼명              | 설명              | 비고                                |
|:---|:-----------------|:----------------|:----------------------------------|
| PK | meeting_id       | 모임 고유 ID        | 자동 증가                             |
|    | category         | 모임 분류           | ENUM?                             |
| FK | host_id          | 주최자             |                                   |
|    | title            | 모임 제목           |                                   |
|    | introduction     | 모임 상세 소개        |                                   |
|    | like_cnt         | 좋아요수            | 성능 향상 목적(참고 사항)                   |
|    | capacity         | 정원수             |                                   |
|    | current_cnt      | 현인원수            | 성능 향상 목적(참고 사항)                   |
|    | location         | 모임 장소           |                                   |
|    | recruit_deadline | 모집 마감           |                                   |
|    | meeting_date     | 모임 dday         |                                   |
|    | created_at       | 모임 생성 시각        | 디버깅용                              |
|    | updated_at       | 모임 업데이트 시각      | 디버깅용                              |
|    | state            | 모임 상태(모집/종료...) | 컬럼 확정 X(활성화된 모임만 조회하기 위해 필요할 수도?) |

---

## 3. MeetingParticipant

| 구분 | 컬럼명            | 설명        | 비고    |
|:---|:---------------|:----------|:------|
| PK | participant_id | 지원서 고유 ID | 자동 증가 |
| FK | meeting_id     | 지원 모임     |       |
| FK | user_id        | 지원자       |       |
|    | role           | 방장 or 참여자 | ENUM? |
|    | created_at     | 지원 시각     | 디버깅용  |

---

## 4. Board

| 구분 | 컬럼명        | 설명          | 비고                   |
|:---|:-----------|:------------|:---------------------|
| PK | board_id   | 게시글 고유 ID   | 자동 증가                |
|    | category   | 자유/홍보       | ENUM?                |
|    | title      | 제목          |                      |
|    | content    | 게시글 내용      |                      |
| FK | author_id  | 작성자         |                      |
|    | like_cnt   | 좋아요수        | 성능 향상 목적(참고 사항)      |
| FK | meeting_id | 홍보글 해당 미팅   | 홍보글 한정(자유 게시글은 Null) |
|    | created_at | 게시글 생성 시각   | 디버깅용                 |
|    | updated_at | 게시글 업데이트 시각 | 디버깅용                 |

---

## 5. Comment

| 구분 | 컬럼명        | 설명       | 비고              |
|:---|:-----------|:---------|:----------------|
| PK | comment_id | 댓글 고유 ID | 자동 증가           |
| FK | board_id   | 게시글 ID   |                 |
| FK | user_id    | 작성자 ID   |                 |
|    | role       | 글쓴이/그외   | ENUM?(참고 사항)    |
|    | content    | 게시글 내용   |                 |
|    | like_cnt   | 좋아요수     | 성능 향상 목적(참고 사항) |
|    | created_at | 댓글 생성 시각 | 디버깅용            |

---

## 6. BoardLike

| 구분 | 컬럼명        | 설명        | 비고    |
|:---|:-----------|:----------|:------|
| PK | like_id    | 좋아요 고유 ID | 자동 증가 |
| FK | board_id   | 게시글 ID    |       |
| FK | user_id    | 누른 사람 ID  |       |
|    | created_at | 좋아요 생성 시각 | 디버깅용  |

---

## 7. MeetingLike

| 구분 | 컬럼명        | 설명        | 비고    |
|:---|:-----------|:----------|:------|
| PK | like_id    | 좋아요 고유 ID | 자동 증가 |
| FK | meeting_id | 모임 ID     |       |
| FK | user_id    | 누른 사람 ID  |       |
|    | created_at | 좋아요 생성 시각 | 디버깅용  |

---

## 8. CommentLike

| 구분 | 컬럼명        | 설명        | 비고    |
|:---|:-----------|:----------|:------|
| PK | like_id    | 좋아요 고유 ID | 자동 증가 |
| FK | comment_id | 댓글 ID     |       |
| FK | user_id    | 누른 사람 ID  |       |
|    | created_at | 좋아요 생성 시각 | 디버깅용  |

---

## 9. ReportType(참고 사항)

| 구분 | 컬럼명            | 설명          | 비고    |
|:---|:---------------|:------------|:------|
| PK | report_type_id | 신고 유형 고유 ID | 자동 증가 |
|    | type_content   | 항목별 세부 유형   |       |
|    | category       | 항목 카테고리     | ENUM? |
|    | created_at     | 유형 생성 시각    | 디버깅용  |

---

## 10. Report(참고 사항)

| 구분 | 컬럼명            | 설명       | 비고       |
|:---|:---------------|:---------|:---------|
| PK | report_id      | 신고 고유 ID | 자동 증가    |
| FK | type_id        | 신고 유형 ID |          |
|    | detail         | 신고 상세 내용 |          |
| FK | reporter_id    | 신고자      |          |
| FK | target_user_id | 피신고자     |          |
| FK | meeting_id     | 피신고 모임   | Nullable |
| FK | board_id       | 피신고 게시글  | Nullable |
| FK | comment_id     | 피신고 댓글   | Nullable |

---

## # 참고 사항

### 2. Meeting 관련

-1. like_cnt: Like 테이블을 전체 조회함으로써, 카운트 가능하지만, 성능 향상을 위해 Meeting 필드로 추가

* 좋아요수 수정되는 로직에서 Like 테이블과 충돌나지 않게, 조작할 것

-2. current_cnt: MeetingParticipant 테이블을 전체 조회함으로써, 카운트 가능하지만, 성능 향상을 위해 Meeting 필드로 추가

* 모임 참가 등 현재 인원이 수정되는 로직에서 MeetingParticipant와 충돌나지 않게, 조작할 것
* 락 기술 등을 사용하여 동시성 문제 해결 필요(인원 제한 준수 목적)

### 3. MeetingParticipant 관련

-1. 모임에 대한 중복 지원 막는 로직 필요

### 4. Board 관련

-1. like_cnt: Like 테이블을 전체 조회함으로써, 카운트 가능하지만, 성능 향상을 위해 Board 필드로 추가

* 좋아요수 수정되는 로직에서 Like 테이블과 충돌나지 않게, 조작할 것

### 5. Comment 관련

-1. role: 일단 임의로 추가

* 개발단계에서 (comment.user_id == board.user_id) 등을 통해 성능저하 없이 가능하면 제거할 것

-2. like_cnt: Like 테이블을 전체 조회함으로써, 카운트 가능하지만, 성능 향상을 위해 Comment 필드로 추가

* 좋아요수 수정되는 로직에서 Like 테이블과 충돌나지 않게, 조작할 것

### 6, 7, 8. Like 관련

-1. 여러 항목에 대한 좋아요를 하나의 테이블로 관리 시, 고유값 설정(Unique 관련) 복잡해져, 유형별로 3개의 독립된 테이블로 분리

### 9, 10. Report 관련

#### -1. ReportType

* 읽기 전용 테이블로, DB에 항목을 넣은 후, 사용할 것
* category: 게시글/모임/댓글 중, 어떠한 것에 대한 대분류 목적
* type_content: category에 따른 세부적 소분류 목적

Ex. 모임에서 신고

* category->board
* type_content
    * 도배
    * 욕설

#### -2. Report

실제 신고서 관리

* Like와 별개로, 사용량이 많지 않기 떄문에, 하나의 테이블로 통합
    * => 로직 설계시, 코드로 중복 처리 신경 써서 할 것
        * 모임 신고->피신고모임, 신고자...
        * 게시글 신고->피신고글, 신고자...
        * 댓글 신고->피신고댓글, 신고자...

#### -3. ReportType, Report 연관 예시 (상세 필드 생략)

모임에서 신고->모임 항목에 대한 신고 카테고리 요청->ReportType의 PK를 통해 Report에 저장

```text
//1. 모임 항목에 대한 신고 카테고리 응답
    [
    { "id": 1, "type_content": "도배" },
    { "id": 5, "type_content": "욕설" },
    ]
    
//2. 신고
    {
    "typeId": 5,  //욕설
    "detail": "~~~"
    }
```