// import * as React from 'react';
import { GoogleSignin } from '@react-native-community/google-signin';

const GOOGLE_WEB_CLIENT_ID = '386527552204-t1igisdgp2nm4q6aoel7a2j3pqdq05t6.apps.googleusercontent.com';
GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID });

export default function useInitializeSignIn() {
    return [GoogleSignin];
}
