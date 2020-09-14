import React from "react"
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
export default function PetFavorite({ currentStep, favorite, setFavorite, valid }: {
    currentStep: Step
    favorite: string
    setFavorite: React.Dispatch<React.SetStateAction<string>>
    valid: boolean
}) {
    if (currentStep !== Step.PET_FAVORITE) {
        return null
    }

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