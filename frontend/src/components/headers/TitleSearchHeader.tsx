// src/components/headers/TitleSearchHeader.tsx

import { StyleProp, StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

// Style
import globalStyles from '../../utils/globalStyle';

// Type
type Props = {
  title: string;
  titleStyle?: StyleProp<Text>;
  showSearchIcon?: boolean;
  onPressSearchIcon?: () => void;
};

// Util
import PALETTE from '../../utils/color';

/* ==================== Main ==================== */
const TitleSearchHeader = ({
  title,
  titleStyle,
  showSearchIcon = true,
  onPressSearchIcon,
}: Props) => {
  return (
    <View style={[styles.container]}>
      <Text style={[globalStyles.screen_title]}>{title}</Text>
      {showSearchIcon && (
        <FontAwesome5
          name="search"
          iconStyle="solid"
          size={20}
          color={'black'}
        />
      )}
    </View>
  );
};

/* ==================== Style ==================== */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    paddingBottom: 16,

    height: 58,

    backgroundColor: PALETTE.background,
  },
});

/* ==================== Export ==================== */
export default TitleSearchHeader;
