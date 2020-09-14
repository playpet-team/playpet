import React, { useRef, useState } from "react"
import { Input } from "react-native-elements"
import { Step } from "../SignInAdditionalInformation"

export default function Username({ step }: { step: number }) {
    if (step !== Step.PET_NAME) {
        return null
    }
    const usernameRef = useRef(null)
    const [username, setUsername] = useState('')


    return (
        <Input
            ref={usernameRef}
            label="아이 이름을 알려주세요"
            placeholder="예) 바오, 순철이, 나옹이"
            value={username}
            onChangeText={setUsername}
        />
    )
}