import React, { useEffect, useState } from "react"
import styled, { useTheme } from 'styled-components/native'
import { DividerBlock, Text } from '../styles'
import { getProductList } from "../utils/product";
import ProductListItem from "./ProductListItem";
import { ProductItem } from '../utils/product';

function RegistFeedItems({
    activeFeedItem,
    setActiveFeedItem,
}: {
    activeFeedItem: string
    setActiveFeedItem: React.Dispatch<React.SetStateAction<string>>
}) {
    const [feeds, setFeeds] = useState<ProductItem[]>([])

    useEffect(() => {
        async function loadProduct() {
            const data = await getProductList('DOG')
            setFeeds(data)
        }
        loadProduct();
    }, [])

    const handleFeed = (feed: ProductItem) => {
        setActiveFeedItem(feed.id)
    }

    const theme = useTheme()

    return (
        <RegistFeedItemsBlock>
            <Text
                size={20}
                align="center"
            >
                등록하실 사료를 선택해주세요
            </Text>
            <DividerBlock height={8} />
            <Text
                color={theme.colors.placeholder}
                align="center"
            >
                회원님의 정보를 통해 적합한 사료만 노출됩니다
            </Text>
            <GridLayout>
                {feeds.map((feed) => (
                    <ProductListItem
                        key={feed.id}
                        feedName={feed.feedName}
                        description={feed.description}
                        image={feed.image}
                        onPress={() => handleFeed(feed)}
                        isActive={activeFeedItem === feed.id}
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
    margin-top: 24px;
    flex-direction: column;
`
