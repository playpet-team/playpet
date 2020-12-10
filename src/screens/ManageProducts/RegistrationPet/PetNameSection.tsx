import React from "react"
import { Input } from "react-native-elements"
import Transition from "../../../components/Transition"
import { DividerBlock, Text } from "../../../styles"
import { ItemBlock, RegistPetStep } from "../RegistrationPet"

export default function PetNameSection({ petName, setPetName, isError }: {
    petName: string
    setPetName: React.Dispatch<React.SetStateAction<string>>
    isError: RegistPetStep | ''
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
                <DividerBlock marginTop={32} />
                <Input
                    maxLength={16}
                    containerStyle={{
                        paddingHorizontal: 20,
                    }}
                    placeholder="예) 바오, 순철이, 나옹이"
                    value={petName}
                    onChangeText={setPetName}
                    errorMessage={isError === 'PET_NAME' && !petName ? '이름을 입력해주세요' : ''}
                />
            </ItemBlock>
        </Transition>
    )
}
