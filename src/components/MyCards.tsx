import React, { useCallback, } from 'react'
import useLoadMyCards from '../hooks/useLoadMyCards'
import { ListBlock, Text } from '../styles'
import { Image } from 'react-native'
import { ItemList } from '../models'

function MyCards({ listType }: { listType: ItemList }) {
    const { myCards } = useLoadMyCards({})

    const renderCards = useCallback(() => {
        if (listType === ItemList.MEDIA) {
            if (!myCards.length) {
                return <Text>올린 영상이 없습니다.</Text>
            }
            return myCards.map(card => {
                return (
                    <Image
                        key={card.id}
                        source={{
                            uri: card.contents[0].videoThumbnail,
                        }}
                        resizeMode="cover"
                        style={{
                            width: '24%',
                            height: 100,
                        }}
                    />
                )
            })
        } else if (listType === ItemList.ITEM) {
            return <Text>올린 영상이 없습니다.</Text>
        }
    }, [myCards, listType])

    return (
        <ListBlock>
            {renderCards()}
        </ListBlock>
    )
}

export default MyCards
