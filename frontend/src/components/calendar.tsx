// src/components/Calendar.tsx
import React from 'react';
import { Calendar } from 'react-native-calendars';
import Colors from '../utils/color';

export function HomeCalendar() {
  return (
    <Calendar
      theme={{
        calendarBackground: 'white',

        todayTextColor: Colors.main,
        todayDotColor: 'red',
      }}
      renderHeader={() => null}
      hideArrows
    />
  );
}
