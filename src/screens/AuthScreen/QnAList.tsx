import analytics from '@react-native-firebase/analytics';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native'
import { Text } from '../../styles';
import { ListDate, ListTitle, WebViewList } from './NoticeList';

const QnAs = [
    {
        title: '[공지] 반려동물은 무엇을 먹나요?',
        url: 'https://blog.naver.com/playpetdev/222166508158',
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
