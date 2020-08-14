import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import firebase from "gatsby-plugin-firebase";

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const users = await firebase.firestore().collection('users').where('isLeave', '==', false).get();
            setUsers(users.docs.map(user => user.data()));
        };
        loadUsers();
    }, []);

    return (
        <UsersBlock>
            {users.map(user => {
                return (
                    <UserBlock key={user.uid}>
                        <div>{user.uid}</div>
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                    </UserBlock>
                )
            })}
        </UsersBlock>
    )
};

const UsersBlock = styled.div`
    flex: 1;
`
const UserBlock = styled.div`
    padding: 8px;
    margin-bottom: 4px;
    border-bottom: 1px solid black;
`;