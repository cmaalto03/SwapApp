import * as React from 'react';
import { View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SecureStore from 'expo-secure-store';

import Login from './src/screens/Login';
import Main from './src/screens/Main'
import Splash from './src/screens/Splash';
import SchoolItem from './src/screens/tabscreens/Discovery/SchoolItem';
const Stack = createStackNavigator();
const queryClient = new QueryClient();


async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
  } else {
    console.log("none");
  }
}

function App() {

  const username = getValueFor('username');
  const password = getValueFor('password');
  return (
    <QueryClientProvider client={queryClient}>

    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>

          {username && password ? (
          <>
          <Stack.Screen name="Splash" component={Splash} options = {{
                    headerShown: false,
                }} />
          <Stack.Screen name="Main" component={Main} options = {{
                    headerShown: false,
                }}/>
           <Stack.Screen name="SchoolItem" component={SchoolItem} options = {{
                    headerShown: true,
                }}/>
          </>
          ) :
          (
            <>
            <Stack.Screen name="Login" component={Login} options = {{
                    headerShown: false,
                }}/>
            <Stack.Screen name="Main" component={Main} options = {{
                    headerShown: false,
                }}/>
                
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>

    </QueryClientProvider>

  );
}

export default App;