import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import PlaypetDialog from './PlaypetDialog';
import { Text } from 'react-native-elements';

export default function AppLogin() {

    return (
        <AppLoginBlock>

            <Text>내용</Text>
        </AppLoginBlock>
    )
};

const AppLoginBlock = styled.View``;