import { User } from '@playpet/firefunction';
import { callable } from '.';

export const callSignUp = async (params: User) =>  {
    await callable('listProducts')(params);
};
