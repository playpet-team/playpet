import React, { useEffect, useMemo, useState } from "react"
import styled, { useTheme } from 'styled-components/native'
import { DividerBlock, Text } from '../styles'
import { getProductList } from "../utils/product";
import ProductListItem from "./ProductListItem";
import { ProductItem } from '../utils/product';
import useMyPet from "../hooks/useMyPet";
import useLoadingIndicator from "../hooks/useLoadingIndicator";
import { ActivityIndicator } from "react-native";
import * as Sentry from "@sentry/react-native";

function RegistFeedItems({
    activeFeedItemId,
    setActiveFeedItemId,
    setFeedPackingUnits,
}: {
    activeFeedItemId: string
    setActiveFeedItemId: React.Dispatch<React.SetStateAction<string>>
    setFeedPackingUnits: React.Dispatch<React.SetStateAction<string[]>>
}) {
    const [feeds, setFeeds] = useState<ProductItem[]>([])

    const { myPets } = useMyPet()
    const { loading, setLoading, Indicator } = useLoadingIndicator()

    useEffect(() => {
        async function loadProduct() {
            if (!myPets) {
                return
            }
            try {
                setLoading(true)
                const data = await getProductList()
                console.log('data--------', data)
                if (data) {
                    setFeeds(data)
                }
            } catch (e) {
                Sentry.captureException(e)
            } finally {
                setLoading(false)
            }
        }
        loadProduct();
    }, [myPets])

    const handleFeed = (feed: ProductItem) => {
        setActiveFeedItemId(feed.id)
        setFeedPackingUnits(feed.packingUnit)
    }

    const filteredFeeds = useMemo(() => {
        if (!myPets || !feeds) {
            return []
        }
        console.log("myPets-", myPets)
        return feeds
            .filter(feed => feed.pet.includes(myPets.petType))
            .filter(feed => feed.size.includes(myPets.petKind.size))
    }, [myPets, feeds])

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
            <DividerBlock height={16} />
            <GridLayout>
                {filteredFeeds.map((feed) => (
                    <ProductListItem
                        key={feed.id}
                        feedName={feed.feedName}
                        description={feed.description}
                        image={feed.image}
                        onPress={() => handleFeed(feed)}
                        isActive={activeFeedItemId === feed.id}
                    />
                ))}
            </GridLayout>
            {loading && <Indicator />}
        </RegistFeedItemsBlock>
    )
}


export default RegistFeedItems

const RegistFeedItemsBlock = styled.View`
    margin-bottom: 100px;
    padding: 20px;
`

const GridLayout = styled.ScrollView`
    /* margin-top: 24px; */
    flex-direction: column;
`
