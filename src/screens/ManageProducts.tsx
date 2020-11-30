import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native'
import { RootState } from '../store/rootReducers';
import { Text } from '../styles';
import { getFeedsDoc, getPetDoc } from '../utils';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { sizeNameMap } from './ManageProducts/RegistrationPet/PetSizeSection';
import { ageNameMap } from './ManageProducts/RegistrationPet/PetAgeSection';
import { MyFeed, MyPet } from '../models';
import { ManageParamList } from '../navigation/BottomTabNavigator';
import PetProfileSection from '../components/PetProfileSection';

export default function ManageProducts() {
    const [myFeed, setMyFeed] = useState<MyFeed>()
    const [myPets, setMyPets] = useState<MyPet>()
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

    useEffect(() => {
        loadMyPet()
        async function loadMyPet() {
            if (!activePetDocId || !uid) {
                return
            }
            const pet = await getPetDoc(uid, activePetDocId)
            if (pet) {
                setMyPets(pet)
            }
        }
    }, [activePetDocId, uid])

    const openFeedBoard = () => {
        if (!activePetDocId) {
            Alert.alert('반려동물을 먼저 등록해주세요')
        }
        navigateRegistFeedBoard()
    };
    console.log("myFeed", myFeed)

    const navigateRegistrationPet = () => navigation.navigate('RegistrationPet')
    const navigateRegistFeedBoard = () => navigation.navigate('RegistFeedBoard')

    return (
        <ManageProductsBlock>
            <ItemTitle>
                <Text bold size={16}>반려 동물</Text>
                <Text onPress={navigateRegistrationPet}>+ 등록하기</Text>
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
                        <Text>{myPets.petName}</Text>
                        <Text>{myPets.petType}</Text>
                        <Text>{myPets.petKind || ''}</Text>
                        <Text>{myPets.petSize && sizeNameMap[myPets.petSize].title}</Text>
                        <Text>{myPets.petAge && ageNameMap[myPets.petAge].title}</Text>
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
                        <PetProfileSection
                            thumbnail={myFeed.feedItem.image || ''}
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