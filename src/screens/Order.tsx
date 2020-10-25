import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Text } from '../styles';

export default function Order() {
    return (
        <SafeAreaViewBlock>
            <Text>Order</Text>
        </SafeAreaViewBlock>
    )
}

const SafeAreaViewBlock = styled(SafeAreaView)`
    flex: 1;
`
