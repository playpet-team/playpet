import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Card from '../components/Card';
import Carousel from 'react-native-snap-carousel';
import { deviceSize, loadPlaygroundCards, CardModel } from '../utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardType } from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { playgroundActions } from '../store/playgroundReducer';
import { RootState } from '../store/rootReducers';
import { useIsFocused } from '@react-navigation/native';
export interface CarouselType {
    item: CardModel;
    index: number;
}

const carouselHeight = deviceSize().height - 65;
export default function PlayGroundScreen() {
    const playGroundRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { cards } = useSelector((state: RootState) => state.playground);
    const dispatch = useDispatch();
    const isFocus = useIsFocused();

    useEffect(() => {
        if (!isFocus) {
            return;
        }
        const loadCards = async () => {
            const response = await loadPlaygroundCards({});
            dispatch(playgroundActions.setCards(response));
        };
        console.log('-----------');
        loadCards();
    }, [isFocus]);

    const renderItem = ({ item, index }: CarouselType) => {
        return (
            <Card
                {...item}
                onPlayActiveRange={index === activeIndex}
            />
        );
    };

    const snapPlay = (nextIndex: number) => {
        setActiveIndex(nextIndex);
    };

    return (
        <PlayGroundBlock>
            <Carousel
                ref={playGroundRef}
                data={cards}
                renderItem={renderItem}
                sliderHeight={carouselHeight}
                itemHeight={carouselHeight}
                vertical={true}
                onSnapToItem={snapPlay}
            />
        </PlayGroundBlock>
    );
};

const PlayGroundBlock = styled.View`
    /* flex: 1; */
    /* align-items: center; */
    /* justify-content: center; */
`;
