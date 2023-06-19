import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStackNavigator from '../StackNavigator';
import SettingsPage from '../../screens/SettingsPage';
import LoginPage from '../../screens/LoginPage';

export type DrawerParamList = {
  All: undefined;
  Settings: undefined;
  Login: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="All">
      <Drawer.Screen 
        name="All" 
        component={MainStackNavigator} 
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsPage} 
        options={{ drawerLabel: 'Settings' }}
      />
      <Drawer.Screen 
        name="Login" 
        component={LoginPage} 
        options={{ drawerLabel: 'Login' }}
      />
    </Drawer.Navigator>
  );
}
