import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react-native";

export default function App() {
    useEffect(() => {
        const sub = Notifications.addPushTokenListener((token) => {
            console.log("pushTokenListener called");
            Alert.alert(
                "pushTokenListener called",
                `token: ${JSON.stringify(token)}`
            );
        });
        return () => sub?.remove();
    });
    const requestPushToken = async () => {
        const token = await Notifications.getDevicePushTokenAsync();
        console.log("getDevicePushTokenAsync response", token);
    };
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <TouchableHighlight onPress={requestPushToken} style={styles.btn}>
                <Text>RequestPushToken</Text>
            </TouchableHighlight>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    btn: {
        padding: 10,
        backgroundColor: "lightblue",
    },
});
