import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Avatar } from 'react-native-elements';
import styled from 'styled-components/native';
import { Text } from '../styles';
import { ProductItem } from '../utils/product';

type PickProductItem = Pick<ProductItem, 'feedName' | 'image' | 'description'>
interface Item extends PickProductItem {
    isActive: boolean;
    onPress: (event: GestureResponderEvent) => void;
}
function ProductListItem({
    isActive = false,
    onPress,
    feedName,
    image,
    description,
}: Item) {
    return (
        <ProductListItemBlock
            onPress={onPress}
            isActive={isActive}
        >
            {image && <Avatar
                source={{ uri: image }}
                size="small"
                rounded
                containerStyle={{
                    marginRight: 8,
                    width: 70,
                    height: 70,
                }}
            />}
            <Content>
                <Text bold>{feedName}</Text>
                <Text>{description}</Text>
            </Content>
        </ProductListItemBlock>
    )
};

export default ProductListItem;

const Content = styled.View`
    /* height: 100px; */
    justify-content: space-between;
    /* padding: 8px; */
`
const ProductListItemBlock = styled.TouchableOpacity<{isActive: boolean}>`
    padding: 16px 20px;
    /* flex: 1; */
    margin-top: 16px;
    border-width: 2px;
    border-radius: 8px;
    flex-direction: row;
    border-color: ${({ isActive }) => isActive ? '#0559D1' : '#C4C4C4'};
    background-color: ${({ isActive }) => isActive ? 'rgba(5, 89, 209, 0.1)' : '#fff'};
`