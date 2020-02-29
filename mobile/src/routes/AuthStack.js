import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '~/screens/SignIn';
import SignUpScreen from '~/screens/SignUp';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      headerMode="none"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
