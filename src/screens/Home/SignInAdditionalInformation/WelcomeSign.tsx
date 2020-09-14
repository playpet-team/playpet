import React from "react"
import { View } from "react-native"
import { Text } from "../../../styles"
import { Step } from "../SignInAdditionalInformation"

export default function WelcomeSign({ currentStep }: {
    currentStep: Step
}) {
    if (currentStep !== Step.WELCOME) {
        return null
    }

    return (
        <View>
            <Text>
                가입을 축하드려요~ 쌸라쌸라, 키우시는 반려동물에 대하 정보를 적어주시면 아이를 위한 맞춤 정보를 드립니다~!
            </Text>
        </View>
    )
}