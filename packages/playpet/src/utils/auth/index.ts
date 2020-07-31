import auth from '@react-native-firebase/auth';

export const signInWithCustomToken = (customToken: string) => auth().signInWithCustomToken(customToken);