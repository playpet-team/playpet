import functions from '@react-native-firebase/functions';
export * from './auth';
export const callable = functions().httpsCallable;
export default functions;