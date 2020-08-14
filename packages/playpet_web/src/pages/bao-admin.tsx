import React from 'react'
import styled from '@emotion/styled'
import firebase from 'gatsby-plugin-firebase';
import { Link } from 'gatsby';
const provider = new firebase.auth.GoogleAuthProvider();

export default function BaoAdmin() {
    const [user, setUser] = React.useState<firebase.User | null>(firebase.auth().currentUser ? firebase.auth().currentUser : null);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    const login = async () => {
        const { credential }: any = await firebase.auth().signInWithPopup(provider);
        if (credential) {
            localStorage.setItem('gToken', JSON.stringify(credential));
        }
    };
    const logout = async () => await firebase.auth().signOut();

    return (
        <BaoAdminBlock>
            {user ?
                <button onClick={logout}>logout</button>
                :
                <button onClick={login}>login</button>
            }
            {!user && 'Loading...'}
            <br />
            {user && <Link to="/bao">바오로 가기</Link>}
        </BaoAdminBlock>
    );
};

const BaoAdminBlock = styled.div`
    flex: 1;
    justify-content: center;
    align-items: center;
`
