import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";
import { Text } from "../../../styles";
import { Step } from "../SignInAdditionalInformation";

export default function CheckMyInformation({
    currentStep,
    petName,
    petType,
    searchPetType,
    size,
    favorite,
}: {
    currentStep: Step
    petName: string
    petType: string
    searchPetType: string
    size: string
    favorite: string
}) {
    if (currentStep !== Step.CHECK_MY_INFORMATION) {
        return null;
    }

    return (
        <View>
            <Input
                disabled={true}
                label="아이 이름을 알려주세요"
                value={petName}
            />
            <Input
                disabled={true}
                label="어떤 반려동물인가요?"
                value={petType}
            />
            <Input
                disabled={true}
                label="품종이라고 하나?"
                value={searchPetType}
            />
            {Boolean(size) && <Input
                disabled={true}
                label="견종 사이즈"
                value={size}
            />}
            <Input
                disabled={true}
                label="관심사"
                value={favorite}
            />
            <Text>맞으시다면 다음!</Text>
        </View>
    );
}