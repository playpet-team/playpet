import { useTheme } from "@react-navigation/native";
import React from "react";
import { Control, Controller } from "react-hook-form";
import styled from "styled-components/native";
import { DividerBlock, Text } from "../../../styles";
import { PetTypes } from "../../../utils/product";
import { ItemBlock, PetItems } from "../SignInAdditionalInformation";

export const PET_TYPE: ['DOG', 'CAT', 'ETC', 'NOT_YET'] = [
    'DOG',
    'CAT',
    'ETC',
    'NOT_YET',
]
export const DefaultSize: { [key: string]: string } = {
    S: '소형(~7kg)',
    M: '중형(~20kg)',
    L: '소형(20kg~)',
} as const
export const DefaultAge: { [key: string]: string } = {
    BABY: '5개월 이하',
    ADULT: '5개월 이상',
    OLD: '8세 이상',
} as const
export default function PetAdditionalType({ openItem, petType, control }: {
    openItem: PetItems
    petType: PetTypes
    control: Control<Record<string, any>>
}) {
    const theme = useTheme();

    return (
        <ItemBlock display={openItem === 'PetAdditionalType'}>
                {petType === 'DOG' &&
                    <PetSize>
                        <Label bold size={16}>견종 사이즈</Label>
                        <Controller
                            control={control}
                            render={({ value, onChange }) => (
                                <ItemWrapper>
                                    {Object.keys(DefaultSize).map(size => (
                                        <TypeItem
                                            onPress={() => onChange(size)}
                                            key={size}
                                            activeType={value === size}
                                            primary={theme.colors.primary}
                                        >
                                            <Text size={16}>{DefaultSize[size]}</Text>
                                        </TypeItem>
                                    ))}
                                </ItemWrapper>
                            )}
                            name="size"
                            rules={{ required: true, }}
                            defaultValue=""
                        />
                        
                        <DividerBlock marginTop={16} />
                    </PetSize>
                }
                <PetAge>
                    <Label bold size={16}>나이</Label>
                    <Controller
                        control={control}
                        render={({ value, onChange }) => (
                            <ItemWrapper>
                                {Object.keys(DefaultAge).map(age => (
                                    <TypeItem
                                        onPress={() => onChange(age)}
                                        key={age}
                                        activeType={value === age}
                                        primary={theme.colors.primary}
                                    >
                                        <Text size={16}>{DefaultAge[age]}</Text>
                                    </TypeItem>
                                ))}
                            </ItemWrapper>
                        )}
                        name="age"
                        rules={{ required: true, }}
                        defaultValue=""
                    />
                </PetAge>
        </ItemBlock>
    )
}

const Wrapper = styled.View`
    justify-content: center;
    flex-direction: column;
    padding: 24px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: 100%;
    margin-bottom: 36px;
`

const Label = styled(Text)`
    width: 100px;
`

const PetSize = styled.View`
    flex-direction: row;
    /* margin-bottom: 36px; */
    align-items: center;
    /* flex: 1; */
`

const PetAge = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
`

const ItemWrapper = styled.View`
    /* width: 60%; */
    flex-direction: column;
    justify-content: center;
`

export const TypeItem = styled.TouchableOpacity<{ activeType: boolean; primary: string; }>`
    padding: 8px;
    border-radius: 16px;
    /* width: 35px; */
    /* height: 35px; */
    align-items: center;
    justify-content: center;
    /* margin-left: 20px; */
    margin-top: 16px;
    background-color: ${({ activeType, primary }) => activeType ? primary : '#eee'};
`