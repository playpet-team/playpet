import React from "react"
import { Control, Controller } from "react-hook-form"
import { Image } from "react-native"
import styled, { css, useTheme } from 'styled-components/native'
import { DividerBlock, Text } from "../../../styles"
import { ItemBlock } from "."
import { PetTypes } from "../../../utils/product"
import Transition from "../../../components/Transition"

export const PET_TYPE: ['DOG', 'CAT'] = [
    'DOG',
    'CAT',
]

const petSrcMap: any = {
    dog: require('../../../../assets/images/dog_default_thumb.jpg'),
    cat: require('../../../../assets/images/cat_default_thumb.jpg'),
}

export default function PetType({ petType, setPetType }: {
    petType: PetTypes
    setPetType: React.Dispatch<React.SetStateAction<PetTypes>>
}) {
    const theme = useTheme()

    return (
        <ItemBlock>
            <Text
                align="center"
                size={18}
                bold
            >
                5초만에 등록하기
            </Text>
            <DividerBlock marginTop={24} />
            <Text size={16} align="center">
                양육하는 반려동물의 정보를 등록해주시면{'\n'}
                정보에 맞는 용품으로 선별해드립니다.
            </Text>
            <DividerBlock marginBottom={44} />
            <Transition>
            <PetIcons>
                {PET_TYPE.map(pet => (
                    <Pet
                        key={pet}
                        onPress={() => setPetType(pet)}
                        active={petType === pet}
                    >
                        <PetThumb source={petSrcMap[pet.toLowerCase()]} />
                        <DividerBlock marginBottom={30} />
                        <Text size={20}>{pet === 'DOG' ? '반려견' : '반려묘'}</Text>
                        <Select active={petType === pet}>
                            <Text
                                color={petType === pet ? theme.colors.primary : theme.colors.placeholder}
                                bold={petType === pet}
                                size={14}
                            >
                                선택
                            </Text>
                        </Select>
                    </Pet>
                ))}
            </PetIcons>
            </Transition>
            <DividerBlock marginBottom={8} />
        </ItemBlock>
    )
}

const PetIcons = styled.View`
    /* flex-wrap: wrap; */
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
`

const Pet = styled.TouchableOpacity<{ active: boolean }>`
    width: 47%;
    height: 350px;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.border};
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.05);

    ${({ active }) => active && css`
        border-width: 2px;
        background-color: ${({ theme }) => theme.colors.white};
        border-color: ${({ theme }) => theme.colors.primary};
    `}
`

const Select = styled.View<{ active: boolean }>`
    align-items: center;
    width: 100%;
    padding: 24px;
    position: absolute;
    bottom: 0;

    border-color: ${({ theme }) => theme.colors.border};
    background-color: rgba(0, 0, 0, 0.05);
    border-top-width: 1px;

    ${({ active }) => active && css`
        border-color: ${({ theme }) => theme.colors.primary};
    `}

`

const PetThumb = styled(Image)`
    border-radius: 60px;
    overflow: hidden;
    width: 120px;
    height: 120px;
`
