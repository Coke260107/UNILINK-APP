// src/components/loading/LoadingModal.tsx

import React from 'react';
import { StyleSheet, View, ActivityIndicator, Modal, Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

// Type
type Props = {
  message: string;
  visible: boolean;
};

// ==================== Main ==================== //
const LoadingModal = ({ message, visible }: Props) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      {visible && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}
          style={[styles.overlay]}
        >
          <ActivityIndicator size="large" color="white" />
        </Animated.View>
      )}
    </Modal>
  );
};

// ==================== Style ==================== //\
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  container: {
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 10,
  },
});

// ==================== Export ==================== //
export default LoadingModal;
