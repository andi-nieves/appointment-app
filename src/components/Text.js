import { Text as RNText } from "react-native";

export default function Text({children, className, ...props}) {
    return <RNText className={`text-gray-900 ${className}`} {...props}>{children}</RNText>
}