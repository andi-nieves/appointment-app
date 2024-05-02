import { View, Image, ScrollView, RefreshControl } from "react-native";
import Logo from "../components/assets/logo.png"
import Form from "../components/Form/Form";
import TextInput from "../components/Form/TextInput";
import Text from "../components/Text";
import Container from "../components/Container";
import useUserStore from "../stores/user";
import useAppointments from "../hooks/useAppointments";
import Card from "../components/Card";
import hours from "../utils/hours";
import Button from "../components/Button";
import { getDocs, where, query, limit, doc, updateDoc } from "firebase/firestore";
import { collection, db } from "../../firebase";
import useAppStore from "../stores/app";


export default function Appointments({ navigation }) {
  const { doctors, user, setState } = useUserStore()
  const { appointments, get, loading } = useAppointments()
  const { setState: setAppState } = useAppStore()

  return (
    <Container className="flex-1" showBackButton>
      <View className="p-5">
        <Text className="text-[30px] text-gray-100">Appointments</Text>
      </View>
      <ScrollView className="px-5 pt-10 bg-white flex-1 rounded-t-[20px]" refreshControl={<RefreshControl refreshing={loading} onRefresh={get} />}>
        <View className="pb-10">
          {appointments.map(item => {
            const isDoctor = user.type === 'doctor';
            const data = isDoctor ? user : doctors.find(doc => doc.id === item.doctorId)
            return <Card>
              <View className="flex-row">
                {!isDoctor && <Image source={{ uri: data?.picture }} className="h-24 w-24 rounded-full mr-3" />}
                <View>
                  <Text className="font-bold text-[18px]">{`${data.first_name} ${data.last_name}`}</Text>
                  {data.specialties && <Text className="text-gray-500">{data.specialties}</Text>}
                  <Text className="text-gray-500">Concern: <Text className="font-bold">{item.concern}</Text></Text>
                  <Text className="text-gray-500">Date: {item.date}</Text>
                  <Text className="text-gray-500">Time: {hours.find(h => h.id === item.hourId).description}</Text>
                </View>
              </View>
              {item.status !== 'completed' ? <View>
                <Button onPress={() => {
                  setState({ appointment: item })
                  navigation.navigate('Call')
                }} className="mb-0">{isDoctor ? 'Call Now' : 'Attend Now'}</Button>
                <Button
                  onPress={() => {
                    setState({ appointment: item })
                    navigation.navigate('Chat')
                  }}
                  className="mb-0 bg-white border border-[#FF7900]">
                  <Text className="text-[#FF7900] font-bold">Chat</Text>
                </Button>
                {isDoctor && <Button
                  onPress={async () => {
                    console.log('ap', item)
                    setAppState({ loading: true })
                    try {
                      const docRef = doc(db, 'Appointments', item.id)
                      await updateDoc(docRef, { status: 'completed' })
                      item.status = "completed"
                    } catch (error) {
                      console.log('e', error)
                    }
                    setAppState({ loading: false })
                  }}
                  className="mb-0 bg-white border border-[#FF7900]">
                  <Text className="text-[#FF7900] font-bold">Mark as completed</Text>
                </Button>}
              </View> : <View className="bg-[#E2F8E3] p-2 rounded-lg self-start mt-2"><Text className="text-[#04AD01] font-bold">Completed</Text></View>}
            </Card>
          })}
        </View>

      </ScrollView>
    </Container>
  )
}