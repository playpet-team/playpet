import { signEnum } from '../models';
import functions, { FirebaseFunctionsTypes } from '@react-native-firebase/functions';

interface createUserCollectionParams {
    uid: string;
    method?: signEnum;
}
export const createUserCollection = async (params: createUserCollectionParams): Promise<FirebaseFunctionsTypes.HttpsCallableResult> =>  {
    return await functions().httpsCallable('createUserCollection')(params);
};
