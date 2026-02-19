import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { ForwardedRef, forwardRef, ReactElement, useCallback } from 'react';
import { ListRenderItem, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Type
type OptionType<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  title: string;
  option: readonly OptionType<T>[];
  selected: T;
  onSelected: (selected: T) => void;
  colNum?: number;
};

// ==================== Main Component ==================== //
const ScrollableBottomSheetModalInner = <T extends string>(
  props: Props<T>,
  ref: ForwardedRef<BottomSheetModal>,
) => {
  const { colNum = 1 } = props;

  // Sub Component
  const renderBackdrop = (backdropProps: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...backdropProps}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );

  const renderTitle = (title: string) => {
    return <Text style={[styles.title]}>{title}</Text>;
  };

  const renderItem: ListRenderItem<OptionType<T>> = useCallback(
    ({ item }) => {
      const isSelected = item.value === props.selected;

      return (
        <Pressable
          style={[
            styles.item_pressable,
            colNum > 1 && { width: '48%' },
            isSelected && styles.item_pressable_selected,
          ]}
        >
          <Text style={[styles.item_text]}>{item.label}</Text>
          {isSelected && (
            <FontAwesome6 name="check" iconStyle="solid" size={16} />
          )}
        </Pressable>
      );
    },
    [colNum],
  );

  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      topInset={200}
      handleComponent={null}
    >
      <BottomSheetFlatList
        data={props.option}
        key={`list-col-${colNum}`}
        keyExtractor={(item: OptionType<T>) => item.value}
        ListHeaderComponent={() => renderTitle(props.title)}
        contentContainerStyle={[styles.content_container]}
        renderItem={renderItem}
        numColumns={colNum}
        columnWrapperStyle={colNum > 1 && styles.column_wrapper}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </BottomSheetModal>
  );
};

// ==================== Style ==================== //
const styles = StyleSheet.create({
  title: {
    paddingLeft: 16,

    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: 'black',
  },

  content_container: {
    paddingHorizontal: 8,
    paddingVertical: 32,
  },

  column_wrapper: {
    justifyContent: 'space-between',
    marginBottom: 8, // 행 사이의 간격
  },

  item_pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 16,
    paddingVertical: 16,

    borderRadius: 16,
  },

  item_text: {
    fontSize: 16,
    color: 'black',
  },

  item_pressable_selected: {
    backgroundColor: 'rgba(229, 229, 229, 0.5)',
  },
});

// ==================== Export ==================== //
export default forwardRef(ScrollableBottomSheetModalInner) as <
  T extends string,
>(
  props: Props<T> & { ref?: ForwardedRef<BottomSheetModal> },
) => ReactElement;
