import React from "react"
import { useTheme } from "styled-components"
import styled from "styled-components/native"
import Transition from "../../../components/Transition"
import { DividerBlock, Text } from "../../../styles"
import { ItemBlock, RegistPetStep } from "../RegistrationPet"
import { Input } from "react-native-elements"

function PetWeightSection({ petWeight, setPetWeight, isError }: {
    petWeight: string
    setPetWeight: React.Dispatch<React.SetStateAction<string>>
    isError: RegistPetStep | ''
}) {
    const theme = useTheme()

    return (
        <Transition>
            <ItemBlock>
                <Text
                    align="center"
                    size={18}
                    bold
                >
                    반려동물의 체중을 알려주세요
                </Text>
                <DividerBlock marginTop={8} />
                <Text
                    align="center"
                    size={14}
                    color={theme.colors.placeholder}
                >
                    사료를 선택하기 위한 필수 사항입니다
                </Text>
                <DividerBlock marginTop={32} />
                <InputBlock>
                    <Input
                        containerStyle={{
                            paddingHorizontal: 20,
                            width: 100,
                        }}
                        inputContainerStyle={{
                            borderBottomWidth: isError ? 1 : 0,
                            borderColor: '#ff0000',
                        }}
                        errorStyle={{
                            display: 'none'
                        }}
                        placeholder="3.4"
                        value={petWeight}
                        onChangeText={setPetWeight}
                    />
                    <Text size={16}>kg</Text>
                </InputBlock>
            </ItemBlock>
        </Transition>
    )
}

export default PetWeightSection

const InputBlock = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
