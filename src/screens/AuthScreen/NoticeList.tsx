import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native'
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import { Text } from '../../styles';
import { getNotices, Notice } from '../../utils/system/getNotices';
import * as Sentry from "@sentry/react-native";
import moment from 'moment';

function NoticeList() {
    const navigation = useNavigation()
    const { loading, setLoading, Indicator } = useLoadingIndicator()
    const [notices, setNotices] = useState<Notice[]>([])

    useEffect(() => {
        loadNotices();
        console.log("11")
        async function loadNotices() {
            try {
                setLoading(true)
                console.log("22")
                const data = await getNotices('notice')
                console.log("33", data)
                if (data) {
                    setNotices(data)
                }
            } catch (e) {
                Sentry.captureException(e)
            } finally {
                setLoading(false)
            }
        }
    }, [])

    return (
        <NoticeListBlock>
            {notices.map((notice, index) =>
                <WebViewList
                    key={index}
                    onPress={() => navigation.navigate('ContentWebView', notice)}
                >
                    <ListTitle>{notice.title}</ListTitle>
                    <ListDate>
                        {moment(notice.createdAt.toDate()).format('YYYY년 MM월 DD일')}
                    </ListDate>
                </WebViewList>
            )}
            {loading && <Indicator />}
            {(!loading && !notices.length) &&
                <ListTitle>등록된 공지사항이 없습니다</ListTitle>
            }
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
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.placeholder};
`

export const NoList = styled.View`
    padding: 16px;
`