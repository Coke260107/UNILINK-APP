// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { ReactNode, useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Navigator
import RootNavigator from './src/navigations/RootNavigator';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { AuthProvider } from './src/contexts/AuthContext';

// ==================== Main ==================== //
const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
          </SafeAreaProvider>
        </AuthProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // useEffect
  useEffect(() => {
    initializeKakaoSDK('f8bea2024f9b5ba980561d8a549505e0');
  }, []);

  return (
    <AppProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

// ==================== Export ==================== //
export default App;
