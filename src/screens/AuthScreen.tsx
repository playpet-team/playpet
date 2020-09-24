import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Image } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import ListItem from '../components/ListItem'
import ProfileSection from '../components/ProfileSection'
import { AuthTapParamList } from '../navigation/BottomTabNavigator'
import { RootState } from '../store/rootReducers'
import { DividerBlock } from '../styles'
import { linkingUrl } from '../utils'
import SignInAdditionalInformation from './Home/SignInAdditionalInformation'

export default function AuthScreen() {
    const { params } = useRoute<RouteProp<AuthTapParamList, 'AuthScreen'>>();
    const { isLogged, } = useSelector((state: RootState) => state.auth)
    const navigation = useNavigation()
    const isFocus = useIsFocused()
    console.log('visible-modal--------', isLogged && params?.isSignUp && isFocus)
    console.log('isLogged', isLogged)

    return (
        <ScrollView>
            <ProfileSection />
            <Section>
                <ListItem
                    title='결제 정보'
                    titleStyle={{
                    }}
                    onPress={() => navigation.navigate('PaymentSetting')}
                />
                <ListItem
                    title='배송지 관리'
                    titleStyle={{
                    }}
                    onPress={() => navigation.navigate('ShippingDestinationSetting')}
                />
            </Section>
            <DividerBlock
                marginHorizontal={16}
                backgroundColor="#999"
                marginTop={16}
                height={1}
            />
            <Section>
                <ListItem
                    title='앱 설정'
                    titleStyle={{
                    }}
                    onPress={() => navigation.navigate('AppSettings')}
                // rightIcon={<Icon name="keyboard-arrow-right" />}
                />
                <ListItem
                    title='공지사항'
                    onPress={() => { }}
                // rightIcon={<Icon name="keyboard-arrow-right" />}
                />
                <ListItem
                    title='불편사항 접수'
                    onPress={() => { }}
                />
                <ListItem
                    title='고객센터'
                    titleStyle={{
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}
                    onPress={() => linkingUrl('http://pf.kakao.com/_xhxoBIK')}
                    rightIcon={<Image
                        source={require('../../assets/icons/kakao_icon.png')}
                        style={{
                            width: 32,
                            height: 32,
                        }}
                    />}
                />
            </Section>
            {(isLogged && params?.isSignUp && isFocus) &&
                <SignInAdditionalInformation />
            }
        </ScrollView>
    )
}

const Section = styled.View`
    margin-top: 16px;
    /* padding-horizontal: 16px; */
`

// const SignInButton = styled.TouchableOpacity`
//     padding: 16px;
//     flex-direction: row;
//     justify-content: space-between;
// `

const KakaoChannelButton = styled.TouchableOpacity`
    flex-direction: row;
`
