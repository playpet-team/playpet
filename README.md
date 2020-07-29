
# playpet


## client - expo bared-workflow
	react-native, redux-toolkit, typescript, firebase

## web - gatsby + react + firebase hosting
	react, redux-toolkit, typescript, firebase
  
## function - firebase functions serverless
	function exports, 공통로직 분리, 

## firestore - collection
	database

## firestorage - storage
	이미지, 데이타 저장소 (쉽게 s3)

## models
	firefunctions과 클라이언트 + 웹(추후 웹 서비스도 생길경우) 에서 공통으로 import 할 model (type 정의)
  
  
### monorepo

 - Root
	 - packages
	 - firefunction
	 - firestore
	 - firestorage
	 - models
	 - playpet
	 - playpet_web

## 설치

$ yarn
$ lerna bootstrap (각각의 packages에 있는 모노레포들 package.json 을 설치한다)


## client
xcode, android studio 설치

$ cd packages/playpet/ios
$ expo login [id: dev@playpet.me, pw: !Playpet0728]
$ pod install


develop
$ yarn ios | yarn android

deploy
$ expo publish --version X.X.X

## web
$ cd packages/playpet_web

develop
$ npm run dev

build
$ npm run build

deploy
$ npm run deploy

## functions
$ cd packages/firefunction

### all deploy
$ firebase deploy --only functions

### selected function
$ firebase deploy --only functions:[functionName]

## firestore
$ cd packages/firestore
$ firebase deploy --only firestore:rules

## firestorage
$ cd packages/firestorage
$ firebase deploy --only firestorage:rules
