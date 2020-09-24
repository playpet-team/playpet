import React from "react"
import { View } from "react-native"
import ButtonGroups from "../../../components/ButtonGroups"
import { Text } from "../../../styles"

export const FAVORITE = [
    'FOODS',
    'TOYS',
    'HEALTH',
    'ETC',
]
export default function PetFavorite({ favorite, setFavorite, valid }: {
    favorite: string
    setFavorite: React.Dispatch<React.SetStateAction<string>>
    valid: boolean
}) {
    return (
        <View>
            <Text bold size={16}>관심 분야?</Text>
            <ButtonGroups
                buttons={FAVORITE}
                onSelect={setFavorite}
                containerStyle={{
                    width: '100%',
                }}
            />
        </View>
    )
}
