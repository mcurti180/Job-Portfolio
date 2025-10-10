import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import HomeFeed from './HomeFeed';
import LoginOrRegister from './screens/Login'; 
import Register from './screens/Register';
import React, { useEffect, useState } from 'react';

const Stack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(PERSISTENCE_KEY);
        if (savedState) {
          setInitialState(JSON.parse(savedState));
        }
      } finally {
        setIsReady(true);
      }
    };

    restoreState();
  }, []);

  if (!isReady) {
    return null; // You can return a loading screen here instead
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <Stack.Navigator 
        initialRouteName="LoginOrRegister"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="LoginOrRegister"
          component={LoginOrRegister}
          options={{ title: "Community Garden App" }}
        />
        <Stack.Screen 
          name="HomeFeed" 
          component={HomeFeed}
          options={{ title: "Home Feed"}}  
        />
        <Stack.Screen 
          name="Register"
          component={Register}
          options={{ title: "Sign Up"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}