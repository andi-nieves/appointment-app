import { View, Image, Text } from "react-native";
import Logo from "../components/assets/logo.png"
import useUserStore from "../stores/user";
import { useEffect } from "react";

export default function Splash({navigation}) {
  const { credentials, user, _hasHydrated } = useUserStore()
  useEffect(() => {
    if (!_hasHydrated) return;
    const to = setTimeout(() => {
      if(!credentials?.user?.uid) {
        navigation.navigate('Login')
        return
      }
      navigation.navigate(user?.type === 'user' ? "Dashboard" : "DoctorDashboard")
      clearTimeout(to)
    }, 1000)
  }, [_hasHydrated, credentials])
  
  return (
    <View className="flex-1 items-center justify-center">
      <Image source={Logo} className="h-32 w-32 rounded-full" />
      <View className="absolute bottom-0 items-center mb-10">
        <Text className="text-[12px] text-gray-400">President Ramon Magsaysay Technoligical University</Text>
        <Text className="text-[10px] text-gray-300">Palanginan Iba, Zambales</Text>
      </View>
    </View>
  )
}