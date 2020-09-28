import React from "react";
import { Image } from "react-native-elements";
import styled from "styled-components/native";
import { DividerBlock, Text } from "../../../styles";

export default function WelcomeSign() {
    return (
        <WelcomeSignBlock>
            <Text size={23} bold>
                가입을 축하드려요
            </Text>
            <DividerBlock marginTop={24} />
            <Text size={16} align="center">
                키우시는 반려동물에 대한 정보를{'\n'}
                적어주시면 아이를 위한 맞춤 정보를 드립니다.
            </Text>
            <WelcomeImage
                source={require('../../../../assets/images/welcome.jpg')}
            />
            <DividerBlock marginBottom={44} />
        </WelcomeSignBlock>
    )
}

const WelcomeSignBlock = styled.View`
    justify-content: center;
    align-items: center;
`

const WelcomeImage = styled(Image)`
    margin-top: 24px;
    width: 300px;
    height: 266px;
`
