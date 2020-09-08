// import 'react-native';
import React from 'react';
import ProductListItem from './ProductListItem';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render, fireEvent, act } from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

it('<ProductListItem />', async () => {

    const { getByTestId, getByText } = render(
        <MockedNavigator
            component={ProductListItem}
            params={{
                image: '이미지 url',
                title: '테스트 타이틀',
                description: '테스트 설명',
                price: 1000,
                url: 'url',
            }}
        />
    );

    await act(async () => {
        console.log('----------')
        expect(getByTestId('ProductListItem-block')).toBeDefined()
    })

    // expect(getByTestId('ProductListItem-block')).toBe(true)
});

const { Navigator, Screen } = createStackNavigator();
const MockedNavigator = ({ component, params }: { component: JSX.Element | any; params: any }) => {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen
                    name="ProductListItem"
                    component={component}
                    initialParams={params}
                />
            </Navigator>
        </NavigationContainer>
    );
};

export default MockedNavigator;
