import { useTheme } from "@react-navigation/native"
import React, { useCallback, useState } from "react"
import styled from 'styled-components/native'
import Transition from "../../../components/Transition"
import { DividerBlock, Text } from "../../../styles"
import { Step } from "../SignInAdditionalInformation"
import SelectYourPetType from "./PetType/SelectYourPetType"


export const PET_TYPE = {
    DOG: '강아지',
    CAT: '고양이',
    ETC: '기타',
    NOT_YET: '아직 없어요!',
}

export const SIZE = [
    'S',
    'M',
    'L',
]
export default function PetType({ currentStep, petType, setPetType, searchPetType, setSearchPetType, size, setSize, valid }: {
    currentStep: Step
    petType: string
    setPetType: React.Dispatch<React.SetStateAction<string>>
    searchPetType: string
    setSearchPetType: React.Dispatch<React.SetStateAction<string>>
    size: string
    setSize: React.Dispatch<React.SetStateAction<string>>
    valid: boolean
}) {
    if (currentStep !== Step.PET_TYPE) {
        return null
    }

    const [searchPetTyping, setSearchPetTyping] = useState('')

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
        <PetTypeBlock>
            <DividerBlock marginBottom={8} />
            <Text
                bold
                size={20}
            >
                어떤 반려동물인가?
            </Text>
            <DividerBlock marginTop={8} />
            
            <SelectYourPetType
                petType={petType}
                setPetType={setPetType}
                searchPetTyping={searchPetTyping}
                setSearchPetTyping={setSearchPetTyping}
                searchPetType={searchPetType}
                setSearchPetType={setSearchPetType}
                getPetKey={getPetKey}
            />
            {Boolean(getPetKey() === 'DOG' && searchPetType.length) &&
                <Transition type="fade-bottom">
                    <PetSize>
                        <Text bold size={16}>견종 사이즈</Text>
                        {SIZE.map(sizeType => (
                            <SizeType
                                onPress={() => setSize(sizeType)}
                                key={sizeType}
                                activeType={size === sizeType}
                                primary={theme.colors.primary}
                            >
                                <Text size={16}>{sizeType}</Text>
                            </SizeType>
                        ))}
                        
                    </PetSize>
                </Transition>
            }
        </PetTypeBlock>
    )
}

const PetTypeBlock = styled.View`
    height: 100%;
`
const PetSize = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 24px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    /* background-color: #fffffe; */
`

const SizeType = styled.TouchableOpacity<{ activeType: boolean; primary: string; }>`
    padding: 8px;
    border-radius: 16px;
    width: 35px;
    height: 35px;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    background-color: ${({ activeType, primary }) => activeType ? primary : '#eee'};
`

