import React from 'react';

import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';

const policyCopy = {
  privacy: {
    title: 'Privacy Policy',
    description:
      'Privacy policy for Jack Miller Media, including analytics, advertising, cookies, and contact information.',
    intro:
      'This privacy policy explains how Jack Miller Media handles basic visitor information, analytics, advertising services, and contact messages. The site is a personal creative media portfolio run by Jack Miller.',
    updated: '31 July 2026',
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
    updated: '28 June 2026',
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

const toId = (heading) => heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

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
      <main id="main-content" className="reading-page" role="main">
        <div className="studio-wrap reading-layout">
          <aside className="reading-layout__rail">
            <span>Jack Miller Media</span>
            <nav aria-label={`${page.title} sections`}>
              {page.sections.map((section, index) => (
                <a key={section.heading} href={`#${toId(section.heading)}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{section.heading}</span>
                </a>
              ))}
            </nav>
          </aside>

          <article className="reading-article">
            <span className="tape-label">Jack Miller Media</span>
            <h1>{page.title}</h1>
            <p className="reading-article__intro">{page.intro}</p>

            {page.sections.map((section) => (
              <section className="reading-section" id={toId(section.heading)} key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}

            <p className="reading-updated">Last updated: {page.updated}</p>
          </article>
        </div>
      </main>
    </>
  );
};

export default PolicyPage;
