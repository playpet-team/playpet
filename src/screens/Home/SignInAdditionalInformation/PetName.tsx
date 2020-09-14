import React, { useRef } from "react"
import { Input } from "react-native-elements"
import { Step } from "../SignInAdditionalInformation"

export default function PetName({ currentStep, petName, setPetname, valid }: {
    currentStep: Step
    petName: string
    setPetname: React.Dispatch<React.SetStateAction<string>>
    valid: boolean
}) {
    if (currentStep !== Step.PET_NAME) {
        return null
    }
    const usernameRef = useRef(null)

    return (
        <Input
            maxLength={16}
            ref={usernameRef}
            label="아이 이름을 알려주세요"
            placeholder="예) 바오, 순철이, 나옹이"
            value={petName}
            onChangeText={setPetname}
            errorMessage={valid ? '최대 16글자로 이름을 적어주세요' : ''}
        />
    )
}