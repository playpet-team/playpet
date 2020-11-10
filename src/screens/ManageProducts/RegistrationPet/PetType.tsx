import { useTheme } from "@react-navigation/native"
import React from "react"
import { Control, Controller } from "react-hook-form"
import { Image } from "react-native"
import styled, { css } from 'styled-components/native'
import { DividerBlock } from "../../../styles"
import { ItemBlock, PetItems } from "."
import { PET_TYPE } from "./PetAdditionalType"

const petSrcMap: any = {
    dog: require('../../../../assets/images/dog_default_thumb.jpg'),
    cat: require('../../../../assets/images/cat_default_thumb.jpg'),
    // etc: require('../../../../assets/images/etc_default_thumb.jpg'),
    // not_yet: require('../../../../assets/images/not_yet_default_thumb.jpg'),
}

export default function PetType({ control, openItem }: {
    control: Control<Record<string, any>>
    openItem: PetItems
}) {
    const theme = useTheme()

    return (
        <ItemBlock display={openItem === 'PetType'}>
            <Controller
                control={control}
                render={({ value, onChange }) => (
                    <PetIcons>
                        {PET_TYPE.map(pet => (
                            <Pet
                                key={pet}
                                onPress={() => onChange(pet)}
                                primary={theme.colors.primary}
                                active={value === pet}
                            >
                                <PetThumb source={petSrcMap[pet.toLowerCase()]} />
                            </Pet>
                        ))}
                    </PetIcons>
                )}
                name="petType"
                rules={{ required: true }}
                defaultValue=""
            />
            <DividerBlock marginBottom={8} />
        </ItemBlock>
    )
}

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
