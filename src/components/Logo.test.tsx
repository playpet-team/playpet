// import 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Logo from './Logo';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

it('<Logo />', () => {
    render(<Logo />);
});

// test('form submits two answers', () => {


// })