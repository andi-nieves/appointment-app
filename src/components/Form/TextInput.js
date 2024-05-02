import { getIn, useFormikContext } from "formik";
import { TextInput as RNTextInput, View, TouchableOpacity } from "react-native";
import Text from "../Text";
import { useState } from "react";
import EyeIcon from "../icons/Eye";

function TextInput({ name, label, prefix, suffix, ...props }) {
    const { handleChange, handleBlur, values, errors, touched } = useFormikContext();
    const error = getIn(errors, name) && getIn(touched, name) ? getIn(errors, name) : null;
    const value = getIn(values, name);
    const hasError = Boolean(error);
    return <View className="py-2">

        <View className={`p-2 border-2 rounded-lg ${hasError ? "border-red-400" : "border-gray-400"}`}>
            {label && <Text className={`bg-white self-start mb-1 text-[12px] px-2  ${hasError ? "text-red-400" : "text-gray-900"}`} style={{ marginTop: -18 }}>{label}</Text>}
            <View className="flex-row items-center">
                {prefix && <View className="mr-2">{prefix}</View>}
                <RNTextInput
                    className={`m-0 p-0 flex-1 font-bold ${hasError ? "text-red-400" : "text-gray-900"}`}
                    name={name}
                    onChangeText={handleChange(name)}
                    onBlur={handleBlur(name)}
                    value={value}
                    {...props}
                />
                {suffix}
            </View>
        </View>
        {error && <Text className="text-red-400">{error}</Text>}
    </View>
}

function Password({ ...props }) {
    const [showPass, setShowPassword] = useState(false);
    return <TextInput
        secureTextEntry={!showPass}
        suffix={<TouchableOpacity
            onPress={() => setShowPassword(!showPass)}
         className="p-2">
            <EyeIcon />
        </TouchableOpacity>}
        {...props}
    />
}

export default function Input({ type, ...props }) {
    switch (type) {
        case 'password':
            return <Password {...props} />
        default:
            return <TextInput {...props} />
    }
}