import React, { useEffect } from "react"
import styled from "@emotion/styled"
import firebase from "gatsby-plugin-firebase";
import { navigate, Link } from "gatsby";
import useAuth from "../hooks/useAuth";

export default function Bao() {
    useAuth();

    return (
        <BaoBlock>
            나는 바오
            <Link to="users">유저님 관리</Link>
            <Link to="banners">배너들 관리</Link>
        </BaoBlock>
    )
};

const BaoBlock = styled.div`
    flex: 1;
    height: 100vh;
    justify-content: center;
    align-items: center;
`
