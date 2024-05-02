import { View, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView, RefreshControl } from "react-native";
import Logo from "../components/assets/logo.png"
import useUserStore from "../stores/user";
import Container from "../components/Container";
import { useEffect } from "react";

import useUser, { queryUsers } from "../hooks/useUser";
import Shimmer from "../components/Shimmer";
import Text from "../components/Text";
import CalendarIcon from "../components/icons/Calendar";
import MagnifyingIcon from "../components/icons/Magnifying";
import BookmarkIcon from "../components/icons/Bookmark";
import CheckCircleIcon from "../components/icons/CheckCircle";
import CardBG from "../components/icons/CardBG";
import Button from "../components/Button";
import useAppointments from "../hooks/useAppointments";
import Card from "../components/Card";
import hours from "../utils/hours";
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';

const articles = [
  {
    date: "03 March 2024",
    title: "COVID- 19 Vaccine",
    description: "Official public service announcement on coronavirus from the world health"
  },
  {
    date: "03 March 2024",
    title: "COVID- 19 Vaccine",
    description: "Official public service announcement on coronavirus from the world health"
  },
  {
    date: "03 March 2024",
    title: "COVID- 19 Vaccine",
    description: "Official public service announcement on coronavirus from the world health"
  }
]
async function GetAllPermissions() {
  requestMultiple([
    PERMISSIONS.ANDROID.RECORD_AUDIO, 
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, 
    PERMISSIONS.ANDROID.CAMERA, 
  ]).then((statuses) => {

  });
}
export default function DoctorDashboard({ navigation }) {
  const { user, loading, setState, reset } = useUser()
  const { users, loading: usersLoading } = queryUsers({ type: "user" })

  const { appointments, loading: appoinmentsLoading, get } = useAppointments()

  useEffect(() => {
    GetAllPermissions()
  }, [])

  useEffect(() => {
    setState({ users })
  }, [users])

  return (
    <Container>
      <View className="p-5 pt-10">
        {loading ? <Shimmer /> : <Text className="text-[24px] text-white font-bold">Hey, {user.first_name}!</Text>}
        <Text className="text-white">You have no upcoming appointment</Text>
      </View>

      <ScrollView className="rounded-[20px] flex-1 bg-white pt-5" refreshControl={<RefreshControl refreshing={appoinmentsLoading} onRefresh={get} />}>
        <View className="px-5 flex-row justify-between items-center">
          <Text className="text-[20px] font-bold">Appointments</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Appointments")}><Text>View All</Text></TouchableOpacity>
        </View>

        {appoinmentsLoading ? <Shimmer style={{ height: 100, width: 200, borderRadius: 15, marginLeft: 15 }}/> : <FlatList
          data={appointments.slice(0,3)}
          horizontal
          renderItem={({ item }) => {
            // const doctor = doctors.find(doc => doc.id === item.doctorId)
            return <Card>
              <View className="flex-row">
                {/* <Image source={{ uri: item.picture }} className="h-24 w-24 rounded-full mr-3" /> */}
                <View>
                  <Text className="font-bold text-[18px]">{`${item.first_name} ${item.last_name}`}</Text>
                  {/* <Text className="text-gray-500">{doctor.specialties}</Text> */}
                  <Text className="text-gray-500">Concern: <Text className="font-bold">{item.concern}</Text></Text>
                  <Text className="text-gray-500">Date: {item.date}</Text>
                  <Text className="text-gray-500">Time: {hours.find(h => h.id === item.hourId).description}</Text>
                </View>
              </View>
            </Card>
          }}
        />}

        <View className="px-5 mb-5">
          <Text className="text-[20px] font-bold mb-3">Health Articles</Text>
          <FlatList
            data={articles}
            horizontal
            renderItem={({ item }) => <TouchableOpacity className="mr-5">
              <CardBG />
              <View className="absolute p-5">
                <Text className="text-white font-light mb-2">{item.date}</Text>
                <Text className="text-white font-bold text-[18px] mb-2">{item.title}</Text>
                <Text className="text-white w-1/2">{item.description}</Text>
              </View>
            </TouchableOpacity>}
          />
        </View>
        <View className="px-5">
          <Text className="text-[20px] font-bold mb-3">Book Appointments in 3 easy steps</Text>
          {[
            { title: "Search for doctors by  speciality , service or diease", icon: <MagnifyingIcon /> },
            { title: "Book and confirmed appointment within seconds", icon: <BookmarkIcon /> },
            { title: "Select based on experience, fee or rating", icon: <CheckCircleIcon /> }].map(item => {
              return <View className="flex-row items-center mb-3" key={item.title}>
                <View className="bg-[#FF7900] p-2 self-start rounded-lg mr-2">{item.icon}</View>
                <Text className="text-[16px] text-[#525A66]">{item.title}</Text>
              </View>
            })}
        </View>
        <Button className="mb-10 mx-5" onPress={() => {
          reset()
          navigation.navigate('Login')
        }}>Logout</Button>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    height: 150,
    margin: 20
  }
})