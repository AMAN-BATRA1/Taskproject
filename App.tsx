/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState, type PropsWithChildren } from 'react';
import { DarkTheme, DefaultTheme, useFocusEffect, NavigationContainer, createNavigationContainerRef } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from './src/screens/Login';
import SignUp from './src/screens/Signup';
import auth from '@react-native-firebase/auth';
import HomeScreen from './src/screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostDatilScreen from './src/screens/PostDetailScreen';


const App = () => {
  var data = ""
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(false);
  const Stack = createNativeStackNavigator();

  const onAuthStateChanged = (user: boolean) => {
    console.log("user", user)
    setUser(user)
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    asyncfunction()
    const subscriber = auth().onAuthStateChanged(() => onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const asyncfunction = async () => {
    var data = await AsyncStorage.getItem("user_data");
    setUser(data)
    console.log("data", data)
  }
  // if (initializing) return null;

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AppStack" component={AppStack} />

      </Stack.Navigator >
    )
  }

  const App = () => {
    console.log("data2", user)
    let initstate = user ? "AppStack" : "AuthStack"
    console.log(initstate)
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={initstate}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppStack" component={AppStack} />

      </Stack.Navigator >
    )
  }

  const AppStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="PostDatilScreen" component={PostDatilScreen} />

      </Stack.Navigator >
    )
  }
  const navigationRef = createNavigationContainerRef()
  const colorScheme = useColorScheme()


  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <App />
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
