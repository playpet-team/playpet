import { useNavigation } from '@react-navigation/native'
import i18n from 'i18n-js'
import React, { useState } from 'react'
import { Image } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import ListItem from '../components/ListItem'
import ProfileSection from '../components/ProfileSection'
import useTerms from '../hooks/useTerms'
import { ItemList } from '../models'
import { RootState } from '../store/rootReducers'
import { DividerBlock } from '../styles'
import { linkingUrl } from '../utils'
import MyCards from './AuthScreen/MyCards'
import SignInAdditionalInformation from './Home/SignInAdditionalInformation'

export default function AuthScreen() {
    const [listType, setListType] = useState(ItemList.MEDIA)
    const { isLogged, activePetDocId = 'dummy' } = useSelector((state: RootState) => state.auth)
    const navigation = useNavigation()
    const { existDoc } = useTerms()
    console.log('isLogged', isLogged)

    return (
        <ScrollView>
            <ProfileSection />
            {isLogged &&
                <>
                    <ListItem
                        title='영상'
                        titleStyle={{
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                        onPress={() => navigation.navigate('AppSettings')}
                    />
                    <MyCards listType={listType} />
                </>
            }
            <Section>
                <ListItem
                    title={i18n.t('product.recentViewed')}
                    titleStyle={{
                    }}
                    onPress={() => { }}
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
            <SignInAdditionalInformation
                modalVisible={Boolean(isLogged && (!existDoc || !activePetDocId.length))}
            />
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
