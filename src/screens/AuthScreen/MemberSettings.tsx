import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Layout, Text, DividerBlock } from '../../styles';
import ListItem from '../../components/ListItem';

export default function MemberScreen() {
    return (
        <ScrollView>
            <Section>
                <Text padding="0 16px" size={18} bold>고객센터</Text>
                <ListItem
                    title='공지사항'
                    onPress={() => { }}
                    rightIcon={<Icon
                        name="keyboard-arrow-right"
                    />}
                />
                <ListItem
                    title='불편사항 접수'
                    onPress={() => { }}
                />
            </Section>
            <Section>
                <Text padding="0 16px" size={18} bold>앱 설정</Text>
                <ListItem
                    title='푸시 설정'
                    onPress={() => { }}
                    rightIcon={<Icon
                        name="keyboard-arrow-right"
                    />}
                />
                <ListItem
                    title='캐시 데이터 지우기'
                    onPress={() => { }}
                />
                <ListItem
                    title='동영상 자동재생'
                    onPress={() => { }}
                />
            </Section>
        </ScrollView>
    )
};

const Section = styled.View`
    margin-top: 16px;
`;