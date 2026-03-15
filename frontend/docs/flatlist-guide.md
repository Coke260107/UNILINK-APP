# FlatList 완벽 가이드

React Native의 `FlatList`는 긴 목록 데이터를 효율적으로 렌더링하기 위한 컴포넌트입니다.
일반 `ScrollView`와 달리 **화면에 보이는 항목만 렌더링**하기 때문에 성능이 뛰어납니다.

---

## 목차

1. [기본 구조](#1-기본-구조)
2. [필수 Props](#2-필수-props)
3. [자주 쓰는 Props](#3-자주-쓰는-props)
4. [예시 모음](#4-예시-모음)
   - [기본 리스트](#41-기본-리스트)
   - [Header / Footer 추가](#42-header--footer-추가)
   - [구분선 (Separator)](#43-구분선-separator)
   - [당겨서 새로고침 (Pull to Refresh)](#44-당겨서-새로고침-pull-to-refresh)
   - [무한 스크롤 (Infinite Scroll)](#45-무한-스크롤-infinite-scroll)
   - [가로 스크롤 (Horizontal)](#46-가로-스크롤-horizontal)
   - [다중 컬럼 (numColumns)](#47-다중-컬럼-numcolumns)
   - [빈 목록 처리 (Empty State)](#48-빈-목록-처리-empty-state)
5. [keyExtractor 완전 이해](#5-keyextractor-완전-이해)
6. [성능 최적화 팁](#6-성능-최적화-팁)
7. [ScrollView vs FlatList 비교](#7-scrollview-vs-flatlist-비교)

---

## 1. 기본 구조

```tsx
import { FlatList } from 'react-native';

<FlatList
  data={배열}
  renderItem={({ item }) => <컴포넌트 />}
  keyExtractor={(item) => item.id.toString()}
/>
```

- `data`: 렌더링할 배열 데이터
- `renderItem`: 각 항목을 어떻게 그릴지 정의하는 함수
- `keyExtractor`: 각 항목의 고유 키를 반환하는 함수

---

## 2. 필수 Props

| Prop | 타입 | 설명 |
|------|------|------|
| `data` | `T[]` | 렌더링할 데이터 배열 |
| `renderItem` | `({ item, index }) => ReactElement` | 각 항목을 렌더링하는 함수 |
| `keyExtractor` | `(item, index) => string` | 각 항목의 고유 key 반환 함수 |

---

## 3. 자주 쓰는 Props

| Prop | 타입 | 설명 |
|------|------|------|
| `ListHeaderComponent` | `ReactElement` | 리스트 최상단에 렌더링할 컴포넌트 |
| `ListFooterComponent` | `ReactElement` | 리스트 최하단에 렌더링할 컴포넌트 |
| `ListEmptyComponent` | `ReactElement` | data가 비었을 때 렌더링할 컴포넌트 |
| `ItemSeparatorComponent` | `ReactElement` | 항목 사이에 렌더링할 구분선 컴포넌트 |
| `onRefresh` | `() => void` | 당겨서 새로고침 콜백 함수 |
| `refreshing` | `boolean` | 새로고침 로딩 상태 |
| `onEndReached` | `() => void` | 목록 끝에 도달했을 때 호출되는 함수 |
| `onEndReachedThreshold` | `number` | 끝에서 얼마나 가까워졌을 때 호출할지 (0~1) |
| `horizontal` | `boolean` | 가로 스크롤 여부 |
| `numColumns` | `number` | 한 행에 표시할 컬럼 수 |
| `contentContainerStyle` | `StyleProp<ViewStyle>` | 리스트 전체 컨테이너 스타일 |
| `showsVerticalScrollIndicator` | `boolean` | 세로 스크롤바 표시 여부 |
| `initialNumToRender` | `number` | 초기에 렌더링할 항목 수 |

---

## 4. 예시 모음

### 4.1 기본 리스트

```tsx
import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: '김철수', email: 'chulsoo@example.com' },
  { id: 2, name: '이영희', email: 'younghee@example.com' },
  { id: 3, name: '박민준', email: 'minjun@example.com' },
];

export default function BasicList() {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});
```

---

### 4.2 Header / Footer 추가

리스트 상단에 제목, 하단에 "더 불러오는 중..." 같은 UI를 붙일 때 사용합니다.

```tsx
<FlatList
  data={users}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  )}
  ListHeaderComponent={
    <View style={styles.header}>
      <Text style={styles.headerText}>유저 목록</Text>
    </View>
  }
  ListFooterComponent={
    <View style={styles.footer}>
      <Text style={styles.footerText}>총 {users.length}명</Text>
    </View>
  }
/>
```

> **주의**: `ListHeaderComponent`는 `FlatList` 내부에 포함되므로,
> 헤더에 `ScrollView`를 중첩하면 안 됩니다.

---

### 4.3 구분선 (Separator)

```tsx
<FlatList
  data={users}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  )}
  ItemSeparatorComponent={() => (
    <View style={{ height: 1, backgroundColor: '#ddd' }} />
  )}
/>
```

> `borderBottom`으로 구현할 수도 있지만, `ItemSeparatorComponent`를 쓰면
> 마지막 항목에는 구분선이 자동으로 생략됩니다.

---

### 4.4 당겨서 새로고침 (Pull to Refresh)

```tsx
import React, { useState } from 'react';
import { FlatList, Text, View, RefreshControl } from 'react-native';

export default function RefreshableList() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(['항목 1', '항목 2', '항목 3']);

  const onRefresh = async () => {
    setRefreshing(true);
    // 서버에서 새 데이터 가져오기
    await fetchNewData();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 16 }}>
          <Text>{item}</Text>
        </View>
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      // 또는 RefreshControl로 색상 커스텀:
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />
      // }
    />
  );
}
```

---

### 4.5 무한 스크롤 (Infinite Scroll)

스크롤이 끝에 가까워지면 자동으로 다음 페이지를 불러오는 패턴입니다.

```tsx
import React, { useState, useCallback } from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';

type Post = { id: number; title: string };

export default function InfiniteScrollList() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: '첫 번째 글' },
    { id: 2, title: '두 번째 글' },
  ]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    // 이미 로딩 중이거나 더 이상 데이터가 없으면 중단
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    // API 호출 (예시)
    const newPosts = await fetchPosts(nextPage);

    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prev) => [...prev, ...newPosts]);
      setPage(nextPage);
    }

    setLoading(false);
  }, [loading, hasMore, page]);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Text>{item.title}</Text>
        </View>
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3} // 남은 스크롤의 30% 지점에서 호출
      ListFooterComponent={
        loading ? <ActivityIndicator style={{ padding: 16 }} /> : null
      }
    />
  );
}
```

> **`onEndReachedThreshold`**: 0이면 완전히 끝에 닿았을 때, 0.5이면 남은 컨텐츠의 50% 지점에서 호출됩니다.

---

### 4.6 가로 스크롤 (Horizontal)

```tsx
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

type Story = { id: number; username: string; imageUrl: string };

const stories: Story[] = [
  { id: 1, username: '나', imageUrl: 'https://picsum.photos/100/100?1' },
  { id: 2, username: '친구A', imageUrl: 'https://picsum.photos/100/100?2' },
  { id: 3, username: '친구B', imageUrl: 'https://picsum.photos/100/100?3' },
];

export default function StoryList() {
  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id.toString()}
      horizontal                          // 가로 스크롤 활성화
      showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.story}>
          <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
          <Text style={styles.username}>{item.username}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  story: {
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  username: {
    marginTop: 4,
    fontSize: 12,
  },
});
```

---

### 4.7 다중 컬럼 (numColumns)

인스타그램 같은 그리드 레이아웃을 만들 때 사용합니다.

```tsx
import React from 'react';
import { FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const ITEM_SIZE = width / NUM_COLUMNS;

type Photo = { id: number; uri: string };

const photos: Photo[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  uri: `https://picsum.photos/200/200?random=${i}`,
}));

export default function PhotoGrid() {
  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id.toString()}
      numColumns={NUM_COLUMNS}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item.uri }}
          style={styles.photo}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  photo: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
  },
});
```

> **주의**: `numColumns`를 사용할 때 `horizontal={true}`는 함께 사용할 수 없습니다.
> 또한 `numColumns` 값을 런타임에 바꾸려면 `key` prop을 변경해서 FlatList를 리마운트해야 합니다.

---

### 4.8 빈 목록 처리 (Empty State)

```tsx
<FlatList
  data={[]}  // 빈 배열일 때
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => <View />}
  ListEmptyComponent={
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyText}>목록이 비어있습니다</Text>
      <Text style={styles.emptySubText}>새로운 항목을 추가해보세요</Text>
    </View>
  }
/>

// 스타일
const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});
```

---

## 5. keyExtractor 완전 이해

`keyExtractor`는 React가 목록 항목을 구별하기 위한 고유 키를 반환하는 함수입니다.

```tsx
// ✅ 좋은 방법 - 데이터의 고유 ID 사용
keyExtractor={(item) => item.id.toString()}

// ✅ 가능하지만 비추 - index 사용 (항목 순서가 바뀌면 문제 발생)
keyExtractor={(item, index) => index.toString()}

// ✅ 복합 키 (두 필드 조합)
keyExtractor={(item) => `${item.userId}-${item.postId}`}

// ❌ 나쁜 방법 - 매 렌더마다 새 문자열 생성 (성능 저하)
keyExtractor={(item) => Math.random().toString()}
```

> 키가 고유하지 않으면 목록 업데이트 시 UI가 이상하게 동작할 수 있습니다.

---

## 6. 성능 최적화 팁

### `renderItem`을 컴포넌트 밖으로 분리

```tsx
// ❌ 비효율: 렌더마다 새 함수 생성
<FlatList
  renderItem={({ item }) => <UserCard user={item} />}
/>

// ✅ 효율: useCallback으로 메모이제이션
const renderUser = useCallback(
  ({ item }: { item: User }) => <UserCard user={item} />,
  []
);

<FlatList renderItem={renderUser} />
```

### `React.memo`로 아이템 컴포넌트 최적화

```tsx
// 부모가 리렌더링 되어도 props가 같으면 재렌더링 생략
const UserCard = React.memo(({ user }: { user: User }) => {
  return (
    <View style={styles.card}>
      <Text>{user.name}</Text>
    </View>
  );
});
```

### 초기 렌더링 수 조절

```tsx
<FlatList
  initialNumToRender={10}   // 초기에 렌더링할 항목 수 (기본값: 10)
  maxToRenderPerBatch={10}  // 한 번에 렌더링할 배치 크기
  windowSize={5}            // 뷰포트 기준 렌더링 범위 (기본값: 21)
/>
```

### `getItemLayout`으로 스크롤 성능 향상

항목 높이가 고정일 때 사용하면 스크롤 계산을 최적화할 수 있습니다.

```tsx
const ITEM_HEIGHT = 60;

<FlatList
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

---

## 7. ScrollView vs FlatList 비교

| | ScrollView | FlatList |
|---|---|---|
| **렌더링 방식** | 모든 항목을 한 번에 렌더링 | 화면에 보이는 항목만 렌더링 |
| **적합한 경우** | 항목이 적거나(< 20개) 고정된 레이아웃 | 항목이 많거나 동적으로 증가하는 경우 |
| **메모리** | 항목 수에 비례해 메모리 사용 | 일정한 메모리 사용 |
| **초기 로딩** | 느릴 수 있음 | 빠름 |
| **당겨서 새로고침** | 직접 구현 필요 | `onRefresh`, `refreshing` 기본 제공 |

> **결론**: 동적 리스트 데이터에는 항상 `FlatList`를 사용하세요.

---

## 참고

- [React Native 공식 FlatList 문서](https://reactnative.dev/docs/flatlist)
- [React Native 성능 최적화 가이드](https://reactnative.dev/docs/optimizing-flatlist-configuration)
