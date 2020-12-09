import React, { useMemo } from "react"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { useTheme } from "styled-components"
import styled from "styled-components/native"
import Transition from "../../../components/Transition"
import { petTypeToListMaps } from "../../../models"
import { Text } from "../../../styles"
import { PetTypes } from "../../../utils"
import { ItemBlock } from "../RegistrationPet"

export default function PetKindSection({ petType, petKind, setPetKind }: {
    petType: PetTypes
    petKind: string
    setPetKind: React.Dispatch<React.SetStateAction<string>>
}) {
    const theme = useTheme()
    const listByPetType = useMemo(() => {
        return petTypeToListMaps[petType] || []
    }, [petType])

    const renderType = (item: string) => {
        return (
            <TouchableOpacity
                onPress={() => setPetKind(item)}
                style={{
                    backgroundColor: item === petKind ? `${theme.colors.primary}33` : 'transparent',
                    padding: 16,
                    borderRadius: 4,
                }}
            >
                <Text size={15}>{item}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Transition>
            <ItemBlock>
                <Text
                    align="center"
                    size={18}
                    bold
                >
                    반려동물의 종류를 알려주세요
                </Text>
                <PetListBlock>
                    <FlatList
                        data={listByPetType}
                        keyExtractor={type => type}
                        renderItem={({ item }) => renderType(item)}
                    />
                </PetListBlock>
            </ItemBlock>
        </Transition>
    )
}

const PetListBlock = styled.View`
    padding: 12px;
`
