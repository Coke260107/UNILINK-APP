import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useCallback,
} from 'react';
import { ListRenderItem, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// ==================== Type ==================== //
export type OptionType<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  title?: string;
  options: readonly OptionType<T>[];
  selected?: T;
  onSelected?: (value: T) => void;
  onClose?: () => void;
  colNum?: number;
};

// ==================== Main Component ==================== //
const ScrollableBottomSheetModalInner = <T extends string>(
  props: Props<T>,
  ref: ForwardedRef<BottomSheetModal>,
) => {
  const { title, options, selected, onSelected, onClose, colNum = 1 } = props;

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const ListHeaderComponent = useCallback(() => {
    if (!title) return null;
    return <Text style={styles.title}>{title}</Text>;
  }, [title]);

  const renderItem: ListRenderItem<OptionType<T>> = useCallback(
    ({ item }) => {
      const isSelected = item.value === selected;

      return (
        <Pressable
          onPress={() => onSelected?.(item.value)}
          style={[
            styles.item_pressable,
            colNum > 1 && { width: '48%' },
            isSelected && styles.item_pressable_selected,
          ]}
        >
          <Text style={styles.item_text}>{item.label}</Text>
          {isSelected && (
            <FontAwesome6 name="check" iconStyle="solid" size={16} />
          )}
        </Pressable>
      );
    },
    [colNum, selected, onSelected],
  );

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing={true}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      topInset={200}
      handleComponent={null}
      onDismiss={onClose}
    >
      <BottomSheetFlatList
        data={options}
        key={`list-col-${colNum}`}
        keyExtractor={(item: OptionType<T>) => item.value}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.content_container}
        renderItem={renderItem}
        numColumns={colNum}
        columnWrapperStyle={colNum > 1 ? styles.column_wrapper : undefined}
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
    marginBottom: 8,
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
