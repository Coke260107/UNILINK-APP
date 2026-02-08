// src/utils/CategoryIcon.tsx
import React from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import type { Category } from '../type/category';

type Props = {
  category: Category;
  size?: number;
  color?: string;
};

const DEFAULT_ICON_PROPS = {
  size: 20,
  color: '#000',
};

const CategoryIcon = ({
  category,
  size = DEFAULT_ICON_PROPS.size,
  color = DEFAULT_ICON_PROPS.color,
}: Props) => {
  switch (category) {
    case 'study':
      return (
        <FontAwesome6
          name="graduation-cap"
          iconStyle="solid"
          size={size}
          color={color}
        />
      );
    case 'game':
      return (
        <FontAwesome6
          name="gamepad"
          iconStyle="solid"
          size={size}
          color={color}
        />
      );
    case 'meal':
      return (
        <FontAwesome6
          name="bowl-rice"
          iconStyle="solid"
          size={size}
          color={color}
        />
      );
    case 'exercise':
      return (
        <FontAwesome5
          name="heartbeat"
          iconStyle="solid"
          size={size}
          color={color}
        />
      );
    default:
      return null;
  }
};

export default CategoryIcon;
