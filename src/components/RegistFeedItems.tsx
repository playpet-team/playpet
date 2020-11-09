import React, { useEffect, useState } from "react"
import styled, { useTheme } from 'styled-components/native'
import { deviceSize } from "../utils"
import { Text } from '../styles'
import { Avatar } from 'react-native-elements';
import { loadProductList } from "../utils/product";
import ProductListItem from "./ProductListItem";
import { ProductItem } from '../utils/product';

function RegistFeedItems({
    setActiveFeedItem,
    activeFeedItem
}: {
    setActiveFeedItem: React.Dispatch<React.SetStateAction<string>>;
    activeFeedItem: string;
}) {
    const [feeds, setFeeds] = useState<ProductItem[]>([])

    useEffect(() => {
        async function loadProduct() {
            const data = await loadProductList('DOG')
            console.log("data---", data);
            setFeeds(data)
        }
        loadProduct();
    }, [])

    return (
        <RegistFeedItemsBlock>
            <Text bold>등록하실 사료를 선택해주세요</Text>
            <Text>회원님의 정보를 통해 적합한 사료만 노출됩니다</Text>
            <GridLayout>
                {feeds.map(({ id, feedName, description, image }) => (
                    <ProductListItem
                        key={id}
                        feedName={feedName}
                        description={description}
                        image={image}
                        onPress={() => setActiveFeedItem(id)}
                        isActive={activeFeedItem === id}
                    />
                ))}
            </GridLayout>
        </RegistFeedItemsBlock>
    )
}

const RegistFeedItemsBlock = styled.View`
  
`

export default RegistFeedItems

const GridLayout = styled.ScrollView`
    /* flex: 1; */
    flex-direction: column;
`

const Content = styled.View`
    /* height: 100px; */
    justify-content: space-between;
    padding: 8px;
`
const Item = styled.TouchableOpacity<{isActive: boolean}>`
    padding: 16px;
    /* flex: 1; */
    margin-top: 8px;
    border-width: 2px;
    border-radius: 8px;
    flex-direction: row;
    border-color: ${({ isActive }) => isActive ? '#0559D1' : '#C4C4C4'};
    background-color: ${({ isActive }) => isActive ? 'rgba(5, 89, 209, 0.1)' : '#fff'};
`
