import analytics from '@react-native-firebase/analytics';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { HomeNavigatorTabParamList } from '../navigation/BottomTabNavigator';


function ContentWebView() {
    const { params } = useRoute<RouteProp<HomeNavigatorTabParamList, 'ContentWebView'>>();
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

export default ContentWebView;