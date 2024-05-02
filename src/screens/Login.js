import { View, Image, Alert } from "react-native";
import Logo from "../components/assets/logo.png"
import Form from "../components/Form/Form";
import TextInput from "../components/Form/TextInput";
import Text from "../components/Text";
import Container from "../components/Container";
import * as Yup from "yup";
import { validations } from "../utils/validations";
import Button from "../components/Button";
import { signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../../firebase";
import useUserStore from "../stores/user";

export const schema = Yup.object().shape({
  email: validations.email,
  password: validations.string
});

export default function Login({navigation}) {
  const { setState } = useUserStore()

  return (
    <Container className="flex-1">
      <View className="p-5">
        <Image source={Logo} className="h-20 w-20 rounded-full self-center my-5" />
        <Text className="text-[30px] text-gray-100">Welcome</Text>
        <Text className="text-gray-100">Please put your information below to create a new account</Text>
      </View>

      <View className="px-5 pt-10 bg-white flex-1 rounded-t-[20px]">
        <Form
          initialValues={{ email: "", password: "" }}
          validationSchema={schema}
          onSubmit={({ email, password }, { setSubmitting }) => {
            setSubmitting(true)
            signInWithEmailAndPassword(auth, email, password).then(credentials => {
              setSubmitting(false)
              setState({ credentials })
              navigation.replace('Dashboard')
            }).catch((e) => {
              setSubmitting(false)
              Alert.alert("Login", "Invalid credentials")
            })
          }}
        >
          {({handleSubmit}) => <>
            <TextInput 
              name="email" 
              label="Email" 
              keyboardType="email-address"
              autoCapitalize="none"/>
            <TextInput
              type="password"
              name="password"
              autoCapitalize="none"
              label="Password" />
            <Button onPress={handleSubmit}>
              Login
            </Button>
            <Text onPress={() => navigation.navigate('CreateAccount')} className="text-right underline">Create account</Text>
          </>}
        </Form>
      </View>

    </Container>
  )
}