import { SignType } from '../models';
import functions from '@react-native-firebase/functions';
import { callable } from './callableList';

// interface createUserCollectionParams {
//     uid: string;
//     method?: SignType;
// };
// export const createUserCall = async (params: createUserCollectionParams) => {
//     await functions().httpsCallable(callable.CreateUserCollection)(params);
// };
// export const withdrawCall = async () => await functions().httpsCallable(callable.Withdraw)();
// export const createUser = async (form: {
//     email: string
//     username: string
//     photo: string
//     method: string
// }) => await functions().httpsCallable(callable.CreateUser)(form);
export const videoTest = async (url: string) => await functions().httpsCallable('haha')(url);
