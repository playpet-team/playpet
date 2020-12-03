import React from "react";
import { Slider } from 'react-native-elements';
import styled, { useTheme } from "styled-components/native";
import PlaypetModal from "../../components/PlaypetModal";
import { Text } from "../../styles";
import { deviceSize } from "../../utils";
import { StatusDescription } from "./FeedSection";

const DEVICE_WIDTH = deviceSize().width;

const feedStatusSrcMap = [
    {
        id: 0,
        box: require('../../../assets/images/feeds_status/box/img_box_0.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_0.png'),
        wording: ['사료가 없어요! 사료를 채워주세요!'],
        color: '#ff4444'
    }, {
        id: 10,
        box: require('../../../assets/images/feeds_status/box/img_box_1.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_1.png'),
        wording: ['사료가 없어요! 사료를 채워주세요!'],
        color: '#ff4444'
    }, {
        id: 15,
        box: require('../../../assets/images/feeds_status/box/img_box_2.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_2.png'),
        wording: ['거의 다 떨어져가요ㅜㅜ'],
        color: '#ff4444'
    }, {
        id: 18,
        box: require('../../../assets/images/feeds_status/box/img_box_3.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_3.png'),
        wording: ['다음 사료를 준비해주세요'],
        color: '#333'
    }, {
        id: 23,
        box: require('../../../assets/images/feeds_status/box/img_box_4.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_4.png'),
        wording: ['아직 괜찮아요'],
        color: '#333'
    }, {
        id: 31,
        box: require('../../../assets/images/feeds_status/box/img_box_5.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_5.png'),
        wording: ['아직 괜찮아요'],
        color: '#333'
    }, {
        id: 40,
        box: require('../../../assets/images/feeds_status/box/img_box_6.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_6.png'),
        wording: ['아직 괜찮아요'],
        color: '#333'
    }, {
        id: 50,
        box: require('../../../assets/images/feeds_status/box/img_box_7.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_7.png'),
        wording: ['아직 넉넉해요'],
        color: '#333'
    }, {
        id: 60,
        box: require('../../../assets/images/feeds_status/box/img_box_8.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_8.png'),
        wording: ['아직 넉넉해요'],
        color: '#333'
    }, {
        id: 70,
        box: require('../../../assets/images/feeds_status/box/img_box_9.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_9.png'),
        wording: ['아직 넉넉해요'],
        color: '#333'
    }, {
        id: 88,
        box: require('../../../assets/images/feeds_status/box/img_box_10.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_10.png'),
        wording: ['아직 넉넉해요'],
        color: '#333'
    }, {
        id: 92,
        box: require('../../../assets/images/feeds_status/box/img_box_11.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_11.png'),
        wording: ['아직 넉넉해요'],
        color: '#333'
    }, {
        id: 98,
        box: require('../../../assets/images/feeds_status/box/img_box_12.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_12.png'),
        wording: ['가득찼어요!'],
        color: '#000'
    }, {
        id: 100,
        box: require('../../../assets/images/feeds_status/box/img_box_13.png'),
        feed: require('../../../assets/images/feeds_status/feed/img_feed_13.png'),
        wording: ['가득찼어요!'],
        color: '#000'
    },
]

const getFeedStep = (sliderValue: number) => {
    const src = feedStatusSrcMap.find(item => {
        // console.log('sliderValue < Number(item)---', sliderValue, item.id)
        // if (sliderValue < item.id) {
        //     console.log('????', feedStatusSrcMap, item.id)
        //     return true;
        // }
        return sliderValue < item.id
    })
    if (!src) {
        return feedStatusSrcMap[feedStatusSrcMap.length - 1]
    }
    return src
    // if (sliderValue < 10) {
    //     return feedStatusSrcMap[0];
    // }
    // if (sliderValue < 35) {
    //     return feedStatusSrcMap[25];
    // }
    // if (sliderValue < 60) {
    //     return feedStatusSrcMap[50];
    // }
    // if (sliderValue < 80) {
    //     return feedStatusSrcMap[75];
    // }
    // if (sliderValue < 101) {
    //     return feedStatusSrcMap[100];
    // }
    // return feedStatusSrcMap[0];
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
    
    console.log('getFeedStatusSrcMap("feed", sliderValue)---', getFeedStatusSrcMap("feed", sliderValue))

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
                    step={1}
                    thumbStyle={{ backgroundColor: themes.colors.primary, width: 20, height: 20 }}
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