import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { Button, Input } from 'react-native-elements'
import styled, { useTheme } from 'styled-components/native'
import { RootState } from '../store/rootReducers'
import { Text } from '../styles'
import { getFeedsDoc } from '../utils'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { sizeNameMap } from './ManageProducts/RegistrationPet/PetSizeSection'
import { ageNameMap } from './ManageProducts/RegistrationPet/PetAgeSection'
import { MyFeed } from '../models'
import { ManageParamList } from '../navigation/BottomTabNavigator'
import FeedProfileSection from '../components/FeedProfileSection'
import useMyPet from '../hooks/useMyPet'
import Indicator from '../components/Indicator'
import PlaypetModal from '../components/PlaypetModal'

const DisplayInputField = ({
    label,
    value,
    color,
}: {
    label: string
    value: string
    color: string
}) => {
    return (
        <Input
            label={label}
            value={value}
            errorStyle={{
                display: 'none'
            }}
            labelStyle={{
                fontSize: 14,
                color: color,
            }}
            containerStyle={{
                paddingHorizontal: 0,
                marginBottom: 8,
            }}
            inputContainerStyle={{
                borderBottomWidth: 0,
            }}
            disabled
        />
    )
}

export default function ManageProducts() {
    const [myFeed, setMyFeed] = useState<MyFeed>()
    const [openPushModal, setOpenPushModal] = useState(false)
    const {
        uid,
        activePetDocId,
    } = useSelector((state: RootState) => state.auth)
    
    const navigation = useNavigation()
    const theme = useTheme()

    const { params } = useRoute<RouteProp<ManageParamList, 'ManageProducts'>>()

    useEffect(() => {
        loadMyFeeds()
        async function loadMyFeeds() {
            if (!uid) {
                return
            }
            const feeds = await getFeedsDoc(uid)
            console.log("feeds---", feeds);
            setMyFeed(feeds)
        }
    }, [uid, params])

    useEffect(() => {
        if (params?.pushModal) {
            setOpenPushModal(true)
        }
    }, [params])

    const { myPets, loading } = useMyPet()
    
    const openFeedBoard = () => {
        if (!activePetDocId) {
            Alert.alert('반려동물을 먼저 등록해주세요')
            return
        }
        navigateRegistFeedBoard()
    }

    const navigateRegistrationPet = () => navigation.navigate('RegistrationPet')
    const navigateRegistFeedBoard = () => navigation.navigate('RegistFeedBoard')

    if (loading) {
        return <Indicator />
    }

    return (
        <ManageProductsBlock>
            <ItemTitle>
                <Text bold size={16}>반려 동물</Text>
                <Text onPress={navigateRegistrationPet}>{myPets ? '수정하기' : '+ 등록하기'}</Text>
            </ItemTitle>
            
            <Section>
                {activePetDocId === '' &&
                    <Text
                        color={theme.colors.text}
                        onPress={navigateRegistrationPet}
                    >
                        등록된 반려동물이 없습니다
                    </Text>
                }
                {myPets &&
                    <Pet>
                        <DisplayInputField
                            label="이름"
                            value={myPets.petName}
                            color={theme.colors.text}
                        />
                        <DisplayInputField
                            label="반려종"
                            value={myPets.petType === 'DOG' ? '반려견' : '반려묘'}
                            color={theme.colors.text}
                        />
                        <DisplayInputField
                            label="품종"
                            value={myPets.petKind.name}
                            color={theme.colors.text}
                        />
                        <DisplayInputField
                            label="나이"
                            value={ageNameMap[myPets.petAge].title}
                            color={theme.colors.text}
                        />
                        {Boolean(myPets.petKind.size) &&
                            <DisplayInputField
                                label="크기"
                                value={sizeNameMap[myPets.petKind.size].title}
                                color={theme.colors.text}
                            />
                        }
                    </Pet>
                }
            </Section>
            <ItemTitle>
                <Text bold size={16}>사료</Text>
                <Text onPress={openFeedBoard}>+ 등록하기</Text>
            </ItemTitle>
            <Section>
                {activePetDocId === '' &&
                    <AddPetButton onPress={openFeedBoard}>
                        <Text
                            color={theme.colors.text}
                            bold
                        >
                            반려동물을 먼저 등록해주세요
                        </Text>
                    </AddPetButton>
                }
                {myFeed &&
                    <Pet>
                        <FeedProfileSection
                            image={myFeed.feedItem.image || ''}
                            feedName={myFeed.feedItem.feedName}
                            unit={myFeed.feedPackingUnit}
                        />
                    </Pet>
                }
            </Section>
            <PlaypetModal
                modalVisible={openPushModal}
                setModalVisible={() => setOpenPushModal(false)}
            >
                <PushModal>
                    <Text></Text>
                    <PushButtonBlock>
                        <Button
                            title="알림 받지 않기"
                            titleStyle={{
                                color: theme.colors.text,
                                fontSize: 13,
                            }}
                            containerStyle={{
                                flex: 1,
                            }}
                            buttonStyle={{
                                backgroundColor: '#fff',
                            }}
                        />
                        <Button
                            title="알림 받기"
                            titleStyle={{
                                color: theme.colors.primary,
                                fontSize: 14,
                                fontWeight: 'bold',
                            }}
                            containerStyle={{
                                flex: 2,
                            }}
                            buttonStyle={{
                                backgroundColor: '#fff',
                            }}
                        />
                    </PushButtonBlock>
                </PushModal>
            </PlaypetModal>
        </ManageProductsBlock>
    )
}

const ManageProductsBlock = styled.View`
    padding: 16px;
`

const ItemTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

const AddPetButton = styled.TouchableOpacity`
    padding: 16px;
    align-items: center;
    border-radius: 8px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.primary};
    /* justify-content: center; */
`

const Pet = styled.View`
    padding: 16px;
`

const Section = styled.View`
    min-height: 200px;
    padding: 16px 0;
`

const PushModal = styled.View`
    /* padding: 24px; */
    flex-direction: column;
`

const PushButtonBlock = styled.View`
    flex-direction: row;
    align-items: center;
`
