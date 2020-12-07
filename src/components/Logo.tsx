import React from 'react';
import styled from 'styled-components/native';

interface LogoProps {
    width?: number;
}
function Logo({ width = 180 }: LogoProps) {
    return (
        <LogoBlock
            source={require('../../assets/images/logo_playpet_color.png')}
            width={width}
        />
    )
}

export default Logo;

const LogoBlock = styled.Image<LogoProps>`
    margin-top: 24px;
    height: ${({ width = 120 }) => width * 0.25}px;
    resize-mode: contain;
`;
