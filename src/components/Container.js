import { TouchableOpacity, View, SafeAreaView, StatusBar } from "react-native";
import BG from "./assets/bg";
import BackArrowIcon from "./icons/BackArrow";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Container({ children, className, showBackButton, ...props }) {
    const { top } = useSafeAreaInsets()
    const navigation = useNavigation()
    return <SafeAreaView className={`flex-1 bg-[#240046] ${className}`} {...props}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={{ marginTop: top }} />
        {showBackButton && <TouchableOpacity className="ml-5 mt-10" onPress={() => navigation.goBack()}>
            <BackArrowIcon fill="rgba(200,200,200,0.5)" />
        </TouchableOpacity>}
        <BG className="absolute right-0" />
        {children}
    </SafeAreaView>
}