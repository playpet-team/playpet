import * as functions from 'firebase-functions';

const Vimeo = require('vimeo').Vimeo;
const client = new Vimeo(
    'dcfe87edfd96e8d87ecd215fa30d2d58a9f82b67',
    '5fQRbq3aIhl+PeHwSFVaxo5gJ02/k2VL8YAi49lb+TrpeJsLfvdIur/AaKxzu56+36LIwEethWo89xwQ8mVZEJc0xm91FEUlBB8HOHB1lwN5OlXczMjcdkVIoezvYNgh',
    '7316d55d1b1c3b894a968988ebe69bdd'
);

export const haha = functions.https.onCall(({ url, uid, method }) => {
    console.log('hahahahaha');
    client.upload(
        url,
        function (uri: string) {
            console.log('File upload completed. Your Vimeo URI is:', uri)
        },
        function (bytesUploaded: number, bytesTotal: number) {
            const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
            console.log(bytesUploaded, bytesTotal, percentage + '%')
        },
        function (error: string) {
            console.log('Failed because: ' + error)
        }
    );
    return true; 
});
