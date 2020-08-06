import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

function useLoadingIndicator() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!loading) {
            return;
        }
    }, [loading]);

    return {
        loading,
        setLoading,
        Indicator
    };
};

export default useLoadingIndicator;

function Indicator() {
    return (
        <IndicatorBlock>
            <ActivityIndicator size="large" />
        </IndicatorBlock>
    );
};

const IndicatorBlock = styled.View`
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
`;