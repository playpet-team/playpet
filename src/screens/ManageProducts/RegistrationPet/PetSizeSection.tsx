import React from "react";
import { Control, Controller } from "react-hook-form";
import styled, { useTheme } from "styled-components/native";
import { DividerBlock, Text } from "../../../styles";
import { PetTypes } from "../../../utils/product";
import { ItemBlock, TypeItem, ItemWrapper } from "../RegistrationPet";


export type PetSize = 'S' | 'M' | 'L' | ''
export const DefaultPetSizes: ['S', 'M', 'L'] = [
    'S',
    'M',
    'L',
]

export const sizeNameMap = {
    '': {
        title: '소형견',
        description: '소형(~7kg)',
    },
    S: {
        title: '소형견',
        description: '소형(~7kg)',
    },
    M: {
        title: '중형견',
        description: '중형(~20kg)',
    },
    L: {
        title: '대형견',
        description: '대형(20kg~)',
    },
}

export default function PetSizeSection({ petSize, setPetSize, isError }: {
    petSize: PetSize
    setPetSize: React.Dispatch<React.SetStateAction<any>>
    isError: boolean
}) {
    const theme = useTheme();

    return (
        <ItemBlock>
            <PetSizeBlock>
                <Text
                    align="center"
                    size={18}
                    bold
                >
                    반려동물의 체구를 알려주세요.
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
                    {DefaultPetSizes.map(size => (
                        <TypeItem
                            onPress={() => setPetSize(size)}
                            key={size}
                            isActive={petSize === size}
                            primary={theme.colors.primary}
                        >
                            <Text size={16}>{sizeNameMap[size].title}</Text>
                            <Text size={14}>{sizeNameMap[size].description}</Text>
                        </TypeItem>
                    ))}
                </ItemWrapper>
            </PetSizeBlock>
            <DividerBlock marginBottom={8} />
        </ItemBlock>
    )
}

const Label = styled(Text)`
    width: 100px;
`

const PetSizeBlock = styled.View`
    display: flex;
    align-items: center;
    flex: 1;
`
