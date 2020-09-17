import React from "react"
import { View } from "react-native"
import { DividerBlock, Text } from "../../../styles"

export default function WelcomeSign() {
    return (
        <View>
            <Text size={23}>
                가입을 축하드려요
            </Text>
            <DividerBlock marginTop={24} />
            <Text size={16}>
                키우시는 반려동물에 대한 정보를
                적어주시면 아이를 위한 맞춤 정보를 드립니다.
            </Text>
        </View>
    )
}