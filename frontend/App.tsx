// App.tsx
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen
import HomeScreen from './src/screens/HomeScreen';

// type
import type { RootStackParamList } from './src/types/NavigationType';

// Util
import MainTab from './src/utils/MainTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
