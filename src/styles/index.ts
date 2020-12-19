import { TextStyle } from 'react-native';
import styled, { css } from 'styled-components/native';

export interface TextProps {
    padding?: string
    bold?: boolean
    size?: number
    color?: string
    align?: 'left' | 'center' | 'right'
    style?: TextStyle
}
export const Text = styled.Text<TextProps>`
    ${({ bold }) => bold && css`
        font-weight: 800;
    `}
    ${({ padding }) => padding && css`
        padding: ${padding};
    `}
    ${({ size }) => size && css`
        font-size: ${size}px;
    `}
    ${({ color }) => color && css`
        color: ${color};
    `}
    ${({ align = 'left' }) => align && css`
        text-align: ${align};
    `}
    ${({ style }) => style && css`...style`}
`

interface DividerProps {
    padding?: string;
    marginHorizontal?: number
    marginVertical?: number
    marginTop?: number;
    marginBottom?: number;
    backgroundColor?: string;
    height?: number;
}
export const DividerBlock = styled.View<DividerProps>`
    ${({ padding }) => padding && css`
        padding: ${padding};
    `}
    ${({ marginHorizontal }) => marginHorizontal && css`
        margin-horizontal: ${marginHorizontal}px;
    `}
    ${({ marginVertical }) => marginVertical && css`
        margin-vertical: ${marginVertical}px;
    `}
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

export const Spacer = styled.View`flex: 1;`

interface layoutProps {
    flexDirection?: 'row' | 'column';
    alignItems?: string;
    justifyContent?: string;
    padding?: number;
    marginTop?: number;
    marginBottom?: number;
}
export const Layout = styled.View<layoutProps>`
    flex-direction: ${({ flexDirection = 'column' }) => flexDirection};
    padding: ${({ padding = 0 }) => padding}px;
    align-items: ${({ alignItems = 'flex-start' }) => alignItems};
    justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};

    ${({ marginTop }) => marginTop && css`
        margin-top: ${marginTop}px;
    `}
    ${({ marginBottom }) => marginBottom && css`
        margin-bottom: ${marginBottom}px;
    `}
`;

interface ListProps {
    paddingHorizontal?: number
}
export const ListBlock = styled.View<ListProps>`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    padding-horizontal: ${({ paddingHorizontal }) => paddingHorizontal ? paddingHorizontal : 8}px;
    width: 100%;
`;
