import React, { ForwardedRef, forwardRef } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Color } from '../../../globalStyle';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// Type
type Props<T> = {
  title: string;
  option: readonly { value: T; label: string }[];
  selected: T;
  onSelected: (selected: T) => void;
};

/**
 * 1. 함수 선언부 바로 앞에 <T extends string>을 추가하여 제네릭을 정의합니다.
 */
const GenderBottomModalInner = <T extends string>(
  props: Props<T>,
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
      // 콘텐츠 크기에 딱 맞춰지도록 설정 (원하시면 snapPoints 설정 가능)
      enableDynamicSizing={true}
    >
      <BottomSheetView style={style.content_container}>
        <Text style={style.title}>{props.title}</Text>
        {props.option.map(item => (
          <Pressable
            key={item.value}
            onPress={() => props.onSelected(item.value)}
            style={[
              style.gender_button,
              item.value === props.selected && style.gender_button_selected,
            ]}
          >
            <Text
              style={[
                style.gender_text,
                item.value === props.selected && style.gender_text_selected,
              ]}
            >
              {item.label}
            </Text>

            {item.value === props.selected && (
              <FontAwesome6 name="check" iconStyle="solid" size={16} />
            )}
          </Pressable>
        ))}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

/**
 * 2. forwardRef는 기본적으로 제네릭을 지원하지 않으므로,
 * 마지막에 타입 단언을 통해 제네릭 함수임을 수동으로 지정합니다.
 */
export default forwardRef(GenderBottomModalInner) as <T extends string>(
  props: Props<T> & { ref?: ForwardedRef<BottomSheetModal> },
) => React.ReactElement;

const style = StyleSheet.create({
  content_container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  gender_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
  },
  gender_button_selected: {
    backgroundColor: 'rgba(229, 229, 229, 0.5)',
  },
  gender_text: {
    fontSize: 16,
  },
  gender_text_selected: {
    fontWeight: '600',
  },
});
