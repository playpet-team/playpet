import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';

export default function Home() {
    return (
        <SafeAreaView>
            <HomeBlock>
                <Text>aoeu홈</Text>
            </HomeBlock>
        </SafeAreaView>
    );
};

const HomeBlock = styled.View``;