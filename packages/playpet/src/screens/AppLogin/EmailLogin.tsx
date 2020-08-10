import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

export default function EmailLogin() {
    return (
        <EmailLoginBlock>
            <Text>email</Text>
            <Text>password</Text>
        </EmailLoginBlock>
    )
};

const EmailLoginBlock = styled.View`
    flex: 1;
`;
