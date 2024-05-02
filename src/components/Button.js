import { TouchableOpacity, Text } from "react-native";

export default function Button({ children, className, ...props }) {
    return <TouchableOpacity className={`bg-[#FF7900] p-3 my-5 rounded-lg items-center ${className}`} {...props}>
        {typeof children === 'string' ? <Text className="font-bold">{children}</Text> : children}
    </TouchableOpacity>
}