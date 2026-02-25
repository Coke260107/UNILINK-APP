// Search.tsx

import {
  Text,
  View,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import styles from './styles';

// Test data
import meeting_dummy from '../../data/dummy_data.json'
// import board_dummy from '../../data/dummy_data2.json';

// Type
import {
  CATEGORY_VALUE,
  CATEGORY_LABEL,
  type Category,
} from '../../type/category';
import { Meeting } from '../../type/meeting';
import { SearchStackParamList } from '../../navigation/type';

// Style
import CategoryIcons from '../../utility/icon';
import Colors from '../../utility/color';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

//==============================================================

// main
type SearchRoute = RouteProp<SearchStackParamList, 'Search'>;
const CATEGORY_FILTER = ['all', ...CATEGORY_VALUE] as const;
type CategoryFilter = (typeof CATEGORY_FILTER)[number];

export default function SearchScreen() {
  const route = useRoute<SearchRoute>();
  const query = route.params?.query?.trim() ?? '';

  
  const [selectedCategory, setSelectedCategory] =
      useState<CategoryFilter>('all');
  const categoryParam =
    selectedCategory === 'all' ? undefined : (selectedCategory as Category);
  const [meetings, setMeetings] = useState<any[]>([]);

  const hasQuery = !!query;
  const hasResults = meetings.length > 0;  


  useEffect(() => {

    const { content } = searchMeetings({
      query,
      category: categoryParam,
      page: 0,
      size: 20,
    });
    setMeetings(content);

  }, [query, selectedCategory]);

  const Header = () => (
    
    <View style={styles.header_container}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.category_container}
          showsHorizontalScrollIndicator={false}
        >
          {CATEGORY_FILTER.map(item => (
            <CategoryButton
              key={item}
              item={item}
              selected={item === selectedCategory}
              onPressed={() => setSelectedCategory(item)}
            />
          ))}
        </ScrollView>
        {hasQuery && hasResults  && (
        <Text style={styles.header_title}>"{query}"에 대한 검색 결과</Text>
        )}
    </View>
  );

  const EmptyComponent: React.FC = () => (
    <View style={styles.empty_container}>
        <Text style={styles.empty_message}>
          검색 결과가 없습니다.
        </Text>
    </View>
  );

  return (
        <FlatList
            style={{backgroundColor: Colors.background, flex: 1}}
            contentContainerStyle={{ flexGrow: 1 }}
            data={meetings}
            keyExtractor={(item, idx) => `${item.id}-${idx}`}
            ListHeaderComponent={<Header />}
            ListEmptyComponent={<EmptyComponent />}
            renderItem={({ item }) => (
                <MeetingList item={item} onPress={(m) => console.log(m.id)} />
            )}
/>

  );
}


// component

// category buttons
type CategoryButtonProps = {
  item: CategoryFilter;
  selected: boolean;
  onPressed: () => void;
};

function CategoryButton(props: CategoryButtonProps) {

  return (
    <>
      <Pressable
        style={[
          styles.category_button,
          props.selected 
            ? {backgroundColor: Colors.backgroundpress, borderColor: Colors.borderpress} 
            :{ backgroundColor: 'white' }
            
        ]}
        onPress={props.onPressed}
      >
        {props.item === 'all' ? (
          <>
            <Text style={styles.category_button_Text}>전체</Text>
          </>
        ) : (
          <>
            <CategoryIcons color={Colors[props.item].pressed} category={props.item} size={12} />
            <Text style={styles.category_button_Text}>
              {CATEGORY_LABEL[props.item]}
            </Text>
          </>
        )}
      </Pressable>
    </>
  );
}



type MeetingItemProps = {
    item: Meeting;
    onPress?: (item: Meeting) => void;
}
function MeetingList({ item, onPress}: MeetingItemProps) {
    const Date = item.expireAt.split('T')[0];
    return (
        <View style={styles.base_container}>
            <Pressable
                style={({ pressed }) => [
                    styles.searchResult_container,      
                    { padding: 4 },                    
                    pressed && { backgroundColor: '#f2f2f2' }, 
                ]}
            >
               {({ pressed }) => (
                <View   
                    style={[
                        {gap: 15},
                        pressed && { transform: [{ scale: 0.95 }] },
                ]}>
                    <View style={{  marginTop: 4, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <CategoryIcons color={Colors[item.category].pressed} category={item.category} size={16} />
                        <Text style={styles.searchResult_title}>{item.title}</Text>
                    </View>
                    <Text style={styles.SearchResult_content}>{item.info}</Text>
                    
                    {/* 하단 */}
                    <View style={styles.footer_container}>
                        <View>
                            <Text style={styles.footer_day_text}>{Date}</Text>
                        </View>
                        <View style={styles.footer_rightItem}>
                            <View style={styles.footer_metaItem}>
                                <FontAwesome6 name="heart" iconStyle="solid" color={Colors.red} />
                                <Text style={styles.footer_metaItem_text}>{item.like}</Text>
                            </View>

                            <View style={styles.footer_metaItem}>
                                <FontAwesome6
                                name="user-group"
                                iconStyle="solid"
                                color={Colors.guide}
                                />
                                <Text style={styles.footer_metaItem_text}>
                                {item.curMember} / {item.maxMember}
                                </Text>
                            </View>
                        </View>
                    </View>
                
                </View>
                
               )}
            </Pressable>
            <View
                style={{
                    height: 1,
                    backgroundColor: '#ddd',
                    marginTop: 8,
                }}
            />
        </View>
        
  );
}



// search
function searchMeetings({
  query,
  category,
  page,
  size,
}: {
  query?: string;
  category?: Category;
  page: number;
  size: number;
}) {
  let filtered = meeting_dummy;

  if (query) {
    const lower = query.toLowerCase();
    filtered = filtered.filter((m) => m.title?.toLowerCase().includes(lower));
  }

  if (category) {
    filtered = filtered.filter((m) => m.category === category);
  }

  const start = page * size;
  const paged = filtered.slice(start, start + size);

  return {
    content: paged,
    totalPages: Math.ceil(filtered.length / size),
    totalElements: filtered.length,
    size,
    number: page,
  };    
}
