import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native'
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import { getNotices, Notice } from '../../utils/system/getNotices';
import { ListDate, ListTitle, WebViewList, NoList } from './NoticeList';
import * as Sentry from "@sentry/react-native";
import moment from 'moment';

function QnAList() {
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
                const data = await getNotices('qna')
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
        <QnAListBlock>
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
                <NoList>
                    <ListTitle>등록된 QnA가 없습니다</ListTitle>
                </NoList>
            }
        </QnAListBlock>
    );
};

export default QnAList;

const QnAListBlock = styled.View``
