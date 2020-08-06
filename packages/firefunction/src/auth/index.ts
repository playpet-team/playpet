import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const updateLeftAt = async (uid: string) => {
    const now = admin.firestore.Timestamp.now();
    return await admin.firestore().collection('users').doc(uid).set({
        isLeave: true,
        leaveAt: now,
        updatedAt: now,
    },
        { merge: true }
    )
}

export const withdraw = functions.https.onCall(async (_data, { auth }) => {
    try {
        if (!auth || !auth.uid) {
            return { status: 'FAIL' };
        }
        const uid = auth.uid;
        await updateLeftAt(uid);
        await admin.auth().deleteUser(uid);
        return { status: 'SUCCESS' }
    } catch (e) {
        console.error(`withdraw: ${e}`)
        return { status: 'FAIL' }
    }
});