import { View, Image, Alert, ScrollView, Pressable } from "react-native";
import Logo from "../components/assets/logo.png"
import Form from "../components/Form/Form";
import TextInput from "../components/Form/TextInput";
import Text from "../components/Text";
import Container from "../components/Container";
import * as Yup from "yup";
import { validations } from "../utils/validations";
import Button from "../components/Button";
import { auth, addDoc } from 'firebase/firestore';
import useUserStore from "../stores/user";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { dateFormat } from "../utils/string";
import { useState } from "react";
import { collection } from "@app/firebase";
import hours from "../utils/hours";


export const schema = Yup.object().shape({
  date: validations.string,
  hour: validations.object,
  first_name: validations.string,
  last_name: validations.string,
  concern: validations.string
});

export default function Book({ navigation }) {
  const { credentials, selectedDoctor, setState, user } = useUserStore()
  // console.log(selectedDoctor.id)
  return (
    <Container className="flex-1" showBackButton>
      <View className="p-5">
        <Text className="text-[30px] text-gray-100">Book, Doc {selectedDoctor.first_name}</Text>
        <Text className="text-gray-100">Please put your information below to create a new account</Text>
      </View>
      <View className="px-5 pt-10 bg-white rounded-t-[20px] flex-1">
        <Form
          initialValues={{
            first_name: user.first_name,
            last_name: user.last_name,
            concern: "",
            description: "",
            date: "",
            hour: null,
          }}
          validationSchema={schema}
          onSubmit={async ({ hour, ...values }, { setSubmitting }) => {
            setSubmitting(true)
            try {
              const users = collection('Appointments')
              const params = {
                uid: credentials.user.uid,
                doctorId: selectedDoctor.id,
                ...values,
                hourId: hour.id,
                status: "draft"
              }
              const response = await addDoc(users, params)
              setState({ book: { ...params, id: response.id } })
              setSubmitting(false)
              navigation.navigate('Appointments')
            } catch (error) {
              console.log(">>", error)
            }
            setSubmitting(false)
          }}
        >
          {({ handleSubmit, setFieldValue, values, errors }) => <>
            <ScrollView>
              <Text className="text-[20px] font-bold mb-3">Patient Info</Text>
              <TextInput name="first_name" label="First name" />
              <TextInput name="last_name" label="Last name" />
              <TextInput name="concern" label="Concern" />
              <TextInput name="description" label="Description" multiline numberOfLines={4} style={{ textAlignVertical: 'top' }} />

              <Text className="text-[20px] font-bold mb-3">Appointment Date</Text>
              <Text className="text-[20px] font-bold mb-3">Select date</Text>
              <TextInput
                onPress={() => {
                  DateTimePickerAndroid.open({
                    minimumDate: new Date(),
                    mode: 'date', value: new Date(), onChange: (event, date) => {
                      setFieldValue('date', dateFormat(date))
                    }
                  })
                }}
                name="date"
                label="Date"
              />
              <View className="gap-y-3">
                {hours.map((details) => {
                  const isSelected = values?.hour?.id === details.id;
                  return <Pressable
                    key={details.id}
                    onPress={() => setFieldValue('hour', details)}
                    className={`border border-[#FF7900] rounded-lg p-2 ${isSelected ? "bg-[#FF7900]" : ""}`}>
                    <Text className={`${isSelected ? 'text-white' : 'text-[#FF7900]'}  text-center`}>{details.description}</Text>
                  </Pressable>
                })}
                {errors.hour && <Text className="text-red-400">Please select one</Text>}
              </View>
              <Button onPress={handleSubmit}>
                Next
              </Button>
            </ScrollView>

          </>}
        </Form>
      </View>

    </Container>
  )
}