import React, { useEffect, useMemo, useRef } from "react";
import Animated, { Easing, interpolate, Value } from 'react-native-reanimated';
import styled from "styled-components/native";

export default function Transition({ children, type = 'fade-left' }: {
    children: JSX.Element
    type?: string
}) {
    const value = useRef(new Value(0)).current

    const fadeType = useMemo(() => {
        let fade = {
            translateX: interpolate(value, {
                inputRange: [0, 1],
                outputRange: [0, 0]
            }),
            translateY: interpolate(value, {
                inputRange: [0, 1],
                outputRange: [0, 0]
            }),
        }
        switch (type) {
            case 'fade-top': {
                fade.translateY = interpolate(value, {
                    inputRange: [0, 1],
                    outputRange: [-60, 0]
                })
                break;
            }
            case 'fade-bottom': {
                fade.translateY = interpolate(value, {
                    inputRange: [0, 1],
                    outputRange: [60, 0]
                })
                break;
            }
            case 'fade-right': {
                fade.translateX = interpolate(value, {
                    inputRange: [0, 1],
                    outputRange: [-60, 0]
                })
                break;
            }
            case 'fade-left':
            default: {
                fade.translateX = interpolate(value, {
                    inputRange: [0, 1],
                    outputRange: [60, 0]
                })
                break;
            }
        }
        return fade
    }, [type])

    useEffect(() => {
        Animated.timing(
            value,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.inOut(Easing.ease)
            }
        ).start()
    }, [])

    return (
        <TransitionBlock
            style={{
                opacity: value,
                transform: [fadeType],
            }}
        >
            {children}
        </TransitionBlock>
    )
}

const TransitionBlock = styled(Animated.View)`
  
`
