import React, { ReactNode } from 'react';
import { ListItem as List } from 'react-native-elements';

export default function ListItem({ title, onPress, titleStyle, containerStyle, rightIcon }: {
    title: string;
    onPress: () => void;
    titleStyle?: object;
    containerStyle?: object;
    rightIcon?: React.ReactElement;
}) {
    return (
        <List
            title={title}
            onPress={onPress}
            titleStyle={{
                fontSize: 16,
                ...titleStyle,
            }}
            containerStyle={{
                padding: 16,
                ...containerStyle
            }}
            rightIcon={rightIcon && rightIcon}
        />
    );
};