import React from "react";
import { View } from 'react-native'
import ZegoUIKitPrebuiltCall, { ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import useUserStore from "../stores/user";

export default function CallPage(props) {
  const { user, appointment  } = useUserStore()
  return (
    <View style={{ flex: 1 }}>
      <ZegoUIKitPrebuiltCall
        appID={1856119052}
        appSign={'54901bcd56b864e8f01aa07444bab10f7ee29db17bbf574e704d087104c2bf43'}
        userID={user.id}
        userName={user.first_name}
        callID={appointment.uid}
        
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onHangUp: () => { props.navigation.goBack() },
        }}
      />
    </View>
  )
}