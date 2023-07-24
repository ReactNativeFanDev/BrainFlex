import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import MainPage from './screens/MainPage';
import Language from './screens/ChangeLanguage';
import Info from './screens/Info';
import Result from './screens/Result';
import TestRule from './screens/TestRule';
import TestAge from './screens/TestAge';

import { Platform, StatusBar } from 'react-native';
import Test from './screens/Test/Test';
import LangContextProvider from './store/auth-context';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainPage" component={MainPage}/>
        <Stack.Screen name="Language" component={Language} options={{presentation: 'transparentModal'}}/>
        <Stack.Screen name="Info" component={Info} options={{presentation: 'transparentModal'}}/>
        <Stack.Screen name="Result" component={Result} options={{presentation: 'transparentModal'}}/>
        <Stack.Screen name="TestRule" component={TestRule}/>
        <Stack.Screen name="TestAge" component={TestAge}/>
        <Stack.Screen name="Test" component={Test}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar 
        barStyle={"light-content"}
        hidden={Platform.OS === "android" && true}
      />
      <LangContextProvider>
        <Navigation/>
      </LangContextProvider>
    </GestureHandlerRootView >
  );
}