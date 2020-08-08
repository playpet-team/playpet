// utils
import firestore from '@react-native-firebase/firestore';

export * from './system';
export * from './auth';
export * from './cards';

export const firebaseNow = () => firestore.Timestamp.now();