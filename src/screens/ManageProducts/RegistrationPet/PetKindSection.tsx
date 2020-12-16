import React, { useEffect, useMemo, useState } from "react"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { useTheme } from "styled-components"
import styled from "styled-components/native"
import Transition from "../../../components/Transition"
import { Collections, PetInformation } from "../../../models"
import { DividerBlock, Text } from "../../../styles"
import { PetTypes } from "../../../utils"
import { ItemBlock, RegistPetStep } from "../RegistrationPet"
import firestore from '@react-native-firebase/firestore'
import useLoadingIndicator from "../../../hooks/useLoadingIndicator"
import * as Sentry from "@sentry/react-native";
import { Input } from "react-native-elements"

export default function PetKindSection({ petType, petKind, setPetKind, isError }: {
    petType: PetTypes
    petKind: PetInformation | null
    setPetKind: React.Dispatch<React.SetStateAction<PetInformation | null>>
    isError: RegistPetStep | ''
}) {
    const [searchInputName, setSearchInputName] = useState('')
    const theme = useTheme()
    const [petList, setPetList] = useState<PetInformation[]>([])
    const { loading, setLoading, Indicator } = useLoadingIndicator()

    useEffect(() => {
        loadPetInformation()
        async function loadPetInformation() {
            setLoading(true)
            try {
                const information = await firestore()
                    .collection(Collections.PetInformation)
                    .where('type', '==', petType)
                    .orderBy('name', 'asc')
                    .get()

                if (information.size) {
                    const pets = information.docs.map(pet => pet.data() as PetInformation)
                    setPetList(pets)
                }
            } catch (e) {
                Sentry.captureException(e)
            } finally {
                setLoading(false)
            }
        }
    }, [])

    const renderType = (item: PetInformation) => {
        const isActive = item.id === petKind?.id
        return (
            <TouchableOpacity
                onPress={() => setPetKind(item)}
                style={{
                    backgroundColor: isActive ? `${theme.colors.primary}33` : 'transparent',
                    padding: 16,
                    borderRadius: 4,
                }}
            >
                <Text size={15}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const searchByPetList = useMemo(() => {
        if (searchInputName) {
            return petList.filter(item => item.name.indexOf(searchInputName) > -1)
        }
        return petList
    }, [searchInputName, petList])


    return (
        <Transition>
            <ItemBlock>
                {loading && <Indicator />}
                <Text
                    align="center"
                    size={18}
                    bold
                >
                    반려동물의 종류를 알려주세요
                </Text>
                <DividerBlock height={8} />
                <Input
                    containerStyle={{
                        paddingHorizontal: 20,
                    }}
                    placeholder="푸들"
                    value={searchInputName}
                    onChangeText={setSearchInputName}
                />
                <PetListBlock>
                    <FlatList
                        data={searchByPetList}
                        keyExtractor={item => item.id}
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
