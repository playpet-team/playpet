import React from "react"
import { Control, Controller, DeepMap, FieldError } from "react-hook-form"
import { Input } from "react-native-elements"
import Transition from "../../../components/Transition"
import { DividerBlock, Text } from "../../../styles"
import { ItemBlock } from "."

export default function PetName({ petName, setPetName }: {
    petName: string
    setPetName: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <ItemBlock>
            <Transition>
            <Input
                maxLength={16}
                containerStyle={{
                    paddingHorizontal: 0,
                }}
                placeholder="예) 바오, 순철이, 나옹이"
                value={petName}
                onChangeText={setPetName}
            />
            </Transition>
            <DividerBlock marginBottom={8} />
        </ItemBlock>
    )
}
