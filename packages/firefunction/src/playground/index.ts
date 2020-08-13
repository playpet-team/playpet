import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getCurrentTime } from './../';

// const Vimeo = require('vimeo').Vimeo;
// const client = new Vimeo(
//     'dcfe87edfd96e8d87ecd215fa30d2d58a9f82b67',
//     '5fQRbq3aIhl+PeHwSFVaxo5gJ02/k2VL8YAi49lb+TrpeJsLfvdIur/AaKxzu56+36LIwEethWo89xwQ8mVZEJc0xm91FEUlBB8HOHB1lwN5OlXczMjcdkVIoezvYNgh',
//     '7316d55d1b1c3b894a968988ebe69bdd'
// );

export const manageCardLikes = functions.https.onCall(async ({ uid, id, methods }) => {
    try {
        const docExists = (await admin.firestore().collection('userActions').doc(uid).get()).exists;
        const promiseArr = [];
        if (docExists) {
            promiseArr.push(
                admin.firestore().collection('userActions').doc(uid).update({
                    cardLikes: methods === 'add' ?
                        admin.firestore.FieldValue.arrayUnion(id)
                        :
                        admin.firestore.FieldValue.arrayRemove(id),
                    updatedAt: getCurrentTime(),
                })
            );
        } else {
            promiseArr.push(
                admin.firestore().collection('userActions').doc(uid).set({
                    cardLikes: [id],
                    updatedAt: getCurrentTime(),
                    createdAt: getCurrentTime(),
                })
            );
        }
        promiseArr.push(
            admin.firestore().collection('playground').doc(id).update({
                likes: admin.firestore.FieldValue.increment(1),
                updatedAt: getCurrentTime(),
            })
        );
        await Promise.all(promiseArr);
        return true;
    } catch (error) {
        console.error('manageCardLikes-error-', error)
        return false;
    }
});

export const videoTest = functions.https.onCall(({ url, uid, method }) => {
    // client.upload(
    //     url,
    //     function (uri: string) {
    //     },
    //     function (bytesUploaded: number, bytesTotal: number) {
    //         const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
    //     },
    //     function (error: string) {
    //     }
    // );
    return true; 
});
