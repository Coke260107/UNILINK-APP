// src/utils/Icons.tsx
import React, { JSX } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

// 카테고리 타입 (중복 방지용으로 export 권장)
import type { Category } from '../types/category';

type IconProps = {
  size?: number;
  color?: string;
};

const DEFAULT_ICON_PROPS = { size: 20, color: '#000' } as const;

const CategoryIcons: Record<Category, (props?: IconProps) => JSX.Element> = {
  study: (props = DEFAULT_ICON_PROPS) => (
    <FontAwesome6 name="graduation-cap" iconStyle="solid" {...props} />
  ),
  game: (props = DEFAULT_ICON_PROPS) => (
    <FontAwesome6 name="gamepad" iconStyle="solid" {...props} />
  ),
  meal: (props = DEFAULT_ICON_PROPS) => (
    <FontAwesome6 name="bowl-rice" iconStyle="solid" {...props} />
  ),
  exercise: (props = DEFAULT_ICON_PROPS) => (
    <FontAwesome5 name="heartbeat" iconStyle="solid" {...props} />
  ),
};

export default CategoryIcons;
