import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import PALETTE from '../../utils/color';

/* ==================== Main ==================== */
export const HomeCalendar = () => {
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderColor: PALETTE.border,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <Calendar
        style={{ flex: 1 }}
        monthFormat="MMMM"
        hideArrows={true}
        theme={{ calendarBackground: PALETTE.panel }}
      />
    </View>
  );
};
