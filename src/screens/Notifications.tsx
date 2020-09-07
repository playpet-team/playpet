import React from "react"
import styled from "styled-components/native"
import useUserNotifications from "../hooks/useUserNotifications"
import { Text } from "../styles"
import { Image } from "react-native-elements"

function Notifications() {
    const notifications = useUserNotifications('listener')
    return (
        <NotificationsBlock>
            <Image
                source={require('../../assets/images/no_notifications.jpg')}
                style={{
                    width: 300,
                    height: 200,
                }}
                resizeMode="cover"
            />
            <Text bold size={34}>도착한 알림이 없어요</Text>
        </NotificationsBlock>
    )
}

const NotificationsBlock = styled.View`
    padding: 16px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export default Notifications
