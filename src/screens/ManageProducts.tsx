import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { Input } from 'react-native-elements'
import styled, { useTheme } from 'styled-components/native'
import { RootState } from '../store/rootReducers';
import { Text } from '../styles';
import { getFeedsDoc } from '../utils';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { sizeNameMap } from './ManageProducts/RegistrationPet/PetSizeSection';
import { ageNameMap } from './ManageProducts/RegistrationPet/PetAgeSection';
import { MyFeed, MyPet } from '../models';
import { ManageParamList } from '../navigation/BottomTabNavigator';
import FeedProfileSection from '../components/FeedProfileSection';
import useMyPet from '../hooks/useMyPet';
import Indicator from '../components/Indicator';

export default function ManageProducts() {
    const [myFeed, setMyFeed] = useState<MyFeed>()
    const {
        uid,
        activePetDocId,
        // activePet,
    } = useSelector((state: RootState) => state.auth)
    
    const navigation = useNavigation()
    const theme = useTheme();

    const { params } = useRoute<RouteProp<ManageParamList, 'ManageProducts'>>();
    
    useEffect(() => {
        loadMyFeeds()
        async function loadMyFeeds() {
            if (!uid) {
                return
            }
            const feeds = await getFeedsDoc(uid)
            setMyFeed(feeds)
        }
    }, [uid, params])

    const { myPets, loading } = useMyPet()
    
    const openFeedBoard = () => {
        if (!activePetDocId) {
            Alert.alert('반려동물을 먼저 등록해주세요')
            return
        }
        navigateRegistFeedBoard()
    };
    console.log("myFeed", myFeed)

    const navigateRegistrationPet = () => navigation.navigate('RegistrationPet')
    const navigateRegistFeedBoard = () => navigation.navigate('RegistFeedBoard')

    const DisplayInputField = useCallback(({
        label,
        value,
    }: {
        label: string
        value: string
    }) => {
        if (!myPets) {
            return null
        }
        return (
            <Input
                label={label}
                value={value}
                errorStyle={{
                    display: 'none'
                }}
                labelStyle={{
                    fontSize: 14,
                    color: theme.colors.text,
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
    }, [myPets])

    if (loading) {
        return <Indicator />
    }
    console.log('myPets---', myPets)

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
                        />
                        <DisplayInputField
                            label="반려종"
                            value={myPets.petType === 'DOG' ? '반려견' : '반려묘'}
                        />
                        <DisplayInputField
                            label="품종"
                            value={myPets.petKind.name}
                        />
                        <DisplayInputField
                            label="나이"
                            value={ageNameMap[myPets.petAge].title}
                        />
                        {Boolean(myPets.petSize) && <DisplayInputField
                            label="크기"
                            value={sizeNameMap[myPets.petSize].title}
                        />}
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
        </ManageProductsBlock>
    );
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