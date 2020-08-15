import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components/native';
import Carousel from 'react-native-snap-carousel';
import { deviceSize } from '../utils';
import { BannerProp, loadBanner } from '../utils/banner';
import { Text, Image } from 'react-native';


const BANNER_WIDTH = deviceSize().width * 0.9;

export interface RenderItemProps {
    item: BannerProp;
    index: number;
}
function useRollingBanner() {
    const [banner, setBanner] = useState<BannerProp[]>([]);

    useEffect(() => {
        async function getBanner() {
            const bannerData = await loadBanner();
            setBanner(bannerData);
        }
        getBanner();
    }, []);

    // if (!banner) {
    //     return {
    //         RenderBanner: null,
    //     };
    // }

    const renderItem = ({ item }: RenderItemProps) => {
        return (
            <Banner
                {...item}
            />
        );
    };

    const renderBanner = () => {
        return (
            <Carousel
                data={banner}
                renderItem={renderItem}
                sliderWidth={BANNER_WIDTH}
                itemWidth={BANNER_WIDTH}
            />
        )
    };

    return {
        renderBanner,
    }
};

const Banner = (banner: BannerProp) => {
    return (
        <Image
            source={{ uri: banner.image }}
            resizeMode="cover"
            style={{
                width: '100%',
                height: 140,
                borderRadius: 8,
            }}
        />
    );
};

// onSnapToItem={useCallback((slideIndex: number) => setActiveIndex(slideIndex), [])}
export default useRollingBanner;

const BannerBlock = styled.View``;