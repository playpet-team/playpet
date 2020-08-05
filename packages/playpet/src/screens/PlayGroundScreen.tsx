import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import Card from '../components/Card';
import Carousel from 'react-native-snap-carousel';
import { deviceSize } from '../utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardType } from '../components/Card';
export interface CarouselType {
    item: CardType;
    index: number;
}

const carouselHeight = deviceSize().height - 50;
export default function PlayGroundScreen() {
    const playGroundRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const entries = () => {
        return [
            {
                uri: 'https://firebasestorage.googleapis.com/v0/b/playpet-5b432.appspot.com/o/playground%2FO0KOlgCRnLcWsr1uJkBj0TAoa4Q2_1596606722?alt=media&token=ab02c79c-94ca-4340-85a4-c22e94b37125',
            },
            {
                uri: 'https://firebasestorage.googleapis.com/v0/b/playpet-5b432.appspot.com/o/playground%2FO0KOlgCRnLcWsr1uJkBj0TAoa4Q2_1596606722?alt=media&token=ab02c79c-94ca-4340-85a4-c22e94b37125',
            },
            {
                uri: 'https://firebasestorage.googleapis.com/v0/b/playpet-5b432.appspot.com/o/playground%2FO0KOlgCRnLcWsr1uJkBj0TAoa4Q2_1596606722?alt=media&token=ab02c79c-94ca-4340-85a4-c22e94b37125',
            },
        ];
    };

    const renderItem = ({ item, index }: CarouselType) => {
        return (
            <Card
                uri={item.uri}
                onPlayActiveRange={index === activeIndex}
            />
        );
    };

    const snapPlay = (nextIndex: number) => {
        setActiveIndex(nextIndex);
    };

    return (
        <SafeAreaView>
            <PlayGroundBlock>
                <Carousel
                    ref={playGroundRef}
                    data={entries()}
                    renderItem={renderItem}
                    sliderHeight={carouselHeight}
                    itemHeight={carouselHeight}
                    vertical={true}
                    onSnapToItem={snapPlay}
                />
            </PlayGroundBlock>
        </SafeAreaView>
    );
};

const PlayGroundBlock = styled.View`
    /* flex: 1; */
    /* align-items: center; */
    /* justify-content: center; */
`;

const ScrollViewBlock = styled.ScrollView`
    position: relative;
`;
