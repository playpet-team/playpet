import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Avatar } from 'react-native-elements';
import styled from 'styled-components/native';
import { Text } from '../styles';
import { ProductItem } from '../utils/product';

type PickProductItem = Pick<ProductItem, 'feedName' | 'image' | 'description' | 'packingUnit'>
interface Item extends PickProductItem {
    isActive: boolean
    onPress: (event: GestureResponderEvent) => void
    handlePackingUnit: (unit: string) => void
    activeFeedPackingUnit: string
    setActiveFeedPackingUnit: React.Dispatch<React.SetStateAction<string>>
}
function ProductListItem({
    isActive = false,
    onPress,
    handlePackingUnit,
    feedName,
    image,
    description,
    packingUnit,
    activeFeedPackingUnit,
    setActiveFeedPackingUnit
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
                {(isActive && packingUnit.length) &&
                    <UnitBlock>
                        {packingUnit.map(unit =>
                            <Unit key={unit}>
                                <Chip
                                    isActive={activeFeedPackingUnit === unit}
                                    onPress={() => handlePackingUnit(unit)}
                                >
                                    <Text>{unit}</Text>
                                </Chip>
                            </Unit>
                        )}
                    </UnitBlock>
                }
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

const UnitBlock = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
`

const Unit = styled.View`
    margin-right: 8px;
`

const Chip = styled.TouchableOpacity<{isActive: boolean}>`
    padding: 8px;
    border-radius: 8px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.border};
    background-color: ${({ isActive, theme }) => isActive ? theme.colors.primary : 'transparent'};
`