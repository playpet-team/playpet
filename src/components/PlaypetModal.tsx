import { Theme, useTheme } from "@react-navigation/native"
import React, { ReactNode } from "react"
import { Icon } from "react-native-elements"
import Modal from "react-native-modal"
import styled, { css } from 'styled-components/native'

interface ModalProps {
    modalVisible: boolean
    setModalVisible?: Function
    children: ReactNode
    isHideCloseButton?: boolean
    containerStyle?: {
        width?: number | string
        padding?: string
        flex?: number
    }
    header?: boolean
}

const PlaypetModal = ({
    modalVisible,
    setModalVisible = () => { },
    isHideCloseButton = false,
    containerStyle = {},
    children,
    header = false,
}: ModalProps) => {
    const handleCloseModal = () => setModalVisible(false)
    const themes = useTheme()
    return (
        // <StyledSafeAreaView>
        <Modal
            isVisible={modalVisible}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            backdropColor="black"
            onBackdropPress={handleCloseModal}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Container
                colors={themes.colors}
                containerStyle={containerStyle}
            >
                {header &&
                    <PlaypetDialogHeader>
                        {!isHideCloseButton &&
                            <CloseButton onPress={handleCloseModal}>
                                <Icon name='close' />
                            </CloseButton>
                        }
                    </PlaypetDialogHeader>
                }
                <PlaypetDialogChildren header={header}>
                    {children}
                </PlaypetDialogChildren>
            </Container>
        </Modal>
        // </StyledSafeAreaView>
    )
}

// const StyledSafeAreaView = styled.SafeAreaView`
//     flex: 1;
//     justify-content: center;
//     align-items: center;
// `

const Container = styled.View<Pick<Theme, 'colors'> & Pick<ModalProps, 'containerStyle'>>`
    flex-direction: column;
    ${({ containerStyle }) => containerStyle?.flex && css`
        flex: ${containerStyle.flex};
    `}
    width: ${({ containerStyle }) => containerStyle?.width ? containerStyle.width : 320}px;
    padding: ${({ containerStyle }) => containerStyle?.padding ? containerStyle.padding : 16}px;
    background-color: ${({ colors }) => colors.background};
    border-radius: 4px;
`

const PlaypetDialogHeader = styled.View`
    justify-content: center;
    flex-direction: row;
    width: 100%;
`

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    right: 8px;
`

const PlaypetDialogChildren = styled.View<{ header: boolean }>`
    margin-top: ${({ header }) => header ? 16 : 0}px;
`

export default PlaypetModal;