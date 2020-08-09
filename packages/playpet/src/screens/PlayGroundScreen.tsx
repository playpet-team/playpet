import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import Card from '../components/Card';
import Carousel from 'react-native-snap-carousel';
import { deviceSize, loadPlaygroundCards, CardModel } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { playgroundActions } from '../store/playgroundReducer';
import { RootState } from '../store/rootReducers';
import { useIsFocused } from '@react-navigation/native';

const BOTTOM_NAV_BAR_HEIGHT = 65;
const SLIDER_HEIGHT = deviceSize().height - BOTTOM_NAV_BAR_HEIGHT;

export interface RenderItemProps {
    item: CardModel;
    index: number;
}
export default function PlayGroundScreen() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { cards } = useSelector((state: RootState) => state.playground);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) {
            return;
        }
        const loadCards = async () => {
            const response = await loadPlaygroundCards({});
            dispatch(playgroundActions.setCards(response));
        };
        loadCards();
    }, [isFocused]);

    const renderItem = useCallback(({ item, index }: RenderItemProps) => {
        return (
            <Card
                {...item}
                onPlayActiveRange={index === activeIndex}
            />
        );
    }, [activeIndex]);

    const snapPlay = (nextIndex: number) => setActiveIndex(nextIndex);

    return (
        <PlayGroundBlock>
            <Carousel
                data={cards}
                renderItem={renderItem}
                sliderHeight={SLIDER_HEIGHT}
                itemHeight={SLIDER_HEIGHT}
                vertical={true}
                onSnapToItem={snapPlay}
            />
        </PlayGroundBlock>
    );
};

const PlayGroundBlock = styled.View``;
