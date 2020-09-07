import React from "react"
import styled from "styled-components/native"
import useUserNotifications from "../hooks/useUserNotifications"
import { Text } from "../styles"

function Notifications() {
    const notifications = useUserNotifications('listener')
    return (
        <NotificationsBlock>
            <Text bold size={48}>도착한 알림이 없어요</Text>
        </NotificationsBlock>
    )
}

const NotificationsBlock = styled.View`
    padding: 16px;
`

export default Notifications
