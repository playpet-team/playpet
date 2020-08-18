import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

export default function AppLoginAgreeTerms() {
    const navigation = useNavigation();

    return (
        <AppLoginAgreeTermsBlock>

        </AppLoginAgreeTermsBlock>
    )
};

const AppLoginAgreeTermsBlock = styled.View`
    flex: 1;
`;
