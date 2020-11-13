import React, { useEffect, useState } from "react"
import styled from 'styled-components/native'
import { Text } from '../styles'
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


export default RegistFeedItems

const RegistFeedItemsBlock = styled.View`
    padding: 20px;
`

const GridLayout = styled.ScrollView`
    flex-direction: column;
`
