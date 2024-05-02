import { useEffect, useState } from "react";
import useUserStore from "../stores/user";
import { collection } from "@app/firebase";
import { query, where, getDocs } from "firebase/firestore";

export default function useAppointments() {
    const { credentials, setState, user } = useUserStore()
    const uid = credentials?.user?.uid
    const [loading, setLoading] = useState(true)
    const [appointments, setAppointments] = useState([])
    const get = async () => {
        setLoading(true)
        try {
            const snapshots = await getDocs(query(collection('Appointments'), where(user.type === 'doctor' ? 'doctorId' : 'uid', "==", user.type === 'doctor' ? user.id : uid)))
            const response = []
            snapshots.forEach(data => {
                response.push({ id: data.id, ...data.data() })
            })
            setAppointments(response)
        } catch (error) {
            console.log('cred', user.type, error)
        }
        setLoading(false)
    }
    useEffect(() => {
        get()
    }, [])

    return { appointments, loading, setState, get }
}