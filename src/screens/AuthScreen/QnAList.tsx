import analytics from '@react-native-firebase/analytics';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native'
import { Text } from '../../styles';
import { ListDate, ListTitle, WebViewList } from './NoticeList';

const QnAs = [
    {
        title: '[질문] 해병대 vs UDT',
        url: 'https://blog.naver.com/playpet_official/222166616338',
        created: '2020/12/03',
    },
]

function QnAList() {
    const navigation = useNavigation()

    return (
        <QnAListBlock>
            {QnAs.map((qna, index) =>
                <WebViewList
                    key={index}
                    onPress={() => navigation.navigate('ContentWebView', qna)}
                >
                    <ListTitle>{qna.title}</ListTitle>
                    <ListDate>
                        {qna.created}
                    </ListDate>
                </WebViewList>
            )}
        </QnAListBlock>
    );
};

export default QnAList;

const QnAListBlock = styled.View``
