import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const serviceAccount = require('./playpet-5b432-261d6cdeaba9.json');

// admin gcp 권한 json -> 보관에 주의해야함
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const getCurrentTime = () => admin.firestore.FieldValue.serverTimestamp();

interface createUserParams {
    uid: string;
    method: string;
}

export const createUserCollection = functions.https.onCall(async ({ uid, method }: createUserParams) => {
    try {
        const {
            email,
            displayName = '',
            phoneNumber = '',
            photoURL = '',
        } = await admin.auth().getUser(uid);

        await admin.firestore().collection('users').doc(uid).set({
            uid,
            method,
            isLeave: false,
            username: displayName,
            email,
            phoneNumber,
            photo: photoURL,
            leaveAt: '',
            gender: '',
            birthDate: '',
            lastLogin: getCurrentTime(),
            createdAt: getCurrentTime(),
            updatedAt: getCurrentTime(),
        });
        return { result: 'signUp', status: 'SUCCESS' };
    } catch (error) {
        console.error('createUserCollection--error--', error);
        return { result: 'error', status: 'SUCCESS' };
    }
});
