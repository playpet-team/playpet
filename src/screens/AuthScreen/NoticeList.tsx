import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native'
import { Text } from '../../styles';

const Notices = [
    {
        title: '[공지사항]플레이펫 베타 앱 서비스 출시!',
        url: 'https://blog.naver.com/playpet_official/222166619346',
        created: '2020/12/4',
    },
    {
        title: '[이벤트]플레이펫 베타 출시 이벤트! ~21/2/31 마감',
        url: 'https://blog.naver.com/playpet_official/222166624418',
        created: '2020/11/29',
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