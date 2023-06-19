import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';

export default function Navigation() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
