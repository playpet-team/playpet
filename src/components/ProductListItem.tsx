import React, { useState } from 'react';
import styled, { css } from 'styled-components/native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';
import { decimalWonPrice } from '../utils';

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
    // const { isLogged } = useSelector((state: RootState) => state.auth);

    const handleProduct = () => {
        // if (!isLogged) {
        //     alert('로그인이 필요합니다');
        // }
        navigation.navigate('ProductWebView', {
            url,
            title,
        });
    };

    return (
        <ProductListItemBlock testID="ProductListItem-block" onPress={handleProduct}>
            <Image
                source={{ uri: image }}
                resizeMode="cover"
            />
            <Texts type="title">{title}</Texts>
            <Texts type="description">{description}</Texts>
            <DescriptionBlock>
                <Texts></Texts>
                <Texts type="price">{decimalWonPrice(price)}</Texts>
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
                    min-height: 45px;
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