import { useState } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import styles from './header.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { RootStackParamList, SearchStackParamList } from '../navigation/type';
import Colors from '../utility/color';

export function HomeScreenHeader() {
  return (
    <View>
      <Text style={styles.home_title}>UNILINK</Text>
    </View>
  );
}

// 검색 아이콘
export const SearchHeader = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('SearchNavigator', { screen: 'Search' })
      }
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, { padding: 4 }]}
    >
      <FontAwesome6
        name="magnifying-glass"
        iconStyle="solid"
        size={20}
        color="black"
      />
    </Pressable>
  );
};



export function ChattingListHeader() {
  return (
    <View>
      <Text style={styles.base_title}>채팅</Text>
    </View>
  );
}

export function SingleBackHeader() {
  const navigation = useNavigation();

  return (
    <View style={{ marginRight: 12, }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, { padding: 4 }]}
      >
        <FontAwesome6
          name="chevron-left"
          iconStyle="solid"
          size={20}
          color="gray"
        />
      </Pressable>
    </View>
  );
}


type Props = {
  onSubmit: (value: string) => void;
};

export function SearchHeaderInput({ onSubmit }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    const trimmed = query.trim();
    onSubmit(trimmed);  
  };

  return (
    <View style={styles.search_header_wrapper}>
      <View style={styles.search_header_container}>
        <TextInput
          style={styles.search_header_input}
          placeholder="검색"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
        />

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.search_header_button,
            pressed && { opacity: 0.7 },
          ]}
        >
          <FontAwesome6
            name="magnifying-glass"
            iconStyle="solid"
            size={18}
            color="gray"
          />
        </Pressable>
      </View>
    </View>
  );
  
}
  

