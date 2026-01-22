import { View, Text, ScrollView, Pressable } from 'react-native';

// Type
import { Category, CATEGORY_LABEL, CATEGORY_VALUE } from '../../type/category';
const CATEGORY_FILTER = ['all', ...CATEGORY_VALUE] as const;
type CategroyFilter = (typeof CATEGORY_FILTER)[number];

// Style
import globalStyle from '../../../globalStyle';
import styles from './styles';
import Colors from '../../utility/color';
import CategoryIcons from '../../utility/icon';
import { useState } from 'react';

function ChattingListScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategroyFilter>('all');
  return (
    <>
      <ScrollView
        style={globalStyle.scroll_container}
        contentContainerStyle={globalStyle.scroll_content_container}
      >
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
      </ScrollView>
    </>
  );
}

export default ChattingListScreen;

// Component
type CategoryButtonProps = {
  item: CategroyFilter;
  selected: boolean;
  onPressed: () => void;
};
function CategoryButton(props: CategoryButtonProps) {
  return (
    <>
      <Pressable
        style={[
          styles.category_button,
          props.item === 'all'
            ? { backgroundColor: 'white' }
            : { backgroundColor: Colors[props.item].sub },
          props.selected && styles.category_button_selected,
        ]}
        onPress={props.onPressed}
      >
        {props.item === 'all' ? (
          <>
            <Text style={styles.category_button_Text}>전체</Text>
          </>
        ) : (
          <>
            <CategoryIcons category={props.item} size={14} />
            <Text style={styles.category_button_Text}>
              {CATEGORY_LABEL[props.item]}
            </Text>
          </>
        )}
      </Pressable>
    </>
  );
}
