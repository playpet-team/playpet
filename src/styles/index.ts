import styled, { css } from 'styled-components/native';

interface DividerProps {
    marginTop?: number;
    marginBottom?: number;
    backgroundColor?: number;
}
export const DividerBlock = styled.View<DividerProps>`
    ${({ marginTop }) => marginTop && css`
        margin-top: ${marginTop}px;
    `}
    ${({ marginBottom }) => marginBottom && css`
        margin-bottom: ${marginBottom}px;
    `}
    ${({ backgroundColor }) => backgroundColor && css`
        background-color: ${backgroundColor};
    `}
    ${({ height }) => height && css`
        height: ${height}px;
    `}
`;

interface layoutProps {
    alignItems?: string;
    justifyContent?: string;
    padding?: number;
}
export const Layout = styled.View<layoutProps>`
    padding: ${({ padding = 0 }) => padding}px;
    align-items: ${({ alignItems = 'flex-start' }) => alignItems};
    justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
`;

export const ListBlock = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    padding-horizontal: 8px;
    width: 100%;
`;