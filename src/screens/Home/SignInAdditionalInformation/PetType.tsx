import { useTheme } from "@react-navigation/native"
import React, { useState } from "react"
import { Image } from "react-native"
import styled, { css } from 'styled-components/native'
import Transition from "../../../components/Transition"
import { DividerBlock } from "../../../styles"
import { PetTypes } from "../../../utils/product"
import { PET_TYPE } from "./PetAdditionalType"

const petSrcMap: any = {
    dog: require('../../../../assets/images/dog_default_thumb.jpg'),
    cat: require('../../../../assets/images/cat_default_thumb.jpg'),
    etc: require('../../../../assets/images/etc_default_thumb.jpg'),
    not_yet: require('../../../../assets/images/not_yet_default_thumb.jpg'),
}

export default function PetType({ petType, setPetType, valid }: {
    petType: PetTypes
    setPetType: React.Dispatch<React.SetStateAction<"" | "DOG" | "CAT" | "ETC" | "NOT_YET">>
    valid: string[]
}) {
    const [searchPetTyping, setSearchPetTyping] = useState('')
    const theme = useTheme()

    return (
        <Transition>
            <PetTypeBlock>
                <DividerBlock marginTop={16} />
                <PetIcons>
                    {PET_TYPE.map(pet => (
                        <Pet
                            onPress={() => setPetType(pet)}
                            primary={theme.colors.primary}
                            active={petType === pet}
                        >
                            <PetThumb
                                source={petSrcMap[pet.toLowerCase()]}
                            />
                        </Pet>
                    ))}
                </PetIcons>
            </PetTypeBlock>
        </Transition>
    )
}

const PetTypeBlock = styled.View`
    /* height: 100%; */
`

const PetIcons = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
`

const Pet = styled.TouchableOpacity<{ active: boolean; primary: string; }>`
    width: 48%;
    height: 200px;
    align-items: center;
    justify-content: center;

    ${({ active }) => active && css`
        /* border-width: 1px; */
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        
    `}
`

const PetThumb = styled(Image)`
    border-radius: 60px;
    overflow: hidden;
    width: 120px;
    height: 120px;
`
