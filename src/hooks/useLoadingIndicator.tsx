import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Modal } from 'react-native';

function useLoadingIndicator() {
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (!loading) {
    //         return;
    //     }
    // }, [loading]);

    return {
        loading,
        setLoading,
        Indicator
    };
};

export default useLoadingIndicator;

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

const IndicatorBlock = styled.View`
    flex: 1;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
`;