import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../home';
import SearchResultsScreen from '../search/search';
import {PreferencesProvider} from '../prefrences/prefencesContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FlightResultsScreen from '../flightDetails/flightDetails';

const Tab = createBottomTabNavigator();

const NavigationPages = () => {
  return (
    <NavigationContainer>
      <PreferencesProvider>
        <Tab.Navigator
          screenOptions={{
            tabStyle: {
              height: 80,
              alignSelf: 'center',
              marginBottom: 55,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: () => null,
            }}
          />
          <Tab.Screen
            name="Search Results"
            component={SearchResultsScreen}
            options={{
              tabBarIcon: () => null,
            }}
          />
          <Tab.Screen
            name="Flight Details"
            component={FlightResultsScreen}
            options={{
              tabBarIcon: () => null,
            }}
          />
        </Tab.Navigator>
      </PreferencesProvider>
    </NavigationContainer>
  );
};
export default NavigationPages;
