import React from 'react'
import { View, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import { deviceSize, CardModel } from "../../utils";

const DEVICE_WIDTH = deviceSize().width
const DEVICE_HEIGHT = deviceSize().height

export default function CardCoveredImage({ contents }: Pick<CardModel, 'contents'>) {
    return (
        <View style={{ zIndex: 2, }}>
            <Image
                source={{ uri: contents[0].videoThumbnail }}
                style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}
                resizeMode='cover'
            />
            <ActivityIndicator
                size='large'
                color='#fff'
                style={{
                    position: 'absolute',
                    left: '47%',
                    top: '47%',
                }}
            />
        </View>
    )
}
