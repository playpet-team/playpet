import analytics from '@react-native-firebase/analytics'
import { DefaultTheme as DefaultThemeValue, NavigationContainer, NavigationContainerRef, RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import * as Sentry from "@sentry/react-native"
import * as React from 'react'
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { ThemeProvider } from 'styled-components/native'
import useAuthStateChanged from '../hooks/useAuthStateChanged'
import AppLogin from '../screens/AppLogin'
import { defaultColorPalette } from '../styles/colors'
import { currentUser } from '../utils'
import { Crash } from '../utils/system/crash'
import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from './LinkingConfiguration'

declare module 'styled-components' {
  export interface DefaultTheme {
    dark: boolean
    colors: {
        primary: string
        background: string
        text: string
        placeholder: string
        border: string
        card: string
        notification: string
        white: string
        grey: string
    }
  }
}

Appearance.getColorScheme()

export default function Navigation() {
    const colorScheme = useColorScheme()
    const routeNameRef = React.useRef<React.RefObject<NavigationContainerRef> | any>(null)
    const navigationRef = React.useRef<React.RefObject<NavigationContainerRef> | any>(null)

    useAuthStateChanged()

    const onChangeScreen = React.useCallback(() => {
        try {
            const previousRouteName = routeNameRef.current
            const currentRouteName = navigationRef.current.getCurrentRoute().name

            if (previousRouteName !== currentRouteName) {
                analytics().logScreenView({ screen_name: currentRouteName })
            }
            routeNameRef.current = currentRouteName
        } catch (e) {
            Sentry.captureException(e)
        }
    }, [navigationRef])
    const themes = colorScheme === 'dark' ? {
        ...DefaultThemeValue,
        colors: {
            ...DefaultThemeValue.colors,
            ...defaultColorPalette,
        },
    } : {
        ...DefaultThemeValue,
        colors: {
            ...DefaultThemeValue.colors,
            ...defaultColorPalette,
        }
    }

    return (
        <AppearanceProvider>
            <ThemeProvider
                theme={themes}
            >
                <NavigationContainer
                    linking={LinkingConfiguration}
                    theme={themes}
                    ref={navigationRef}
                    onReady={() => {
                        routeNameRef.current = navigationRef.current.getCurrentRoute().name
                        analytics().logScreenView({ screen_name: routeNameRef.current })
                    }}
                    onStateChange={onChangeScreen}
                >
                    <RootNavigator />
                </NavigationContainer>
            </ThemeProvider>
        </AppearanceProvider>
    )
}

export type RootStackParamList = {
    Home: undefined
    AppLogin: undefined
    NotFound: undefined
}

const RootStack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
    const user = currentUser()
    React.useEffect(() => {
        Crash.setCrashlyticsCollectionEnabled(true)
        ErrorUtils.setGlobalHandler(Crash.crashError)
        if (!user) {
            return
        }
        Crash.setUserId(user.uid)

    }, [])


    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {user ?
                <RootStack.Screen name="Home" component={BottomTabNavigator} />
                :
                <RootStack.Screen name="AppLogin" component={AppLoginNavigator} />}
        </RootStack.Navigator>
    )
}

export type AppLoginNavigatorTabParamList = {
    AppLogin: undefined;
    AppLoginAgreeTerms: undefined;
};
const AppLoginNavigatorTapStack = createStackNavigator<AppLoginNavigatorTabParamList>();

const AppLoginNavigator = () => {
    return (
        <AppLoginNavigatorTapStack.Navigator
            initialRouteName="AppLogin"
        >
            <AppLoginNavigatorTapStack.Screen
                name="AppLogin"
                component={AppLogin}
                options={{
                    headerShown: false,
                }}
            />
        </AppLoginNavigatorTapStack.Navigator>
    )
}

export type CustomStackScreenProp<
    RouteName extends keyof RootStackParamList
    > = {
        route: RouteProp<RootStackParamList, RouteName>
        navigation: StackNavigationProp<RootStackParamList, RouteName>
    }
