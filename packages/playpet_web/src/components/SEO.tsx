/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export interface SEOProps {
    meta?: {
        name: string;
        content: string;
    }[];
    description?: string;
    title?: string;
    breadcrumbListElement?: {
        '@type': string;
        position: number;
        name: string;
        item: string;
    }[];
    siteURL: string;
}

function SEO({
    meta = [],
    description = '',
    title = '',
    breadcrumbListElement = [],
    siteURL,
}: SEOProps) {
    const { site } = useStaticQuery(
        graphql`
        query {
            site {
            siteMetadata {
                title
                description
                author
            }
            }
        }
    `,
    );

    const metaDescription = description || site.siteMetadata.description;
    const metaTitle = title ? `${title} - ${site.siteMetadata.title}` : site.siteMetadata.title;

    return (
        <Helmet
            htmlAttributes={{
                lang: 'ko-KR',
                xmlns: 'http://www.w3.org/1999/xhtml',
                prefix: 'og: http://ogp.me/ns#',
                'xml:lang': 'ko-KR',
            }}
            title={metaTitle}
            meta={[
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    property: 'og:title',
                    content: metaTitle,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:site_name',
                    content: 'playpet.me',
                },
                {
                    property: 'og:locale',
                    content: 'ko_KR',
                },
                {
                    property: 'og:url',
                    content: siteURL,
                },
                // {
                //     property: 'og:image',
                //     content: 'https://d2v80xjmx68n4w.cloudfront.net/assets/kmong_is/ogimage.jpg',
                // },
                // {
                //     name: 'twitter:card',
                //     content: 'summary',
                // },
                // {
                //     name: 'twitter:creator',
                //     content: site.siteMetadata.author,
                // },
                // {
                //     name: 'twitter:title',
                //     content: metaTitle,
                // },
                // {
                //     name: 'twitter:description',
                //     content: metaDescription,
                // },
                // {
                //     name: 'naver-site-verification',
                //     content: 'a8da4364f6265f22766b94da0d1e102a714a49e0',
                // },
                // {
                //     name: 'google-site-verification',
                //     content: 'Qq8HA6gvJndnKGi0WTgYig4C20pC3u0dx9j1UeHGVaY',
                // },
                // {
                //     name: 'robots',
                //     content: 'index, follow',
                // },
            ].concat(meta)}
        >
            {/* <script type="application/ld+json">
                {`
          {
            "@context": "http://schema.org",
            "@type": "Organization",
            "url": "https://playpet.me",
            "name": "playpet.me",
            "alternateName": "playpet",
            "description": "플레이펫 - 반려동물이 더 나은 세상을 위해 노력합니다",
            "logo": "https://d2v80xjmx68n4w.cloudfront.net/assets/kmong_is/ogimage.jpg",
            "sameAs": [
              "https://kmong.com",
              "https://www.facebook.com/kmongkorea/",
              "https://www.instagram.com/kmong_official/",
              "https://www.youtube.com/channel/UCUpdmwMWbAEtK7jf_7XztAw",
              "https://www.youtube.com/channel/UCaOGlL_px_qYIXQ6jEq0IwQ",
              "https://post.naver.com/kmongteam",
              "https://blog.kmong.com",
              "https://blog.naver.com/kmongteam",
              "https://tv.naver.com/kmong",
              "https://play.google.com/store/apps/details?id=com.kmong.kmong&hl=ko",
              "https://itunes.apple.com/kr/app/id1039179300"
            ]
          }
        `}
            </script> */}

            {/* <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [{
                        '@type': 'ListItem',
                        position: 1,
                        name: '메인',
                        item: 'https://www.kmongcorp.com/',
                    }].concat(breadcrumbListElement),
                })}
            </script> */}
        </Helmet>
    );
}

export default SEO;
