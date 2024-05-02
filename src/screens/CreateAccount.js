import { View, ScrollView, Alert } from "react-native";
import Logo from "../components/assets/logo.png"
import Form from "../components/Form/Form";
import TextInput from "../components/Form/TextInput";
import Text from "../components/Text";
import Container from "../components/Container";
import * as Yup from "yup";
import { validations } from "../utils/validations";
import Button from "../components/Button";
import { addDoc,  } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import useUserStore from "../stores/user";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { dateFormat } from "../utils/string";
import { auth, collection } from '../../firebase'


export const schema = Yup.object().shape({
  email: validations.email,
  password: validations.password,
  contact_number: validations.phone,
  date_of_birth: validations.string,
  first_name: validations.string,
  last_name: validations.string,
  confirmpassword: validations.password
});

export default function CreateAccount({ navigation }) {
  const { setState } = useUserStore()
  return (
    <Container className="flex-1" showBackButton>

      <View className="p-5">
        <Text className="text-[30px] text-gray-100">Create Account</Text>
        <Text className="text-gray-100">Please put your information below to create a new account</Text>
      </View>
      <View className="px-5 pt-10 bg-white flex-1 rounded-t-[20px]">
        <Form
          initialValues={{
            first_name: "",
            last_name: "",
            address: "",
            contact_number: "",
            date_of_birth: "",
            email: "",
            password: "",
            confirmpassword: ""
          }}
          validationSchema={schema}
          onSubmit={(values, { setFieldError, setSubmitting }) => {
            if (values.password !== values.confirmpassword) {
              setFieldError('password', 'Password not match')
              setFieldError('confirmpassword', 'Password not match')
              return
            }
            setSubmitting(true)
            createUserWithEmailAndPassword(auth, values.email, values.password).then(async (credentials) => {
              const users = collection('Users')
              await addDoc(users, {
                uid: credentials.user.uid,
                ...values,
                type: "user"
              })
              setState({ credentials })
              setSubmitting(false)
              navigation.navigate('Dashboard')
            }).catch(error => {
              setSubmitting(false)
              Alert.alert("Error", error.message)
            })
          }}
        >
          {({ handleSubmit, setFieldValue }) => <ScrollView className="flex-1">
            <TextInput name="first_name" label="First name" />
            <TextInput name="last_name" label="Last name" />
            <TextInput name="contact_number" keyboardType="phone-pad" label="Contact Number" />
            <TextInput
              onPress={() => {
                DateTimePickerAndroid.open({ mode: 'date', value: new Date(), onChange: (event, date) => {
                  setFieldValue('date_of_birth', dateFormat(date))
                }})
              }}
              name="date_of_birth"
              label="Date of birth"
            />
            <TextInput name="address" label="Address" multiline numberOfLines={4} style={{ textAlignVertical: 'top' }} />
            <TextInput name="email" autoCapitalize="none" keyboardType="email-address" label="Email" />
            <TextInput
              type="password"
              name="password"
              autoCapitalize="none"
              label="Password" />
            <TextInput
              type="password"
              name="confirmpassword"
              autoCapitalize="none"
              label="Confirm Password" />
            <Button onPress={handleSubmit}>
              Submit
            </Button>
          </ScrollView>}
        </Form>
      </View>

    </Container>
  )
}