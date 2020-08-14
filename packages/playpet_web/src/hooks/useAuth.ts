import { navigate } from 'gatsby';
import React, { useEffect } from "react"
import firebase from "gatsby-plugin-firebase";

export default function useAuth() {
    useEffect(() => {
        if (!firebase.auth().currentUser) {
            try {
                const gTokenItem = localStorage.getItem('gToken');
                if (gTokenItem !== null) {
                    const gToken = JSON.parse(gTokenItem);
                    const refreshToken = firebase.auth.GoogleAuthProvider.credential(gToken.oauthIdToken);
                    firebase.auth().signInWithCredential(refreshToken);
                }
            } catch (e) {
                alert('뭔가 오류가 났다 bk 에게 연락 요망');
                navigate('/');
            }
        }
    }, []);

};
