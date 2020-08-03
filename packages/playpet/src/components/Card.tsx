import React, { useCallback } from 'react';
import styled from '@emotion/native';
import { Text, Linking } from 'react-native';
import { Card as E_Card, Button, } from 'react-native-elements';

export default function Card() {

    const handlePress = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    };


    return (
        <CardBlock>
            <E_Card
                title='크몽'
                image={{ uri: 'https://firebasestorage.googleapis.com/v0/b/playpet-5b432.appspot.com/o/assets%2Fetc%2FiShot2020-08-02PM11.14.18.jpg?alt=media&token=2e61cb6b-855f-41b7-97f9-274cddcae078' }}
            >
                <Text style={{ marginTop: 8, marginBottom: 16, }}>
                    프리랜서마켓 No.1 크몽 | 디자인, IT·프로그래밍, 마케팅,번역·통역, 경영진단, 법률 및 취업 관련 전문가들을 만나보세요
                </Text>
                <Button
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='GO'
                    onPress={() => handlePress('https://kmong.com')}
                />
            </E_Card>
        </CardBlock>
    );
};

const CardBlock = styled.View`

`;