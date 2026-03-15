// src/components/Calendar.tsx
import React from 'react';
import { Calendar } from 'react-native-calendars';

// Style
import Colors from '../../utility/color';

export function HomeCalendar() {
  return (
    <Calendar
      theme={{
        calendarBackground: 'white',

        todayTextColor: Colors.red,
        todayDotColor: 'red',
      }}
      renderHeader={() => null}
      hideArrows
    />
  );
}
