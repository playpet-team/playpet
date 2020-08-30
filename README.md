## install

### cacaopods 없을경우 -> https://guides.cocoapods.org/using/getting-started.html
### expo-cli 없을경우 -> yarn global add expo-cli

`$ yarn`
`$ npx pod-install`
`yarn ios || yarn android`

`splash 변경`
`$ yarn run configure-splash-screen -r cover #0558d1 #0558d1 ./assets/splash/splash.png`
`app icon 변경`
`$ react-native set-icon --path ./assets/icons/appicon.png --background "#0558d1"`