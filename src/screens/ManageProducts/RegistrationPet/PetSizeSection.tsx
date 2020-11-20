import { useTheme } from "@react-navigation/native";
import React from "react";
import { Control, Controller } from "react-hook-form";
import styled from "styled-components/native";
import { DividerBlock, Text } from "../../../styles";
import { PetTypes } from "../../../utils/product";
import { ItemBlock, TypeItem, ItemWrapper } from "../RegistrationPet";


export type PetSize = 'S' | 'M' | 'L' | ''
export const PetSizes: ['S', 'M', 'L'] = [
    'S',
    'M',
    'L',
]

const sizeNameMap = {
    '': {
        title: '아기견',
        description: '소형(~7kg)',
    },
    S: {
        title: '아기견',
        description: '소형(~7kg)',
    },
    M: {
        title: '성견',
        description: '중형(~20kg)',
    },
    L: {
        title: '노령견',
        description: '대형(20kg~)',
    },
}

export default function PetSizeSection({ petSize, setPetSize }: {
    petSize: PetSize
    setPetSize: React.Dispatch<React.SetStateAction<any>>
}) {
    const theme = useTheme();
    console.log('petsize')

    return (
        <ItemBlock>
            <PetSize>
                <Label bold size={16}>견종 사이즈</Label>
                <ItemWrapper>
                    {PetSizes.map(size => (
                        <TypeItem
                            onPress={() => setPetSize(size)}
                            key={size}
                            isActive={petSize === size}
                            primary={theme.colors.primary}
                        >
                            <Text size={16}>{sizeNameMap[size].title}</Text>
                            <Text size={16}>{sizeNameMap[size].description}</Text>
                        </TypeItem>
                    ))}
                </ItemWrapper>
                <DividerBlock marginTop={16} />
            </PetSize>
            <DividerBlock marginBottom={8} />
        </ItemBlock>
    )
}

const Label = styled(Text)`
    width: 100px;
`

const PetSize = styled.View`
    align-items: center;
`
