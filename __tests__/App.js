// import 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Logo from '../src/components/Logo';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const { getAllByText } = render(<Logo />);
});

// test('form submits two answers', () => {


// })