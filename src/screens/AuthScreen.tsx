import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import styled, { useTheme } from 'styled-components/native'
import ListItem from '../components/ListItem'
import ProfileSection from '../components/ProfileSection'
import { Icon } from "react-native-elements";
import { DividerBlock, Text } from '../styles'
import { linkingUrl } from '../utils'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducers'

export default function AuthScreen() {
    const navigation = useNavigation()
    const { availableUpdates } = useSelector((state: RootState) => state.auth)

    return (
        <ScrollView>
            <ProfileSection />
            {/* <ActionIconsSection /> */}
            <Section>
                <ListItem
                    title="공지사항"
                    onPress={() => navigation.navigate('NoticeList')}
                    rightIcon={<Icon name="keyboard-arrow-right" />}
                />
                <ListItem
                    title="자주 찾는 질문"
                    onPress={() => navigation.navigate('QnAList')}
                    rightIcon={<Icon name="keyboard-arrow-right" />}
                />
                <ListItem
                    title='앱 설정'
                    titleStyle={{
                    }}
                    onPress={() => navigation.navigate('AppSettings')}
                    rightIcon={availableUpdates ? 
                        <Icon
                            name="new-releases"
                            color="#ff0000"
                        />
                        :
                        <Icon name="keyboard-arrow-right" />
                    }
                />
                {/* <ListItem
                    title="프로필 설정"
                    onPress={() => navigation.navigate('ProfileSetting')}
                    rightIcon={<Icon name="keyboard-arrow-right" />}
                />
                <ListItem
                    title='배송지 관리'
                    titleStyle={{
                    }}
                    onPress={() => navigation.navigate('ShippingDestinationSetting')}
                    rightIcon={<Icon name="keyboard-arrow-right" />}
                /> */}
            </Section>
            {/* <DividerBlock
                marginHorizontal={16}
                backgroundColor="#999"
                marginTop={16}
                height={1}
            /> */}
            <Section>
                {/* <ListItem
                    title='앱 설정'
                    titleStyle={{
                    }}
                    onPress={() => navigation.navigate('AppSettings')}
                    rightIcon={<Icon name="keyboard-arrow-right" />}
                /> */}
                {/* <ListItem
                    title='공지사항'
                    onPress={() => { }}
                    rightIcon={<Icon name="keyboard-arrow-right" />}
                /> */}
                {/* <ListItem
                    title='불편사항 접수'
                    onPress={() => { }}
                /> */}
                <ContactUs />
            </Section>
        </ScrollView>
    )
}

const Section = styled.View`
    margin-top: 16px;
`

const ActionIconsSection = () => {
    const theme = useTheme()
    return (
        <ActionIconsSectionBlock>
            <ActionIconsBlock disabled>
                <ActionIcon>
                    <Icon
                        name='assignment'
                        color={theme.colors.border}
                        size={36}
                    />
                </ActionIcon>
                <Text align='center'>주문내역</Text>
            </ActionIconsBlock>
            <ActionIconsBlock disabled>
                <ActionIcon>
                    <Icon
                        name='check-box'
                        color={theme.colors.border}
                        size={36}
                    />
                </ActionIcon>
                <Text align='center'>등록용품</Text>
            </ActionIconsBlock>
            <ActionIconsBlock onPress={() => linkingUrl('http://pf.kakao.com/_xhxoBIK')}>
                <ActionIcon>
                    <Icon
                        name='chat'
                        color={theme.colors.primary}
                        size={36}
                    />
                </ActionIcon>
                <Text align='center'>친절상담</Text>
            </ActionIconsBlock>
        </ActionIconsSectionBlock>
    )
}

const ActionIconsSectionBlock = styled.View`
    margin-top: 16px;
    flex-direction: row;
    justify-content: space-evenly;
`

const ActionIconsBlock = styled.TouchableOpacity`
    padding: 14px;
`

const ActionIcon = styled.View`
    border-radius: 36px;
    padding: 12px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.border};
    margin-bottom: 8px;
`

const ContactUs = () => {
    const theme = useTheme()

    return (
        <ContactUsBlock>
            <Text
                color={theme.colors.text}
                bold
                size={16}
            >
                플레이펫 고객센터
            </Text>
            <DividerBlock height={8} />
            <Text
                size={12}
                color={theme.colors.text}
            >
                서비스 이용에 궁금한 사항이 있으신가요?
            </Text>
            <DividerBlock height={4} />
            <Text
                size={12}
                color={theme.colors.text}
            >
                문의사항을 남겨주시면 최대한 빠르고 정확하게 안내 도와드리겠습니다
            </Text>
            <ContactButton onPress={() => linkingUrl('http://pf.kakao.com/_xhxoBIK')}>
                <Text
                    align="center"
                    color="#fff"
                    bold
                    size={16}
                >
                    1:1 상담하기
                </Text>
            </ContactButton>
        </ContactUsBlock>
    )
}

const ContactUsBlock = styled.View`
    /* margin-top: 12px; */
    padding: 16px;
    background-color: #eee;
`

const ContactButton = styled.TouchableOpacity`
    margin-top: 12px;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 16px;
    border-radius: 8px;
`