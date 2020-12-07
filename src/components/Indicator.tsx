import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Modal } from 'react-native';

function Indicator() {
    return (
        <Modal
            transparent={true}
            visible={true}
        >
            <IndicatorBlock>
                <ActivityIndicator size="large" color="white" />
            </IndicatorBlock>
        </Modal>
    );
};

export default Indicator

const IndicatorBlock = styled.View`
    flex: 1;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
`;