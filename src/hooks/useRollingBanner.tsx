import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel'
import { deviceSize } from '../utils'
import { BannerProp, loadBanner } from '../utils/banner'
import { Text } from '../styles'
import { Image } from 'react-native-elements'
import useLoadingIndicator from './useLoadingIndicator'
import { View } from 'react-native'

const BANNER_WIDTH = deviceSize().width * 0.9

export interface RenderItemProps {
    item: BannerProp
    index: number
}
function useRollingBanner() {
    const [banner, setBanner] = useState<BannerProp[]>([])
    const { loading, setLoading } = useLoadingIndicator()

    useEffect(() => {
        async function getBanner() {
            setLoading(true)
            try {
                setBanner(await loadBanner())
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        getBanner()
        return () => { }
    }, [])

    // if (!banner) {
    //     return {
    //         RenderBanner: null,
    //     }
    // }

    const renderItem = ({ item }: RenderItemProps) => {
        return (
            <Banner
                {...item}
            />
        )
    }

    const renderBanner = () => {
        if (loading) {
            return <View style={{ height: 140 }} />
        }
        return (
            <Carousel
                data={banner}
                renderItem={renderItem}
                sliderWidth={BANNER_WIDTH}
                itemWidth={BANNER_WIDTH}
                vertical={false}
            />
        )
    }

    return {
        renderBanner,
    }
}

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
    )
}

// onSnapToItem={useCallback((slideIndex: number) => setActiveIndex(slideIndex), [])}
export default useRollingBanner
