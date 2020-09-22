import React, { useCallback, useState } from "react"
import styled from 'styled-components/native'
import { DividerBlock, Text } from "../../../styles"
import { Step } from "../SignInAdditionalInformation"
import { PET_TYPE } from "./PetAdditionalType"
import SelectYourPetType from "./PetType/SelectYourPetType"

export default function PetType({ currentStep, petType, setPetType, searchPetType, setSearchPetType, valid }: {
    currentStep: Step
    petType: string
    setPetType: React.Dispatch<React.SetStateAction<string>>
    searchPetType: string
    setSearchPetType: React.Dispatch<React.SetStateAction<string>>
    valid: boolean
}) {
    // if (currentStep !== Step.PET_TYPE) {
    //     return null
    // }

    const [searchPetTyping, setSearchPetTyping] = useState('')

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
                    
        </PetTypeBlock>
    )
}

const PetTypeBlock = styled.View`
    /* height: 100%; */
`
