import { useEffect, useState } from "react";
import useUserStore from "../stores/user";
import { collection } from "@app/firebase";
import { limit, query, where, getDocs } from "firebase/firestore";

export default function useUser() {
    const { credentials, setState, user, reset } = useUserStore()
    const uid = credentials?.user?.uid
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            try {
                const snapshots = await getDocs(query(collection('Users'), where('uid', "==", uid), limit(1)))
                snapshots.forEach(data => {
                    setState({ user: { id: data.id, ...data.data() } })
                })
            } catch (error) {
                console.log('cred', error)
            }
            setLoading(false)
        }
        get()
    }, [uid])

    return { user, loading, uid, setState, reset }
}

export function queryUsers({ type = 'user' }) {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            try {
                const snapshots = await getDocs(query(collection('Users'), where('type', "==", type)))
                const response = []
                snapshots.forEach(data => {
                    response.push({ id: data.id, ...data.data() })
                })
                setUsers(response)
            } catch (error) {
                console.log('cred', error)
            }
            setLoading(false)
        }
        get()
    }, [type])

    return { loading, users }
}