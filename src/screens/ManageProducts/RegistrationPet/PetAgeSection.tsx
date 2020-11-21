import { useTheme } from "@react-navigation/native";
import React from "react";
import styled, { css } from "styled-components/native";
import { DividerBlock, Text } from "../../../styles";
import { ItemBlock, TypeItem, ItemWrapper } from "../RegistrationPet";

export type PetAge = 'BABY' | 'ADULT' | 'OLD' | ''
export const DefaultPetAges: ['BABY', 'ADULT', 'OLD'] = [
    'BABY',
    'ADULT',
    'OLD',
]

export const ageNameMap = {
    '': {
        title: '아기견',
        description: '5개월 이하',  
    },
    BABY: {
        title: '아기견',
        description: '5개월 이하',
    },
    ADULT: {
        title: '성견',
        description: '5개월 이상',
    },
    OLD: {
        title: '노령견',
        description: '8세 이상',
    },
}

export default function PetAgeSection({ petAge, setPetAge, isError }: {
    petAge: PetAge
    setPetAge: React.Dispatch<React.SetStateAction<any>>
    isError: boolean
}) {
    const theme = useTheme();

    return (
        <ItemBlock>
            <PetAgeBlock>
                <Text
                    align="center"
                    size={18}
                    bold
                >
                    반려동물의 나이를 알려주세요.
                </Text>
                <DividerBlock marginTop={16} />
                <Text
                    size={16}
                    align="center"
                    color={theme.colors.placeholder}
                >
                    사료를 선택하기 위한 필수 사항입니다.
                </Text>
                <DividerBlock marginTop={30} />
                <ItemWrapper>
                    {DefaultPetAges.map(age => (
                        <TypeItem
                            onPress={() => setPetAge(age)}
                            key={age}
                            isActive={petAge === age}
                            primary={theme.colors.primary}
                        >
                            <Text size={16}>{ageNameMap[age].title}</Text>
                            <Text size={14}>{ageNameMap[age].description}</Text>
                        </TypeItem>
                    ))}
                </ItemWrapper>
            </PetAgeBlock>
            <DividerBlock marginBottom={8} />
        </ItemBlock>
    )
}

const Label = styled(Text)`
    width: 100px;
`

const PetAgeBlock = styled.View`
    display: flex;
    align-items: center;
    flex: 1;
`
