import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./store/UserContext";
import { RegisterProvider } from "./store/RegisterContext";
import Login from "./src/screens/Login";
import Main from "./src/screens/Main";
import SchoolItem from "./src/screens/tabscreens/Discovery/SchoolItem";
import Launch from "./src/screens/Launch";
import InputSchool from "./src/screens/Register/InputSchool";
import InputName from "./src/screens/Register/InputName";
import InputCreds from "./src/screens/Register/InputCreds";
import Splash from "./src/screens/Splash";
import Upload from "./src/screens/tabscreens/Post/Upload";
import NavButton from "./src/componets/Button";
const Stack = createStackNavigator();

const queryClient = new QueryClient();

function App() {
  return (
    <UserProvider>
      <RegisterProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Launch"
                component={Launch}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="InputSchool"
                component={InputSchool}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="InputName"
                component={InputName}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="InputCreds"
                component={InputCreds}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{
                  headerShown: true,
                }}
              />

              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                  unmountOnBlur: true,
                }}
              />

              <Stack.Screen
                name="Main"
                component={Main}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="SchoolItem" component={SchoolItem} />
              <Stack.Screen
                name="Upload"
                component={Upload}
                options={({ navigation }) => ({
                  headerLeft: () => (
                    <NavButton
                      onPress={navigation.goBack}
                      icon="cross"
                      color="black"
                      size="100"
                    />
                  ),
                  headerRight: () => (
                    <NavButton
                      onPress={navigation.goBack}
                      icon="check"
                      color="black"
                    />
                  ),
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </RegisterProvider>
    </UserProvider>
  );
}

export default App;
