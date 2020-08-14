import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import firebase from "gatsby-plugin-firebase";

export default function Banners() {
    const [banners, setbanners] = useState([]);

    useEffect(() => {
        async function loadbanners() {
            const banners = await firebase.firestore().collection('banners').get();
            setbanners(banners.docs.map(banner => {
                return {
                    id: banner.id,
                    ...banner.data(),
                }
            }));
        };
        loadbanners();
    }, []);

    return (
        <BannersBlock>
            {banners.map(banner => {
                return (
                    <BannerBlock key={banner.id}>
                        <div>{banner.id}</div>
                        <div>{banner.bannerName}</div>
                    </BannerBlock>
                )
            })}
        </BannersBlock>
    )
};

const BannersBlock = styled.div`
    flex: 1;
`
const BannerBlock = styled.div`
    padding: 8px;
    margin-bottom: 4px;
    border-bottom: 1px solid black;
`;