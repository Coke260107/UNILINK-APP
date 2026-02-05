import React, { ForwardedRef, forwardRef } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Color } from '../../../globalStyle';
import { MbtiItem, MbtiType } from '../../type/profileType';

type Props = {
  title: string;
  option: readonly MbtiItem[];
  selected: MbtiType;
  onSelected: (selected: MbtiType) => void;
};

const SelectBottomModal = (
  props: Props,
  ref: ForwardedRef<BottomSheetModal>,
) => {
  const renderBackdrop = (backdropProps: BottomSheetBackgroundProps) => (
    <BottomSheetBackdrop
      {...backdropProps}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior={'close'}
    />
  );

  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      handleComponent={null}
      backgroundStyle={{ backgroundColor: Color.background }}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={props.option}
        keyExtractor={(item: MbtiItem) => item.value}
        contentContainerStyle={style.content_container}
        ListHeaderComponent={<Text style={style.title}>{props.title}</Text>}
        numColumns={2} // 2열 설정
        columnWrapperStyle={style.column_wrapper} // [중요] 열 사이 간격 조절
        renderItem={({ item }: { item: MbtiItem }) => (
          <Pressable
            onPress={() => props.onSelected(item.value)}
            style={[
              style.item_button,
              item.value === props.selected && style.item_button_selected,
            ]}
          >
            <Text
              style={[
                style.item_text,
                item.value === props.selected && style.item_text_selected,
              ]}
            >
              {item.label}
            </Text>

            {item.value === props.selected && (
              <FontAwesome6 name="check" iconStyle="solid" size={16} />
            )}
          </Pressable>
        )}
      />
    </BottomSheetModal>
  );
};

export default forwardRef(SelectBottomModal);

const style = StyleSheet.create({
  content_container: {
    paddingHorizontal: 16, // 간격을 조금 넉넉히 주면 더 예쁩니다.
    paddingVertical: 24,
    paddingBottom: 24,
  },
  column_wrapper: {
    justifyContent: 'space-between', // 아이템들을 양 끝으로 벌림
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },

  item_button: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },

  item_button_selected: {
    backgroundColor: 'rgba(229, 229, 229, 0.5)', // Neutral-200/50
  },

  item_text: {
    fontSize: 16,
  },

  item_text_selected: {
    fontWeight: '600',
  },
});
