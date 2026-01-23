// App.tsx
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

// Navigator
import RootNavigator from './src/navigation/RootNavigator';

// Style
import { Color } from './src/globalStyle';

// ============================================================

// Main
export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={Color.background}
          barStyle={'dark-content'}
        />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}
