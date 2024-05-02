import { View } from "react-native";

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export default function Shimmer(props) {
    return <View>
        <ShimmerPlaceHolder style={{ borderRadius: 10 }}  {...props} />
    </View>
}