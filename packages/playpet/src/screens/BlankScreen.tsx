import React from 'react';
import styled from '@emotion/native';
import { Text } from 'react-native';
import Card from '../components/Card';

export default function BlankScreen() {
    return (
        <BlankBlock>
            <Text>BlankScreen</Text>
            <Card />
        </BlankBlock>
    );
};

const BlankBlock = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
