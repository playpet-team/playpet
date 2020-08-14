import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components/native';
import Carousel from 'react-native-snap-carousel';
import { deviceSize } from '../utils';
import { BannerProp, loadBanner } from '../utils/banner';
import { Text } from 'react-native';


const BANNER_WIDTH = deviceSize().width * 0.9;

export interface RenderItemProps {
    item: BannerProp;
    index: number;
}
function CarouselBanner() {
    const [banner, setBanner] = useState<BannerProp[]>([]);

    if (!banner.length) {
        return {
            RenderBanner: null,
        };
    }

    useEffect(() => {
        async function getBanner() {
            const bannerData = await loadBanner();
            setBanner(bannerData);
        }
        getBanner();
    }, []);

    const renderItem = useCallback(({ item }: RenderItemProps) => {
        return (
            <Banner
                {...item}
            />
        );
    }, []);

    return {
        RenderBanner: (
            <Carousel
                data={banner}
                renderItem={renderItem}
                sliderWidth={BANNER_WIDTH}
                itemHeight={300}
            />
        ),
    }
};

const Banner = (banner: BannerProp) => {
    return (
        <BannerBlock><Text>배너배너</Text></BannerBlock>
    );
};

// onSnapToItem={useCallback((slideIndex: number) => setActiveIndex(slideIndex), [])}
export default CarouselBanner;

const BannerBlock = styled.View``;