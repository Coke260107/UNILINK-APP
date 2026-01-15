import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import styles from '../styles/backendPingTestScreenStyle';

function BackendPingTestScreen() {
  const [status, setStatus] = useState<'idle' | 'checking'>('idle');

  const onPressPing = () => {
    setStatus('checking');

    // API 없이 UI 테스트용
    setTimeout(() => {
      setStatus('idle');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Backend Ping Test</Text>

      <Text style={styles.status}>
        {status === 'idle' ? '대기 중' : 'Ping 테스트 중...'}
      </Text>

      <Pressable style={styles.button} onPress={onPressPing}>
        <Text style={styles.buttonText}>Ping 테스트</Text>
      </Pressable>
    </View>
  );
}

export default BackendPingTestScreen;
