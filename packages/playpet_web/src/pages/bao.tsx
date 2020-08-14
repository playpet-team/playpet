import React, { useEffect } from "react"
import styled from "@emotion/styled"
import firebase from "gatsby-plugin-firebase";
import { navigate, Link } from "gatsby";

export default function Bao() {
    if (!firebase.auth().currentUser) {
        navigate('/');
    }
    const [user, setUser] = React.useState<firebase.User | null>(firebase.auth().currentUser ? firebase.auth().currentUser : null);

    return (
        <BaoBlock>
            나는 바오
            <Link to="/bao/users">유저님들</Link>
            <Link to="/bao/banners">배너관리</Link>
        </BaoBlock>
    )
};

const BaoBlock = styled.div`
    flex: 1;
    height: 100vh;
    justify-content: center;
    align-items: center;
`
