# react-native-calendars 사용 가이드

> 공식 문서: https://wix.github.io/react-native-calendars
> GitHub: https://github.com/wix/react-native-calendars

---

## 설치

```bash
yarn add react-native-calendars
# 또는
npm install react-native-calendars
```

> 순수 JavaScript 라이브러리로 네이티브 링킹 불필요.

---

## 제공 컴포넌트

| 컴포넌트 | 설명 |
|---|---|
| `Calendar` | 기본 월 단위 달력 |
| `CalendarList` | 여러 달을 스크롤하는 달력 |
| `Agenda` | 달력 + 일정 목록 뷰 |

---

## 1. Calendar (기본 달력)

### 기본 사용법

```tsx
import { Calendar } from 'react-native-calendars';

<Calendar
  onDayPress={day => console.log('선택한 날짜', day)}
/>
```

`onDayPress`에서 받는 `day` 객체 형태:
```ts
{
  dateString: '2025-03-03',  // 'YYYY-MM-DD'
  day: 3,
  month: 3,
  year: 2025,
  timestamp: 1740960000000
}
```

### 주요 Props

| Prop | 타입 | 설명 |
|---|---|---|
| `current` | `string` | 표시할 달 (`'2025-03-01'`) |
| `initialDate` | `string` | 초기 표시 달 |
| `minDate` | `string` | 선택 가능한 최소 날짜 |
| `maxDate` | `string` | 선택 가능한 최대 날짜 |
| `firstDay` | `number` | 주 시작 요일 (`0`=일, `1`=월) |
| `hideExtraDays` | `boolean` | 현재 달이 아닌 날짜 숨기기 |
| `showWeekNumbers` | `boolean` | 주차 번호 표시 |
| `enableSwipeMonths` | `boolean` | 스와이프로 달 이동 |
| `markedDates` | `object` | 날짜 마킹 데이터 |
| `onDayPress` | `function` | 날짜 선택 이벤트 |
| `onMonthChange` | `function` | 달 변경 이벤트 |
| `onPressArrowLeft` | `function` | 왼쪽 화살표 클릭 커스텀 핸들러 |
| `onPressArrowRight` | `function` | 오른쪽 화살표 클릭 커스텀 핸들러 |
| `theme` | `object` | 스타일 커스터마이징 |

---

## 2. 날짜 마킹 (markedDates)

모든 마킹은 `markedDates` prop에 `{ 'YYYY-MM-DD': { ...옵션 } }` 형태로 전달.

### 2-1. Simple Marking (단순 선택)

```tsx
<Calendar
  markedDates={{
    '2025-03-03': { selected: true, selectedColor: '#00adf5' },
    '2025-03-05': { marked: true, dotColor: 'red' },
    '2025-03-07': { selected: true, marked: true, dotColor: 'white' },
  }}
/>
```

| 키 | 설명 |
|---|---|
| `selected` | 날짜를 선택된 상태로 표시 |
| `selectedColor` | 선택된 날짜 배경색 |
| `marked` | 날짜 아래 점 표시 |
| `dotColor` | 점 색상 |
| `disabled` | 날짜 비활성화 |

### 2-2. Multi-Dot Marking (여러 점)

```tsx
<Calendar
  markingType="multi-dot"
  markedDates={{
    '2025-03-03': {
      dots: [
        { key: 'gym', color: 'blue' },
        { key: 'study', color: 'red' },
      ],
      selected: true,
    },
  }}
/>
```

### 2-3. Period Marking (기간 범위)

```tsx
<Calendar
  markingType="period"
  markedDates={{
    '2025-03-01': { startingDay: true, color: '#50cebb', textColor: 'white' },
    '2025-03-02': { color: '#70d7c7', textColor: 'white' },
    '2025-03-03': { endingDay: true, color: '#50cebb', textColor: 'white' },
  }}
/>
```

| 키 | 설명 |
|---|---|
| `startingDay` | 기간 시작일 (왼쪽 반원) |
| `endingDay` | 기간 종료일 (오른쪽 반원) |
| `color` | 배경색 |
| `textColor` | 날짜 글자 색상 |

### 2-4. Multi-Period Marking (여러 기간 범위)

```tsx
<Calendar
  markingType="multi-period"
  markedDates={{
    '2025-03-03': {
      periods: [
        { startingDay: true, endingDay: false, color: 'green' },
        { startingDay: false, endingDay: true, color: 'blue' },
      ],
    },
  }}
/>
```

---

## 3. 테마 커스터마이징

```tsx
<Calendar
  theme={{
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',

    // 헤더
    monthTextColor: '#333333',
    arrowColor: '#00adf5',
    textMonthFontSize: 16,
    textMonthFontWeight: 'bold',

    // 요일 헤더
    textSectionTitleColor: '#b6c1cd',
    textDayHeaderFontSize: 12,

    // 날짜
    dayTextColor: '#2d4150',
    textDayFontSize: 14,

    // 오늘
    todayTextColor: '#00adf5',
    todayBackgroundColor: '#e8f4ff',

    // 선택된 날짜
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',

    // 비활성화된 날짜
    textDisabledColor: '#d9e1e8',
  }}
/>
```

---

## 4. CalendarList (스크롤 달력)

여러 달을 세로/가로로 스크롤하는 달력.

```tsx
import { CalendarList } from 'react-native-calendars';

<CalendarList
  pastScrollRange={12}       // 과거 몇 달까지
  futureScrollRange={12}     // 미래 몇 달까지
  horizontal={false}         // 세로 스크롤
  showScrollIndicator={true}
  onVisibleMonthsChange={months => console.log(months)}
/>
```

### 가로 스크롤 설정

```tsx
<CalendarList
  horizontal={true}
  pagingEnabled={true}
  calendarWidth={360}        // 화면 너비에 맞게 조정
  staticHeader={true}        // 헤더 고정
/>
```

### 주요 Props

| Prop | 타입 | 설명 |
|---|---|---|
| `pastScrollRange` | `number` | 과거 스크롤 가능 달 수 |
| `futureScrollRange` | `number` | 미래 스크롤 가능 달 수 |
| `calendarHeight` | `number` | 캘린더 아이템 높이 |
| `calendarWidth` | `number` | 가로 모드 시 아이템 너비 |
| `horizontal` | `boolean` | 가로 스크롤 여부 |
| `pagingEnabled` | `boolean` | 페이징 활성화 |
| `staticHeader` | `boolean` | 헤더 고정 (가로 모드 전용) |
| `showScrollIndicator` | `boolean` | 스크롤바 표시 |
| `onVisibleMonthsChange` | `function` | 보이는 달 변경 이벤트 |

> Calendar의 모든 Props도 그대로 사용 가능.

---

## 5. 한국어 로케일 설정

```tsx
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월',
  ],
  monthNamesShort: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월',
  ],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'ko';
```

> 이 설정은 앱 진입점(예: `App.tsx`) 또는 해당 컴포넌트 파일 최상단에서 한 번만 호출.

---

## 6. 날짜 범위 선택 패턴 (커스텀 구현)

라이브러리 자체에는 범위 선택 UI가 없으므로, `period` 마킹과 상태 관리를 조합해서 구현.

```tsx
const [startDate, setStartDate] = useState<string | null>(null);
const [endDate, setEndDate] = useState<string | null>(null);

const getMarkedDates = () => {
  if (!startDate) return {};
  if (!endDate) return { [startDate]: { startingDay: true, endingDay: true, color: '#00adf5' } };

  const marked: Record<string, any> = {};
  let current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0];
    marked[dateStr] = {
      startingDay: dateStr === startDate,
      endingDay: dateStr === endDate,
      color: '#00adf5',
      textColor: 'white',
    };
    current.setDate(current.getDate() + 1);
  }
  return marked;
};

const handleDayPress = (day: { dateString: string }) => {
  if (!startDate || (startDate && endDate)) {
    setStartDate(day.dateString);
    setEndDate(null);
  } else {
    if (day.dateString < startDate) {
      setStartDate(day.dateString);
    } else {
      setEndDate(day.dateString);
    }
  }
};

<Calendar
  markingType="period"
  markedDates={getMarkedDates()}
  onDayPress={handleDayPress}
/>
```

---

## 7. 자주 쓰는 조합 예시

### 오늘 날짜 하이라이트 + 마킹

```tsx
const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

<Calendar
  current={today}
  markedDates={{
    [today]: { selected: true, selectedColor: '#FF6B6B' },
  }}
/>
```

### 특정 날짜 비활성화

```tsx
<Calendar
  markedDates={{
    '2025-03-15': { disabled: true, disableTouchEvent: true },
  }}
/>
```

---

## 참고 링크

- [공식 문서](https://wix.github.io/react-native-calendars)
- [GitHub Repository](https://github.com/wix/react-native-calendars)
- [npm 패키지](https://www.npmjs.com/package/react-native-calendars)
