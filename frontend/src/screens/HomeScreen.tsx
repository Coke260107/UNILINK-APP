// HomeScreen.tsx
import React from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Style
import { styles } from '../styles/HomeScreenStyle';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const onPress = () => {
    Alert.alert('Home', 'Button pressed');
  };

  return (
    <>
      {/* Container */}
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </>
  );
}
