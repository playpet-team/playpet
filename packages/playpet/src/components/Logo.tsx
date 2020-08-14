import React from 'react';
import styled from 'styled-components/native';

interface LogoProps {
    width?: number;
}
function Logo({ width = 120 }: LogoProps) {
    return (
        <LogoBlock
            source={require('../../assets/images/playpet_logo.png')}
            width={width}
            resizeMode="contain"
        />
    )
}

export default Logo;

const LogoBlock = styled.Image<LogoProps>`
    margin-top: 24px;
    height: ${({ width }) => width * 0.3}px;
    resize-mode: contain;
`;
