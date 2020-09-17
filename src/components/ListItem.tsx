import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Avatar, ListItem as List } from 'react-native-elements';

export default function ListItem({ title, onPress, titleStyle, containerStyle, rightIcon, activeStyle, avatarSource = null }: {
    title: string;
    onPress: () => void;
    titleStyle?: object;
    containerStyle?: object;
    activeStyle?: object;
    avatarSource?: ImageSourcePropType | null;
    rightIcon?: React.ReactElement;
}) {
    return (
        <List
            onPress={onPress}
            style={{
                padding: 0,
            }}
            containerStyle={{
                ...activeStyle,
                ...containerStyle,
            }}
        >
            {avatarSource !== null &&
                <Avatar
                    source={avatarSource}
                    rounded={true}
                />
            }
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
