import analytics from '@react-native-firebase/analytics';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native'
import { Text } from '../../styles';

const Notices = [
    {
        title: '[공지] 플레이펫 출시',
        url: 'https://blog.naver.com/playpetdev/222166499325',
        created: '2020/11/29',
    },
    {
        title: '[이벤트] 신규 가입자에게 100억 쏜다',
        url: 'https://blog.naver.com/playpetdev/222166507300',
        created: '2020/12/4',
    },
]

function NoticeList() {
    const navigation = useNavigation()

    return (
        <NoticeListBlock>
            {Notices.map((notice, index) =>
                <WebViewList
                    key={index}
                    onPress={() => navigation.navigate('ContentWebView', notice)}
                >
                    <ListTitle>{notice.title}</ListTitle>
                    <ListDate>
                        {notice.created}
                    </ListDate>
                </WebViewList>
            )}
        </NoticeListBlock>
    );
};

export default NoticeList;

const NoticeListBlock = styled.View``
export const WebViewList = styled.TouchableOpacity`
    padding: 16px;
`
export const ListTitle = styled(Text)`
    font-size: 16px;
`
export const ListDate = styled(Text)`
    color: ${({ theme }) => theme.colors.placeholder};
`