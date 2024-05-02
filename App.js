import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "./src/screens/Dashboard";
import Login from "./src/screens/Login";
import CreateAccount from "./src/screens/CreateAccount";
import Splash from "./src/screens/Splash";
import Loading from "./src/components/Loading";
import Book from "./src/screens/Book";
import Appointments from "./src/screens/Appointments";
import DoctorDashboard from "./src/screens/DoctorDashboard";
import CallPage from "./src/screens/Call";
import Chat from "./src/screens/Chat";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="Book" component={Book} />
          <Stack.Screen name="Appointments" component={Appointments} />
          <Stack.Screen name="Call" component={CallPage} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
      <Loading />
    </>
  );
}