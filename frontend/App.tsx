// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { ReactNode, useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigator
import RootNavigator from './src/navigations/RootNavigator';
import {
  getKeyHashAndroid,
  initializeKakaoSDK,
} from '@react-native-kakao/core';

// ==================== Main ==================== //
const AppProvider = ({ children }: { children: ReactNode }) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // useEffect
  useEffect(() => {
    initializeKakaoSDK('f8bea2024f9b5ba980561d8a549505e0');

    const fetch = async () => {
      try {
        const hash = await getKeyHashAndroid();
        console.log('나의 실제 키 해시: ', hash);
      } catch (error: any) {
        console.log('키 해시 확인 실패', error);
      }
    };

    fetch();
  }, []);

  return (
    <AppProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
