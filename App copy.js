import React from "react";
import { Button, View } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import ZegoUIKitPrebuiltCall, { ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';


const Stack = createNativeStackNavigator();
async function GetAllPermissions() {
  requestMultiple([
    PERMISSIONS.ANDROID.RECORD_AUDIO, 
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, 
    PERMISSIONS.ANDROID.CAMERA, 
  ]).then((statuses) => {

  });
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="CallPage" component={CallPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomePage(props) {
  const navigation = useNavigation();
  return (
    <View className="flex-1">
      <Logo
    </View>
  )
}

function CallPage(props) {
  console.log('>>', ONE_ON_ONE_VIDEO_CALL_CONFIG)
  const randomUserID = String(Math.floor(Math.random() * 100000))
  return (
    <View style={{ flex: 1 }}>
      <ZegoUIKitPrebuiltCall
        appID={1856119052}
        appSign={'54901bcd56b864e8f01aa07444bab10f7ee29db17bbf574e704d087104c2bf43'}
        userID={randomUserID}
        userName={'user_' + randomUserID}
        callID='testCallID'


        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onHangUp: () => { props.navigation.navigate('HomePage') },
        }}
      />
    </View>
  )
}