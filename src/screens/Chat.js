import { View, TextInput, ScrollView } from "react-native";
import Form from "../components/Form/Form";
import Text from "../components/Text";
import Container from "../components/Container";
import useUserStore from "../stores/user";
import { collection, query, doc, addDoc, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useRef, useState } from "react";

export default function Chat({ navigation }) {
  const ref = useRef()
  const { user, appointment, doctors } = useUserStore()
  const [messages, setMessages] = useState([])

  const doctor = (doctors).find(doc => doc.id === appointment.doctorId)
  const docRef = doc(db, 'ChatRoom', appointment.id)
  const colRef = query(collection(docRef, 'logs'), orderBy('timestamp'))


  useEffect(() => {
    onSnapshot(colRef, snap => {
      const source = snap.metadata.hasPendingWrites ? "Local" : "Server";
      const messages = []
      snap.forEach((doc) => {
        messages.push({ messageid: doc.id, ...doc.data() })
      });
      setMessages(messages)
    })
  }, [])


  return (
    <Container className="flex-1" showBackButton>
      <View className="p-5">
        <Text className="text-[30px] text-gray-100">Chat: {user.type === 'doctor' ? `${appointment.first_name} ${appointment.last_name}` : `Doc ${doctor.first_name}`}</Text>
      </View>
      <View className="px-5 pt-10 bg-white flex-1 rounded-t-[20px]">
        <Form
          initialValues={{
            message: ''
          }}
          onSubmit={async (values, { setFieldError, setSubmitting, resetForm }) => {
            setSubmitting(true)
            try {
              const docRef = doc(db, 'ChatRoom', appointment.id)
              const colRef = collection(docRef, 'logs')
              await addDoc(colRef, {
                id: user.id,
                message: values.message,
                timestamp: new Date()
              })
              resetForm()
              setSubmitting(false)
            } catch (error) {
              console.log('e', error)
            }
          }}
        >
          {({ handleSubmit, values, setFieldValue }) => <>
            <ScrollView
              className="flex-1"
              ref={ref}
              onContentSizeChange={() => ref.current.scrollToEnd({ animated: true })}>
              {messages.map((m) => {
                const isMe = user.id === m.id;
                return <View key={m.messageid} className={`p-2 ${isMe ? 'bg-[#E2F8E3] self-end' : 'bg-[#DEF2FF] self-start'} rounded-lg  mb-2`}>
                  <Text className={`text-gray-500 ${isMe ? 'text-[#18273B]' : 'text-[#18273B]'}`}>{m.message}</Text>
                </View>
              })}
            </ScrollView>
            <View className="border-t border-gray-200 -mx-5 px-5">
              <TextInput
                className="text-gray-800"
                placeholderTextColor="#333"
                placeholder="Type a message"
                value={values.message}
                returnKeyLabel="Send"
                onChangeText={value => setFieldValue('message', value)}
                onEndEditing={(e) => {
                  handleSubmit()
                }}
              />
            </View>
          </>}
        </Form>
      </View>
    </Container>
  )
}