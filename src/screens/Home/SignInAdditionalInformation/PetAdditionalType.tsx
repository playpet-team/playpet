import { useTheme } from "@react-navigation/native";
import React, { useCallback } from "react";
import styled from "styled-components/native";
import { DividerBlock, Text } from "../../../styles";
import { Step } from "../SignInAdditionalInformation";

export const PET_TYPE = {
    DOG: '강아지',
    CAT: '고양이',
    ETC: '기타',
    NOT_YET: '아직 없어요!',
} as const
export const DefaultSize: { [key: string]: string } = {
    S: '소형견(7kg 미만)',
    M: '중형견(20kg 미만)',
    L: '소형견(20kg 이상)',
} as const
export const DefaultAge: { [key: string]: string } = {
    BABY: '5개월 이하',
    ADLUT: '5개월 이상',
    OLD: '8세 이상',
} as const
export default function PetAdditionalType({ currentStep, valid, petType, size, setSize, age, setAge }: {
    currentStep: Step
    valid: boolean
    petType: string
    size: string
    setSize: React.Dispatch<React.SetStateAction<string>>
    age: string
    setAge: React.Dispatch<React.SetStateAction<string>>
}) {
    // if (currentStep !== Step.PET_ADDITIONAL_TYPE) {
    //     return null
    // }

    const theme = useTheme();

    const getPetKey = useCallback(() => {
        let petKey = ''
        for (const [key, value] of Object.entries(PET_TYPE)) {
            if (value === petType) {
                petKey = key
                break
            }
        }
        return petKey
    }, [petType])

    return (
        <PetAdditionalTypeBlock>
            <Wrapper>
                <DividerBlock marginBottom={8} />
                <Text
                    bold
                    size={20}
                >
                    추가정보를 입력해주세요
                </Text>
                <DividerBlock marginTop={8} />

                {getPetKey() === 'DOG' &&
                    <PetSize>
                        <Text bold size={16}>견종 사이즈</Text>
                        {Object.keys(DefaultSize).map(size => (
                            <TypeItem
                                onPress={() => setSize(size)}
                                key={size}
                                activeType={size === size}
                                primary={theme.colors.primary}
                            >
                                <Text size={16}>{DefaultSize[size]}</Text>
                            </TypeItem>
                        ))}
                        <DividerBlock marginTop={16} />
                    </PetSize>
                }
                <PetAge>
                    <Text bold size={16}>나이</Text>
                    {Object.keys(DefaultAge).map(age => (
                        <TypeItem
                            onPress={() => setSize(age)}
                            key={age}
                            activeType={size === age}
                            primary={theme.colors.primary}
                        >
                            <Text size={16}>{DefaultAge[age]}</Text>
                        </TypeItem>
                    ))}
                </PetAge>
            </Wrapper>
        </PetAdditionalTypeBlock>
    )
}

const PetAdditionalTypeBlock = styled.View`
    /* height: 100%; */
`

const Wrapper = styled.View`
    justify-content: center;
    flex-direction: column;
    padding: 24px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: 100%;
    margin-bottom: 36px;

`

const PetSize = styled.View`
    flex-direction: row;
    margin-bottom: 36px;
    align-items: center;
    /* flex: 1; */
`

const PetAge = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    /* flex: 1; */
`

const PetTypeWrapper = styled.View`
    flex-direction: row;
`

const TypeItem = styled.TouchableOpacity<{ activeType: boolean; primary: string; }>`
    padding: 8px;
    border-radius: 16px;
    width: 35px;
    height: 35px;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    background-color: ${({ activeType, primary }) => activeType ? primary : '#eee'};
`