// import * as Linking from 'expo-linking';

export default {
    prefixes: [''],
    config: {
        screens: {
            Home: {
                screens: {
                    TabOne: {
                        screens: {
                        TabOneScreen: 'one',
                        },
                    },
                    TabTwo: {
                        screens: {
                        TabTwoScreen: 'two',
                        },
                    },
                },
            },
            NotFound: '*',
        },
    },
};
