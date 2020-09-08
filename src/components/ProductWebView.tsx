import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import { RouteProp, useRoute, } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics'

import { HomeNavigatorTabParamList } from '../navigation/BottomTabNavigator';

function ProductWebView() {
    const { params } = useRoute<RouteProp<HomeNavigatorTabParamList, 'ProductWebView'>>();
    useEffect(() => {
        analytics().logViewItem({
            items: [{
                item_name: params.title,
            }],
        })
    }, [])
    return (
        <WebView
            source={{ uri: params.url }}
            style={{ marginTop: 20 }}
        />
    );
};

export default ProductWebView;