import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// import { User } from './models';


export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

interface userParams {
    uid: string;
};
export const userDetail = functions.https.onCall(async ({ uid }: userParams) => {
    try {
        return (await admin.firestore()
            .collection('users')
            .doc(uid)
            .get()).data();
    } catch (error) {
        console.error('userDetail: ', error);
        return null;
    }
});
