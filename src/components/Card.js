import { StyleSheet, TouchableOpacity } from "react-native";

export default function Card({ children, ...props }) {
    return <TouchableOpacity style={styles.card} {...props}>
        {children}
    </TouchableOpacity>
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
        // height: 150,
        margin: 20
    }
})