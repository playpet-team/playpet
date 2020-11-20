import React from "react";
import { Image } from "react-native-elements";
import styled from "styled-components/native";
import { DividerBlock, Text } from "../../../styles";

export default function WelcomeSign() {
    return (
        <WelcomeSignBlock>
            <Text size={18} bold>
                5초만에 등록하기
            </Text>
            <DividerBlock marginTop={24} />
            <Text size={16} align="center">
                양육하는 반려동물의 정보를 등록해주시면{'\n'}
                정보에 맞는 용품으로 선별해드립니다.
            </Text>
            <DividerBlock marginBottom={44} />
        </WelcomeSignBlock>
    )
}

const WelcomeSignBlock = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

// const WelcomeImage = styled(Image)`
//     margin-top: 24px;
//     width: 300px;
//     height: 266px;
// `
