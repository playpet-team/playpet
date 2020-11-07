import React, { useState } from "react"
import styled, { useTheme } from 'styled-components/native'
import { deviceSize } from "../utils"
import { Text } from '../styles'
import { Avatar } from 'react-native-elements';

const dummyItems = [{
    id: 0,
    title: '로얄캐닌 미니 인도어 어덜트',
    description: '3kg - 1달 용량으로 충분합니다',
    thumbnail: 'https://contents.lotteon.com/itemimage/LM/88/01/11/51/14/13/0_/00/1/LM8801115114130_001_1.jpg/dims/resizef/824X824',
}, {
    id: 1,
    title: '2로얄캐닌 미니 인도어 어덜트',
    description: '3kg - 1달 용량으로 충분합니다',
    thumbnail: 'https://contents.lotteon.com/itemimage/LM/88/01/11/51/14/13/0_/00/1/LM8801115114130_001_1.jpg/dims/resizef/824X824',
}, {
    id: 2,
    title: '3로얄캐닌 미니 인도어 어덜트',
    description: '3kg - 1달 용량으로 충분합니다',
    thumbnail: 'https://contents.lotteon.com/itemimage/LM/88/01/11/51/14/13/0_/00/1/LM8801115114130_001_1.jpg/dims/resizef/824X824',
}, {
    id: 3,
    title: '4로얄캐닌 미니 인도어 어덜트',
    description: '3kg - 1달 용량으로 충분합니다',
    thumbnail: 'https://contents.lotteon.com/itemimage/LM/88/01/11/51/14/13/0_/00/1/LM8801115114130_001_1.jpg/dims/resizef/824X824',
}, {
    id: 4,
    title: '5로얄캐닌 미니 인도어 어덜트',
    description: '3kg - 1달 용량으로 충분합니다',
    thumbnail: 'https://contents.lotteon.com/itemimage/LM/88/01/11/51/14/13/0_/00/1/LM8801115114130_001_1.jpg/dims/resizef/824X824',
}, {
    id: 5,
    title: '6로얄캐닌 미니 인도어 어덜트',
    description: '3kg - 1달 용량으로 충분합니다',
    thumbnail: 'https://contents.lotteon.com/itemimage/LM/88/01/11/51/14/13/0_/00/1/LM8801115114130_001_1.jpg/dims/resizef/824X824',
}]
function RegistFeedItems({
    setActiveFeedItem,
    activeFeedItem
}: {
    setActiveFeedItem: React.Dispatch<React.SetStateAction<number>>;
    activeFeedItem: number;
}) {

    return (
        <RegistFeedItemsBlock>
            <Text bold>등록하실 사료를 선택해주세요</Text>
            <Text>회원님의 정보를 통해 적합한 사료만 노출됩니다</Text>
            <GridLayout>
                {dummyItems.map(item => (
                    <Item
                        key={item.id}
                        onPress={() => setActiveFeedItem(item.id)}
                        isActive={activeFeedItem === item.id}
                    >
                        <Avatar
                            source={{ uri: item.thumbnail }}
                            size="small"
                            rounded
                            containerStyle={{
                                marginRight: 8,
                                width: 70,
                                height: 70,
                            }}
                        />
                        <Content>
                            <Text bold>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </Content>
                    </Item>
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
