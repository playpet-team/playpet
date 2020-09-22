import { useTheme } from "@react-navigation/native"
import React, { useRef } from "react"
import { View } from "react-native"
import { Input } from "react-native-elements"
import Transition from "../../../components/Transition"
import { DividerBlock } from "../../../styles"
import { Step } from "../SignInAdditionalInformation"
import WelcomeSign from "./WelcomeSign"

export default function PetName({ currentStep, petName, setPetname, valid }: {
    currentStep: Step
    petName: string
    setPetname: React.Dispatch<React.SetStateAction<string>>
    valid: boolean
}) {
    // if (currentStep !== Step.PET_NAME) {
    //     return null
    // }
    // const { TransitionBlock } = useTransition()
    const usernameRef = useRef(null)
    const theme = useTheme()

    return (
        <View>
            <WelcomeSign />
            <DividerBlock marginTop={44} />
            <Transition>
                <Input
                    maxLength={16}
                    ref={usernameRef}
                    label="아이 이름을 알려주세요"
                    labelStyle={{
                        color: theme.colors.text,
                        fontWeight: '500',
                        marginBottom: 24,
                    }}
                    containerStyle={{
                        paddingHorizontal: 0
                    }}
                    placeholder="예) 바오, 순철이, 나옹이"
                    value={petName}
                    onChangeText={setPetname}
                    errorMessage={valid ? '최대 16글자로 이름을 적어주세요' : ''}
                />
            </Transition>
        </View>
    )
}