import * as functions from 'firebase-functions';
import { user } from '@playpet/models';

const uuu:user = {
  haha: '123',
};
console.log('uuu', uuu);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
