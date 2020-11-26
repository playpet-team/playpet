import React from "react";
import { Slider } from 'react-native-elements';
import styled, { useTheme } from "styled-components/native";
import PlaypetModal from "../../components/PlaypetModal";
import { Text } from "../../styles";
import { deviceSize } from "../../utils";
import { StatusDescription } from "./FeedSection";

const DEVICE_WIDTH = deviceSize().width;

const feedStatusSrcMap = {
    0: {
        box: require('../../../assets/images/feeds_status/feed_box_0.png'),
        feed: require('../../../assets/images/feeds_status/feed_0.png'),
        wording: '사료가 없어요! 사료를 채워주세요!',
        color: '#ff4444'
    },
    25: {
        box: require('../../../assets/images/feeds_status/feed_box_25.png'),
        feed: require('../../../assets/images/feeds_status/feed_25.png'),
        wording: '거의 다 떨어져가요ㅜㅜ',
        color: '#333'
    } ,
    50: {
        box: require('../../../assets/images/feeds_status/feed_box_50.png'),
        feed: require('../../../assets/images/feeds_status/feed_50.png'),
        wording: '아직 괜찮아요',
        color: '#333'
    } ,
    75: {
        box: require('../../../assets/images/feeds_status/feed_box_75.png'),
        feed: require('../../../assets/images/feeds_status/feed_75.png'),
        wording: '아직 넉넉해요',
        color: '#333'
    } ,
    100: {
        box: require('../../../assets/images/feeds_status/feed_box_100.png'),
        feed: require('../../../assets/images/feeds_status/feed_100.png'),
        wording: '가득찼어요! 당분간은 걱정마세요',
        color: '#000'
    } ,
}

const getFeedStep = (sliderValue: number) => {
    if (sliderValue < 10) {
        return feedStatusSrcMap[0];
    }
    if (sliderValue < 35) {
        return feedStatusSrcMap[25];
    }
    if (sliderValue < 60) {
        return feedStatusSrcMap[50];
    }
    if (sliderValue < 80) {
        return feedStatusSrcMap[75];
    }
    if (sliderValue < 101) {
        return feedStatusSrcMap[100];
    }
    return feedStatusSrcMap[0];
}

export const getFeedStatusSrcMap = (type: 'feed' | 'box' | 'wording' | 'color', sliderValue: number) => getFeedStep(sliderValue)[type]

function FeedModal({
    setOpenStatusModal,
    setSliderValue,
    sliderValue,
}: {
    setOpenStatusModal: React.Dispatch<React.SetStateAction<boolean>>
    setSliderValue: React.Dispatch<React.SetStateAction<number>>
    sliderValue: number
}) {
    

    const themes = useTheme()

    return (
        <PlaypetModal
            modalVisible={true}
            setModalVisible={setOpenStatusModal}
            containerStyle={{
                width: DEVICE_WIDTH,
            }}
            header="현재 사료량"
        >
            <FeedStatusModal>
                <StatusDescription>
                    <Text bold size={65}>
                        {sliderValue}%
                    </Text>
                </StatusDescription>
                <FeedPercentageFullImageWrapper>
                    <FeedPercentageFullImage
                        source={getFeedStatusSrcMap("feed", sliderValue)}
                        resizeMode="contain"
                    />
                    <FeedPercentageFullBoxImage
                        source={getFeedStatusSrcMap("box", sliderValue)}
                        resizeMode="contain"
                    />
                </FeedPercentageFullImageWrapper>
                <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    maximumValue={100}
                    minimumValue={0}
                    step={5}
                    thumbStyle={{ backgroundColor: themes.colors.primary }}
                    minimumTrackTintColor={themes.colors.primary}
                    maximumTrackTintColor={themes.colors.border}
                    style={{
                        width: "90%",
                    }}
                />
            </FeedStatusModal>
        </PlaypetModal>
    );
}

export default FeedModal;

const FeedStatusModal = styled.View`
  flex-direction: column;
  padding: 24px;
  align-items: center;
  /* flex: 1; */
  /* height: 500px; */
`;

const FeedPercentageFullImageWrapper = styled.View`
  margin: 48px 0;
  width: 250px;
  height: 400px;
  position: relative;
`;

const FeedPercentageFullImage = styled.Image`
  width: 250px;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
`;

const FeedPercentageFullBoxImage = styled.Image`
    width: 250px;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;
`