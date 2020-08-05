import React from 'react';
import styled from '@emotion/native';
import { Text } from 'react-native';
import Card from '../components/Card';

export default function PlayGroundScreen() {
    return (
        <PlayGroundBlock>
            <Text>PlayGroundScreen</Text>
            <Card />
        </PlayGroundBlock>
    );
};

const PlayGroundBlock = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
