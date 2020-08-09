import styled, { css } from 'styled-components/native';
import { Divider } from 'react-native-elements';

interface DividerProps {
    marginTop?: number;
    marginBottom?: number;
    backgroundColor?: number;
}
export const DividerBlock = styled(Divider)<DividerProps>`
    ${({ marginTop }) => marginTop && css`
        margin-top: ${marginTop}px;
    `}
    ${({ marginBottom }) => marginBottom && css`
        margin-bottom: ${marginBottom}px;
    `}
    ${({ backgroundColor }) => backgroundColor && css`
    background-color: ${backgroundColor};
    `}
`;