import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import * as React from 'react';
import data from './feedData'
import FriendCard from './components/feed/FriendCard';
import FriendPost from './components/feed/FriendPost';
import FeedScreen from './screens/MainScreen';
import MapScreen from './screens/MapScreen';
import ShareScreen from './screens/ShareScreen';
import ProfileScreen from './screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

const HomeFeed = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Create a Listing" 
        component={ShareScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeFeed;
 
