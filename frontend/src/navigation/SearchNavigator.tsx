import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen
import SearchScreen from '../screen/search/Search';

// Type
import type { SearchStackParamList } from './type';
import {  SingleBackHeader, SearchHeaderInput } from '../header/header';
import Colors from '../utility/color';

// ===========================================================

//Main

const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        title: "검색",
        headerShadowVisible: true,
        headerStyle: { backgroundColor: Colors.background},
      }}
    >
      <Stack.Screen
      
        name="Search"
        component={SearchScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <SearchHeaderInput
              onSubmit={(value) => {
                navigation.navigate("Search", { query: value });
              }}
            />
          ),
          headerLeft: () => <SingleBackHeader />,
        })}
      />
    </Stack.Navigator>
  );
}   