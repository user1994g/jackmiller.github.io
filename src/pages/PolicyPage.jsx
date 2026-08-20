import React from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';

const policyCopy = {
  privacy: {
    title: 'Privacy Policy',
    description:
      'Privacy policy for Jack Miller Media, including analytics, advertising, cookies, and contact information.',
    intro:
      'This privacy policy explains how Jack Miller Media handles basic visitor information, analytics, advertising services, and contact messages. The site is a personal creative media portfolio run by Jack Miller.',
    sections: [
      {
        heading: 'Information this site may collect',
        body:
          'The site may receive standard technical information such as browser type, device type, approximate location, referring pages, and pages viewed. If you contact me directly, I may receive the name, email address, and message details you choose to send.',
      },
      {
        heading: 'Analytics and advertising',
        body:
          'This site may use Microsoft Clarity and Google advertising services to understand how pages are used and to support the site with ads. These services may use cookies or similar technologies to measure visits, prevent fraud, and personalise or limit advertising where applicable.',
      },
      {
        heading: 'Location availability checks',
        body:
          'To check whether the site is available in a visitor’s region, the browser may request approximate location information from ipwho.is, ipapi.co, or ipinfo.io. Those providers receive the visitor’s IP address as part of the request. The resulting allow or block decision may be stored temporarily in the visitor’s browser.',
      },
      {
        heading: 'Cookies',
        body:
          'Cookies are small files stored by your browser. You can block or delete cookies in your browser settings. Some embedded media, analytics, or advertising features may work differently if cookies are disabled.',
      },
      {
        heading: 'How information is used',
        body:
          'Information is used to keep the site working, understand which pages are useful, improve the portfolio, respond to messages, protect against abuse, and comply with advertising and legal requirements.',
      },
      {
        heading: 'Contact',
        body:
          'For privacy questions, contact Jack Miller through the contact details or social links provided on jackmillermedia.com.',
      },
    ],
  },
  terms: {
    title: 'Terms and Editorial Standards',
    description:
      'Terms, content ownership, editorial standards, and advertising standards for Jack Miller Media.',
    intro:
      'These terms explain how the work on Jack Miller Media may be used and how the site approaches original content, advertising, and visitor experience.',
    sections: [
      {
        heading: 'Original portfolio content',
        body:
          'The videos, images, 3D work, page copy, and project notes on this site are presented as Jack Miller Media portfolio material unless otherwise credited. The writing is intended to explain the creative process behind the work rather than fill pages with duplicate or automated text.',
      },
      {
        heading: 'Permitted use',
        body:
          'You may view and share links to public pages. You may not copy, sell, re-upload, or represent the site content as your own without permission from Jack Miller.',
      },
      {
        heading: 'Advertising standards',
        body:
          'Ads should not block the main content, mislead visitors, or appear as fake navigation. Advertising placements are kept separate from editorial and portfolio content so visitors can tell what is content and what is advertising.',
      },
      {
        heading: 'Accuracy and updates',
        body:
          'This is a developing creative portfolio. Project descriptions, links, page structure, and availability of videos may change as work is updated, corrected, or replaced with stronger material.',
      },
      {
        heading: 'External links',
        body:
          'The site may link to external platforms such as YouTube, Instagram, GitHub, Sketchfab, or other services. Those services have their own terms and privacy practices.',
      },
    ],
  },
};

const PageMain = styled.main`
  min-height: 100vh;
  padding: calc(5.8rem + var(--gutter)) var(--gutter) var(--section-gap);
`;

const Article = styled.article`
  width: min(860px, 100%);
  margin: 0 auto;
  padding: clamp(1.35rem, 4vw, 2.6rem);
  border-radius: 1.5rem;
  border: 1px solid var(--line);
  background: rgba(18, 16, 23, 0.86);
`;

const Kicker = styled.p`
  margin: 0;
  color: var(--acid);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.76rem;
`;

const Title = styled.h1`
  margin: 0.7rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 4rem);
  letter-spacing: -0.05em;
  color: var(--paper);
`;

const Intro = styled.p`
  margin-top: 1rem;
  line-height: 1.78;
  color: rgba(229, 233, 240, 0.8);
`;

const Section = styled.section`
  margin-top: clamp(1.25rem, 3vw, 2rem);
  padding-top: clamp(1.1rem, 2.5vw, 1.5rem);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Heading = styled.h2`
  margin: 0;
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  color: rgba(255, 255, 255, 0.95);
`;

const Body = styled.p`
  margin-top: 0.65rem;
  line-height: 1.76;
  color: rgba(224, 228, 235, 0.76);
`;

const Updated = styled.p`
  margin-top: 1.5rem;
  color: rgba(224, 228, 235, 0.62);
  font-size: 0.86rem;
`;

const PolicyPage = ({ variant = 'privacy' }) => {
  const page = policyCopy[variant] || policyCopy.privacy;
  const canonicalPath = variant === 'terms' ? '/terms/' : '/privacy/';

  usePageSeo({
    title: `${page.title} | Jack Miller Media`,
    description: page.description,
    url: `https://jackmillermedia.com${canonicalPath}`,
  });

  return (
    <>
      <Navbar />
      <PageMain id="main-content" className="App" role="main">
        <Article>
          <Kicker>Jack Miller Media</Kicker>
          <Title>{page.title}</Title>
          <Intro>{page.intro}</Intro>
          {page.sections.map((section) => (
            <Section key={section.heading}>
              <Heading>{section.heading}</Heading>
              <Body>{section.body}</Body>
            </Section>
          ))}
          <Updated>Last updated: 28 June 2026</Updated>
        </Article>
      </PageMain>
    </>
  );
};

export default PolicyPage;
