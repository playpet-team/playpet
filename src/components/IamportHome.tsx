import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import queryString from 'query-string';
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import { HomeNavigatorTabParamList } from "../navigation/BottomTabNavigator";

export default function IamportHome() {
    const navigation = useNavigation()
    const domain = "http://192.168.1.4:8081";
    const [uri, setUri] = useState(domain);
    const { params: { type, response } } = useRoute<RouteProp<HomeNavigatorTabParamList, 'IamportHome'>>();

    useEffect(() => {
        if (response) {
            const query = queryString.stringify(response);
            console.log("query", query)
            if (type === "payment") {
                console.log('-------')
                setUri(`${domain}/payment/result?${query}`);
            } else {
                setUri(`${domain}/certification/result?${query}`);
            }
        }
    }, [navigation]);
    console.log("uri', ", uri)

    function onMessage(e: any) {
        try {
            const { userCode, data, type } = JSON.parse(e.nativeEvent.data);
            const params = { userCode, data };
            // navigation.navigate('Payment')
            navigation.navigate(type === "payment" ? "Payment" : "Certification", params);
        } catch (e) { }
    }

    return (
        <WebView
            source={{ uri }}
            onMessage={onMessage}
            style={{ flex: 1 }}
            injectedJavaScript={`(function() {
                window.postMessage = function(data) {
                window.ReactNativeWebView.postMessage(data);
                };
            })()`}
        />
    );
}
