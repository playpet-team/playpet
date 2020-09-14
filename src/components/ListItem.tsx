import React from 'react';
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
            onPress={onPress}
            style={{
                padding: 0,
                ...containerStyle
            }}
        >
            <List.Content>
                <List.Title
                    style={{
                        fontSize: 16,
                        padding: 0,
                        ...titleStyle,
                    }}
                >
                    {title}
                </List.Title>
            </List.Content>
            {rightIcon && rightIcon}
        </List>
    );
};
