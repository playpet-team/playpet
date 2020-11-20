import React from "react"
import { Control, Controller, DeepMap, FieldError } from "react-hook-form"
import { Input } from "react-native-elements"
import Transition from "../../../components/Transition"
import { DividerBlock, Text } from "../../../styles"
import { ItemBlock } from "../RegistrationPet"

export default function PetNameSection({ petName, setPetName }: {
    petName: string
    setPetName: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <Transition>
            <ItemBlock>
                <Text
                    align="center"
                    size={18}
                    bold
                >
                    반려동물의 이름을 알려주세요
                </Text>
                <DividerBlock marginTop={24} />
                <Input
                    maxLength={16}
                    containerStyle={{
                        paddingHorizontal: 20,
                    }}
                    placeholder="예) 바오, 순철이, 나옹이"
                    value={petName}
                    onChangeText={setPetName}
                />
                <DividerBlock marginBottom={8} />
            </ItemBlock>
        </Transition>
    )
}
