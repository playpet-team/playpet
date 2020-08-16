import React from 'react';
import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import { RouteProp, useRoute, } from '@react-navigation/native';

import { HomeNavigatorTabParamList } from '../navigation/BottomTabNavigator';

function ProductWebView() {
    const { params } = useRoute<RouteProp<HomeNavigatorTabParamList, 'ProductWebView'>>();
    return (
        <WebView
            source={{ uri: params.url }}
            style={{ marginTop: 20 }}
        />
    );
};

export default ProductWebView;