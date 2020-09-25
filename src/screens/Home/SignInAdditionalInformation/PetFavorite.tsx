import React from "react"
import { View } from "react-native"
import ButtonGroups from "../../../components/ButtonGroups"
import Transition from "../../../components/Transition"

export const FAVORITE = [
    'FOODS',
    'TOYS',
    'HEALTH',
    'ETC',
]
export default function PetFavorite({ favorite, setFavorite }: {
    favorite: string
    setFavorite: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <View>
            <Transition>
                <ButtonGroups
                    buttons={FAVORITE}
                    onSelect={setFavorite}
                    containerStyle={{
                        width: '100%',
                    }}
                />
            </Transition>
        </View>
    )
}
