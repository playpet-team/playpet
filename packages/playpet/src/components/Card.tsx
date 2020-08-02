import React, { useCallback } from 'react';
import styled from '@emotion/native';
import { Text, Linking } from 'react-native';
import { Card as E_Card, Button, } from 'react-native-elements';
import storage from '@react-native-firebase/storage';

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
                image={require('../../assets/images/kmong.jpg')}
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