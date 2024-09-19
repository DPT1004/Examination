import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenName} from '../const/screenName';
import HomeScreen from '../screens/home_screen';
import GamePlayScreen from '../screens/gamePlay/game_play_screen';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={screenName.Home} component={HomeScreen} />
        <Stack.Screen name={screenName.GamePlay} component={GamePlayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;