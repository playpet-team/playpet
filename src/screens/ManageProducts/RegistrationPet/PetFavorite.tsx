import { useTheme } from "@react-navigation/native";
import React from "react";
import { Control, Controller } from "react-hook-form";
import styled from "styled-components/native";
import Transition from "../../../components/Transition";
import { Text } from "../../../styles";
import { ItemBlock, PetItems } from ".";
import { TypeItem } from './PetAgeSection';

export const Favorites: { [key: string]: string } = {
    FOOTS: '사료, 간식',
    TOYS: '장난감, 놀이',
    HEALTH: '건강',
    ETC: '기타'
} as const
export default function PetFavorite({ openItem, control }: {
    openItem: PetItems
    control: Control<Record<string, any>>
}) {
    const theme = useTheme();
    return (
        <ItemBlock display={openItem === 'PetFavorite'}>
            <Transition>
                <PetFavoriteBlock>
                    <Controller
                        control={control}
                        render={({ value, onChange }) => (
                            <>
                                {Object.keys(Favorites).map(favorite => (
                                    <TypeItem
                                        onPress={() => onChange(favorite)}
                                        key={favorite}
                                        activeType={value === favorite}
                                        primary={theme.colors.primary}
                                    >
                                        <Text size={16}>{Favorites[favorite]}</Text>
                                    </TypeItem>
                                ))}
                            </>
                        )}
                        name="favorite"
                        rules={{ required: true, }}
                        defaultValue=""
                    />
                </PetFavoriteBlock>
            </Transition>
        </ItemBlock>
    )
}

const PetFavoriteBlock = styled.View`
    flex-direction: row;
`