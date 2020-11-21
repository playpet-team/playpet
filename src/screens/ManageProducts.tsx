import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native'
import useLoadingIndicator from '../hooks/useLoadingIndicator';
import { authActions } from '../store/authReducer';
import { RootState } from '../store/rootReducers';
import { Text } from '../styles';
import { getFeedsDoc, getPetDoc } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { sizeNameMap } from './ManageProducts/RegistrationPet/PetSizeSection';
import { ageNameMap } from './ManageProducts/RegistrationPet/PetAgeSection';
import { MyFeed } from '../models';

export default function ManageProducts() {
    const dispatch = useDispatch()
    const [myFeeds, setMyFeeds] = useState<MyFeed[]>([])
    const {
        uid,
        activePetDocId,
        activePet,
    } = useSelector((state: RootState) => state.auth)
    
    const navigation = useNavigation()
    const theme = useTheme();

    useEffect(() => {
        loadMyPet()
        async function loadMyPet() {
            if (!activePetDocId || !uid) {
                return
            }
            const pet = await getPetDoc(uid, activePetDocId)
            dispatch(authActions.setActivePet(pet))
        }
    }, [activePetDocId, uid])

    useEffect(() => {
        loadMyFeeds()
        async function loadMyFeeds() {
            if (!uid) {
                return
            }
            const feeds = await getFeedsDoc(uid)
            setMyFeeds(feeds)
        }
    }, [])


    const openFeedBoard = () => {
        if (!activePetDocId) {
            Alert.alert('반려동물을 먼저 등록해주세요')
        }
        navigateRegistFeedBoard()
    };

    const navigateRegistrationPet = () => navigation.navigate('RegistrationPet')
    const navigateRegistFeedBoard = () => navigation.navigate('RegistFeedBoard')

    return (
        <ManageProductsBlock>
            <ItemTitle>
                <Text bold size={16}>반려 동물</Text>
                <Text onPress={navigateRegistrationPet}>+ 등록하기</Text>
            </ItemTitle>
            
            <ScrollSection>
                {activePetDocId === '' &&
                    <Text
                        color={theme.colors.text}
                        onPress={navigateRegistrationPet}
                    >
                        등록된 반려동물이 없습니다
                    </Text>
                }
                {activePet &&
                    <Pet>
                        <Text>{activePet.petName}</Text>
                        <Text>{activePet.petType}</Text>
                        <Text>{activePet.petSize && sizeNameMap[activePet.petSize].title}</Text>
                        <Text>{activePet.petAge && ageNameMap[activePet.petAge].title}</Text>
                    </Pet>
                }
            </ScrollSection>
            <ItemTitle>
                <Text bold size={16}>사료</Text>
                <Text onPress={openFeedBoard}>+ 등록하기</Text>
            </ItemTitle>
            <ScrollSection>
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
                {myFeeds.map((feed, index) => {
                    return (
                        <Pet key={index}>
                            <Text>{feed.feedBrand}</Text>
                            <Text>{feed.feedItem}</Text>
                        </Pet>
                    )
                })}
            </ScrollSection>
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

const ScrollSection = styled.View`
    min-height: 200px;
    padding: 16px 0;
`