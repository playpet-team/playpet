import React, { useState } from "react"
import { View } from "react-native"
import ButtonGroups from "../../../components/ButtonGroups"
import { Text } from "../../../styles"
import { Step } from "../SignInAdditionalInformation"

export const FAVORITE = [
    'FOODS',
    'TOYS',
    'HEALTH',
    'ETC',
]
export default function PetFavorite({ step }: { step: number }) {
    if (step !== Step.PET_FAVORITE) {
        return null
    }
    const [favorite, setFavorite] = useState('')


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