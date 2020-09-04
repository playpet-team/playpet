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

XXX ### node_modules 변경 XXX
naver 로그인이 컴파일 에러가난다 하지만 업데이트가 안되고 있다. 대체제가 없다. 하지만 해결책은 있다.
`node_modules/@react-native-seoul/naver-login/android/build.gradle`
`android {
  compileSdkVersion rootProject.ext.hasProperty('compileSdkVersion') ? rootProject.ext.compileSdkVersion : DEFAULT_COMPILE_SDK_VERSION
  buildToolsVersion rootProject.ext.hasProperty('buildToolsVersion') ? rootProject.ext.buildToolsVersion : DEFAULT_BUILD_TOOLS_VERSION

  defaultConfig {
    minSdkVersion rootProject.ext.hasProperty('minSdkVersion') ? rootProject.ext.minSdkVersion : DEFAULT_MIN_SDK_VERSION
    targetSdkVersion rootProject.ext.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : DEFAULT_TARGET_SDK_VERSION
    versionCode 1
    versionName "1.0"
  }
  lintOptions {
    abortOnError false
  }
}`
에서 모든 ext를 제거하고 마지막
`compile 'com.facebook.react:react-native:+' 를 implementation로 변경한다`