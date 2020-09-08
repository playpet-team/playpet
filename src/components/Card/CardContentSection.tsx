import React, { useMemo, useState, useEffect, useCallback } from "react";
import styled, { css } from 'styled-components/native'
import Animated, { Value, interpolate } from 'react-native-reanimated'
import { Icon, Button, Image, Avatar } from 'react-native-elements'
import { deviceSize, setCardLike, setUserFollow } from '../../utils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducers';
import useShare from '../../hooks/useShare';
import { useTheme } from '@react-navigation/native'
import { playgroundActions } from "../../store/playgroundReducer";
import { View, Modal } from "react-native";
import { getUserDoc } from '../../utils/auth'

const DEVICE_HEIGHT = deviceSize().height

interface Section {
    bounceValue: Value<0>
    id: string
    cardUid: string
    thumbnail: string
    username: string
    title: string
    myCards: boolean
    onPlayActive: boolean
}
export default function CardContentSection({
    bounceValue,
    id,
    cardUid,
    thumbnail,
    username,
    title,
    myCards,
    onPlayActive,
}: Section) {
    const dispatch = useDispatch()
    const [fetchUser, setFetchUser] = useState({
        username,
        profilePhoto: '',
    })
    const { uid: myUid, isLogged } = useSelector((state: RootState) => state.auth);
    const { myLikes = [], myFollowing = [] } = useSelector((state: RootState) => state.playground);
    const { popupShare } = useShare({ id, title, thumbnail, })
    const isLike = useMemo(() => myLikes.includes(id), [id, myLikes])
    const isFollow = useMemo(() => myFollowing.includes(cardUid), [cardUid, myFollowing])
    const { bottom } = useSafeAreaInsets();
    const themes = useTheme()
    const [showToastLike, setShowToastLike] = useState(false)

    useEffect(() => {
        if (onPlayActive) {
            loadFetchUsername()
        }
        async function loadFetchUsername() {
            console.log('fetch username')
            const userData = await getUserDoc(cardUid)
            if (userData) {
                setFetchUser({
                    username: userData.username,
                    profilePhoto: userData.profilePhoto,
                })
            }
        }
    }, [onPlayActive])

    useEffect(() => {
        if (showToastLike) {
            setTimeout(() => {
                setShowToastLike(false)
            }, 500)
        }
    }, [showToastLike])

    const handleProduct = () => {
        alert('상품클릭')
    }

    const handleLikes = useCallback(() => {
        if (!isLike) {
            setShowToastLike(true)
        }
        const willLikes = isLike ? myLikes.filter(like => like != id) : [...myLikes, myUid]
        dispatch(playgroundActions.setMyLikes(willLikes))
        setCardLike({ uid: myUid, id, methods: isLike ? 'remove' : 'add' })
    }, [isLike])

    const handleFollow = useCallback(() => {
        if (!isFollow) {
            setShowToastLike(true)
        }
        const willFollow = isFollow ? [...myFollowing, myUid] : myFollowing.filter(like => like != id)
        dispatch(playgroundActions.setMyFollowing(willFollow))
        setUserFollow({ myUid, followingUid: cardUid, methods: isFollow ? 'remove' : 'add' })
    }, [isFollow])

    if (!onPlayActive) {
        return null
    }

    return (
        <CardSectionBlock
            bottom={myCards ? 0 : bottom}
            style={{
                height: interpolate(bounceValue, {
                    inputRange: [0, 1],
                    outputRange: [150, DEVICE_HEIGHT / 2],
                })
            }}
        >
            <Modal
                transparent={true}
                visible={showToastLike}
                animated={true}
                animationType="fade"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Icon
                        name='favorite'
                        color="#ff0000"
                        size={120}
                    />
                </View>
            </Modal>
            <FloatingButtonGroup>
                {/* <Icon
                    onPress={toggleIsPlaySound}
                    name={isPlaySound ? 'volume-up' : 'volume-off'}
                    color="#fff"
                    size={22}
                    style={{
                        padding: 8
                    }}
                /> */}
                {/* <DividerBlock marginTop={8} /> */}
                <Icon
                    onPress={handleLikes}
                    name={isLike ? 'favorite' : 'favorite-border'}
                    color="#fff"
                    size={22}
                    containerStyle={{
                        marginRight: 20,
                    }}
                />
                <Icon
                    onPress={popupShare}
                    name='share'
                    color="#fff"
                    size={22}
                />
                {/* <LikeNumber>{likes}</LikeNumber> */}
            </FloatingButtonGroup>
            <Content>
                <BodySection>
                    <Header>
                        <Button
                            onPress={() => dispatch(playgroundActions.setSelectedProfileId(id))}
                            title={fetchUser.username || 'playpet'}
                            icon={fetchUser.profilePhoto ? <Avatar
                                source={{ uri: fetchUser.profilePhoto }}
                                size="small"
                                rounded
                                containerStyle={{
                                    marginRight: 8,
                                }}
                            /> : undefined}
                            titleStyle={{
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: '800',
                            }}
                            buttonStyle={{
                                backgroundColor: 'transparent',
                                padding: 4,
                            }}
                        />
                        {!myCards &&
                            <Button
                                onPress={handleFollow}
                                title={isFollow ? '팔로잉' : '+팔로우'}
                                titleStyle={{
                                    color: themes.colors.primary,
                                    fontSize: 12,
                                    fontWeight: '700',
                                }}
                                buttonStyle={{
                                    backgroundColor: themes.colors.background,
                                    padding: 4,
                                    width: 60,
                                    height: 25,
                                }}
                            />
                        }
                    </Header>
                    <Main>
                        <TitleText>{title}</TitleText>
                    </Main>
                </BodySection>
                <Aside>
                    <Image
                        onPress={handleProduct}
                        source={{ uri: 'https://contents.lotteon.com/itemimage/LM/88/01/11/51/14/13/0_/00/1/LM8801115114130_001_1.jpg/dims/resizef/824X824' }}
                        style={{ width: 65, height: 65 }}
                        resizeMode="cover"
                    />
                </Aside>
            </Content>
        </CardSectionBlock>
    )
}

const CardSectionBlock = styled(Animated.View) <{ bottom: number }>`
    overflow: visible;
    position: absolute;
    z-index: 3;
    flex-direction: column;
    min-height: 180px;
    bottom: ${({ bottom }) => bottom + 24}px;
    width: 100%;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.05);
`

const FloatingButtonGroup = styled.View`
    flex-direction: row;
`


const Content = styled.View`
    margin-top: 20px;
    flex-direction: row;
`

const LikeNumber = styled.Text``

const BodySection = styled.View`
    flex-direction: column;
    flex: 2;
`

const Header = styled.View`
    flex-direction: row;
    /* flex: 1; */
    justify-content: space-between;
    align-items: center;
`

const Main = styled.View`
    margin-top: 16px;
    flex-direction: row;
    font-size: 12px;
    line-height: 14px;
`

const Aside = styled.View`
    flex: 1;
    align-items: flex-end;
    /* justify-content: center; */
`

const TitleText = styled.Text`
    color: #fff;
    flex: 1;
`
