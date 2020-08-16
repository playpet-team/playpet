import React, { useState } from 'react';
import styled, { css } from 'styled-components/native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export interface ProductItem {
    image: string;
    title: string;
    description: string;
    price: number;
    url: string;
}
function ProductListItem({
    image,
    title,
    description,
    price,
    url,
}: ProductItem) {
    const navigation = useNavigation();

    const handleProduct = async () => {
        navigation.navigate('ProductWebView', {
            url,
            title,
        });
    }

    return (
        <ProductListItemBlock onPress={handleProduct}>
            <Image
                source={{ uri: image }}
                resizeMode="cover"
            />
            <Texts type="title">{title}</Texts>
            <Texts type="description">{description}</Texts>
            <DescriptionBlock>
                <Texts>별이 다섯</Texts>
                <Texts type="price">{price}</Texts>
            </DescriptionBlock>
        </ProductListItemBlock>
    )
};

export default ProductListItem;

const ProductListItemBlock = styled.TouchableOpacity`
    margin-bottom: 16px;
    width: 50%;
    padding-horizontal: 16px;
    /* border-radius: 8px; */
`;

interface TextProps {
    type?: 'title' | 'description' | 'price';
}
const Texts = styled.Text<TextProps>`
    ${({ type }) => {
        switch (type) {
            case 'title': {
                return css`
                    margin-top: 8px;
                    font-size: 16px;
                    font-weight: 600;
                `;
            }
            case 'description': {
                return css`
                    margin-top: 4px;
                `;
            }
            case 'price': {
                return css`
                    text-align: right;
                    font-weight: 800;
                `;
            }
        }
        return;
    }}
`;

const DescriptionBlock = styled.View`
    margin-top: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Image = styled.Image`
    width: 100%;
    height: 140px;
    border-radius: 8px;
`;