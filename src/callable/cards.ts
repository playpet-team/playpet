import functions from '@react-native-firebase/functions';
import { CardLike } from '../utils';

enum callable {
    ManageCardLikes = 'manageCardLikes',
}
export const manageCardLikes = async ({ uid, id, methods }: CardLike) => await functions().httpsCallable(callable.ManageCardLikes)({ uid, id, methods });
