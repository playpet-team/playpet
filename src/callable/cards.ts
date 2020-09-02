import functions from '@react-native-firebase/functions';
import { CardLike } from '../utils';
import { callable } from './callableList';

export const manageCardLikes = async ({ uid, id, methods }: CardLike) => await functions().httpsCallable(callable.ManageCardLikes)({ uid, id, methods });
