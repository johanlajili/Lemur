import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from '../../screens/MainPage';
import CommentPage from '../../screens/CommentPage';

export type MainStackParamList = {
  MainPage: undefined;
  CommentPage: { postId: number };
};

const Stack = createStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="MainPage"
      screenOptions={{
        header: () => null, // hide the header
        headerStyle: {
          backgroundColor: '#1A1A1A', // dark background for header
        },
        headerTintColor: '#E8E8E8', // light text for header
      }}
    >
      <Stack.Screen 
        name="MainPage" 
        component={MainPage} 
        options={{ headerTitle: 'Main Page' }}
      />
      <Stack.Screen 
        name="CommentPage" 
        component={CommentPage} 
        options={{ headerTitle: 'Comments' }}
      />
    </Stack.Navigator>
  );
}
