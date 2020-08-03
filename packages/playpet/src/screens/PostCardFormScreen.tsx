import React from 'react';
import styled from '@emotion/native';
import { Input, Text, Icon } from 'react-native-elements';

export default function PostCardFormScreen() {
    return (
        <PostCardBlock>
            <Text>Post</Text>
            <InputTextGroup>
                <Input
                    placeholder='Title 필수'
                />
                <Input
                    placeholder='Description 선택?'
                    multiline
                    inputStyle={{
                        minHeight: 100,
                    }}
                />
            </InputTextGroup>
            <UploadImageBlock>
                <UploadImage>
                    <Icon
                        name="get-app"
                    />
                </UploadImage>
            </UploadImageBlock>
        </PostCardBlock>
    );
};

const PostCardBlock = styled.View`
flex: 1;
`;

const InputTextGroup = styled.View`
    flex-direction: column;
`;

const UploadImageBlock = styled.View`
    align-items: center;
    justify-content: center;
`;

const UploadImage = styled.TouchableOpacity`
    border-width: 1px;
    border-style: solid;
    border-color: #999;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
`;
