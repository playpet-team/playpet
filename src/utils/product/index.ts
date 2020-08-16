import firestore from '@react-native-firebase/firestore';
import { firebaseTimeStampToStringStamp } from './../system/index';
import { collections } from '../../models';

export const loadProduct = async (PID: string) => {
    return (await firestore()
        .collection(collections.Products)
        .doc(PID)
        .get()).data();
    
};
