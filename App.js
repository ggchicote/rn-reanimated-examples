
// this import must be on top of file
import 'react-native-gesture-handler'
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import Router from './src/components/Router';
import { StatusBar } from 'expo-status-bar';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: 'red'
  }
}

const App = () =>  {

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style='auto' />
      <Router />
    </NavigationContainer>
  );
}

export default App

