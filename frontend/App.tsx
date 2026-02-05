// App.tsx
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { KeyboardProvider } from 'react-native-keyboard-controller';

// Context
import AuthProvider from './src/context/auth/AuthContext';

// Navigator
import RootNavigator from './src/navigation/RootNavigator';

// Gesture
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Style
import { Color } from './globalStyle';

// ============================================================

// Main
export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <StatusBar
                barStyle={'dark-content'}
                backgroundColor={Color.background}
              />
              <AuthProvider>
                <NavigationContainer>
                  <RootNavigator />
                </NavigationContainer>
              </AuthProvider>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </>
  );
}
