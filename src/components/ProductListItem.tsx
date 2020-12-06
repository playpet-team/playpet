import React from 'react';
import { GestureResponderEvent, Image, ImageSourcePropType } from 'react-native';
import { Avatar } from 'react-native-elements';
import styled from 'styled-components/native';
import { DividerBlock, Text } from '../styles';
import { ProductItem } from '../utils/product';

type PickProductItem = Pick<ProductItem, 'feedName' | 'image' | 'description'>
interface Item extends PickProductItem {
    isActive: boolean
    onPress: (event: GestureResponderEvent) => void
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
            {image && <Image
                source={feedImagesMap[image]}
                resizeMode="contain"
                style={{
                    marginRight: 8,
                    width: 70,
                    height: 70,
                }}
            />}
            <Content>
                <Text bold>{feedName}</Text>
                <DividerBlock height={4} />
                <Text>{description}</Text>
            </Content>
        </ProductListItemBlock>
    )
};

export default ProductListItem;

const Content = styled.View`
    /* height: 100px; */
    /* justify-content: space-between; */
    /* padding: 8px; */
    flex: 1;
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

export const feedImagesMap: {
    [key: string]: ImageSourcePropType
} = {
    'null': require('../../assets/images/feed_images/naturalcore_eco1.jpg'),
    'naturalcore_eco1.jpg': require('../../assets/images/feed_images/naturalcore_eco1.jpg'),
    'naturalcore_eco2.jpg': require('../../assets/images/feed_images/naturalcore_eco2.jpg'),
    'naturalcore_eco4.jpg': require('../../assets/images/feed_images/naturalcore_eco4.jpg'),
    'naturalcore_eco5a.jpg': require('../../assets/images/feed_images/naturalcore_eco5a.jpg'),
    'naturalcore_eco6_.jpg': require('../../assets/images/feed_images/naturalcore_eco6_.jpg'),
    'naturalcore_eco9b_2.jpg': require('../../assets/images/feed_images/naturalcore_eco9b_2.jpg'),
    'naturalcore_eco9b.jpg': require('../../assets/images/feed_images/naturalcore_eco9b.jpg'),
    'naturalcore_eco10.jpg': require('../../assets/images/feed_images/naturalcore_eco10.jpg'),
    'orgen_fit.jpg': require('../../assets/images/feed_images/orgen_fit.jpg'),
    'orgen_orignal.jpg': require('../../assets/images/feed_images/orgen_orignal.jpg'),
    'orgen_puppy.jpg': require('../../assets/images/feed_images/orgen_puppy.jpg'),
    'orgen_senior.jpg': require('../../assets/images/feed_images/orgen_senior.jpg'),
    'orgen_sixfish.jpg': require('../../assets/images/feed_images/orgen_sixfish.jpg'),
    'royalcanin_bichonfrise_adult.jpg': require('../../assets/images/feed_images/royalcanin_bichonfrise_adult.jpg'),
    'royalcanin_dach_adult.jpg': require('../../assets/images/feed_images/royalcanin_dach_adult.jpg'),
    'royalcanin_dach_puppy.jpg': require('../../assets/images/feed_images/royalcanin_dach_puppy.jpg'),
    'royalcanin_indoor_adult.jpg': require('../../assets/images/feed_images/royalcanin_indoor_adult.jpg'),
    'royalcanin_indoor_puppy.jpg': require('../../assets/images/feed_images/royalcanin_indoor_puppy.jpg'),
    'royalcanin_maltese_adult.jpg': require('../../assets/images/feed_images/royalcanin_maltese_adult.jpg'),
    'royalcanin_mini_puppy.jpg': require('../../assets/images/feed_images/royalcanin_mini_puppy.jpg'),
    'royalcanin_mini_start.jpg': require('../../assets/images/feed_images/royalcanin_mini_start.jpg'),
    'royalcanin_poodle_adult.jpg': require('../../assets/images/feed_images/royalcanin_poodle_adult.jpg'),
    'royalcanin_poodle_puppy.jpg': require('../../assets/images/feed_images/royalcanin_poodle_puppy.jpg'),
    'royalcanin_shihtzu_adult.jpg': require('../../assets/images/feed_images/royalcanin_shihtzu_adult.jpg'),
    'royalcanin_shihtzu_puppy.jpg': require('../../assets/images/feed_images/royalcanin_shihtzu_puppy.jpg'),
    'royalcanin_xsmall_puppy.jpg': require('../../assets/images/feed_images/royalcanin_xsmall_puppy.jpg'),
    'royalcanin_yorkshire_adult.jpg': require('../../assets/images/feed_images/royalcanin_yorkshire_adult.jpg'),
    'royalcanin_yorkshire_puppy.jpg': require('../../assets/images/feed_images/royalcanin_yorkshire_puppy.jpg'),
    'tow_duck_sweetp.jpg': require('../../assets/images/feed_images/tow_duck_sweetp.jpg'),
    'tow_hunsalmon_sweetp.jpg': require('../../assets/images/feed_images/tow_hunsalmon_sweetp.jpg'),
    'tow_salmon_sweetp.jpg': require('../../assets/images/feed_images/tow_salmon_sweetp.jpg'),
}
