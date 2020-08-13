import React from "react"
import styled from "@emotion/styled"
import { Global, jsx, css } from '@emotion/core';
import baseCSS from '../styles/baseCSS';
import useSiteMetadata from "../hooks/useSiteMetadata";
import SEO from "../components/SEO";

export default function Home() {
    const { siteUrl } = useSiteMetadata();
    return (
        <HomeBlock>
            <SEO
                description="플레이펫 - 반려동물이 더 나은 세상을 위해 노력합니다"
                siteURL={siteUrl}
            />
            <Global styles={baseCSS} />
            <BackgroundSection data-source="https://www.pxfuel.com/en/free-photo-qanng" />
        </HomeBlock>
    )
};

const HomeBlock = styled.div`
    flex: 1;
    height: 100vh;
    justify-content: center;
    align-items: center;
`

const BackgroundSection = styled.div`
    background-image: url('https://firebasestorage.googleapis.com/v0/b/playpet-5b432.appspot.com/o/web%2Fassets%2Fimages%2Fbackground-section.jpg?alt=media&token=8aca14c1-3c09-405c-939d-ef3db29d64b7');
    background-size: cover;
    height: 100vh;
    width: 100%;
    position: relative;

    &:after {
        content: 'playpet';
        display: flex;
        font-size: 60px;
        font-weight: 700;
        color: #eee;
        height: 100%;
        align-items: center;
        justify-content: center;

    }
`;
