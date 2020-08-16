// import * as Linking from 'expo-linking';

export default {
    prefixes: ['playpet.page.link'],
    config: {
        screens: {
            AppLogin: 'login',
            Home: {
                screens: {
                    HomeNavigator: 'home',
                    CardFormNavigator: 'card-form',
                    PlayGroundNavigator: 'playground',
                    AuthNavigator: 'auth',
                },
            },
        },
    },
};
