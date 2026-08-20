import gsap from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';

import { Stamp } from '../art/Marks';
import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';

const WireCube = () => (
  <svg viewBox="0 0 420 420" fill="none" aria-hidden="true">
    <path d="M210 42 360 128v174l-150 86-150-86V128L210 42Z" stroke="currentColor" strokeWidth="3" />
    <path d="m60 128 150 88 150-88M210 216v172M210 42v174" stroke="currentColor" strokeWidth="2" />
    <path d="m108 157 102-59 102 59v118l-102 59-102-59V157Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="7 9" />
    <circle cx="210" cy="42" r="7" fill="currentColor" />
    <circle cx="360" cy="128" r="7" fill="currentColor" />
    <circle cx="360" cy="302" r="7" fill="currentColor" />
    <circle cx="210" cy="388" r="7" fill="currentColor" />
    <circle cx="60" cy="302" r="7" fill="currentColor" />
    <circle cx="60" cy="128" r="7" fill="currentColor" />
  </svg>
);

const UnderDevelopmentPage = () => {
  const pageRef = useRef(null);

  usePageSeo({
    title: '3D Art | Under Development | Jack Miller',
    description: 'The 3D Art section of Jack Miller Media is currently under development.',
    url: 'https://jackmillermedia.com/3d-art/',
    robots: 'noindex, follow',
  });

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.from('.wip-panel > *', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
      gsap.to('.wip-panel__art', {
        y: -10,
        rotation: 2,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, pageRef);

    return () => context?.revert?.();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={pageRef} id="main-content" className="wip-page" role="main">
        <section className="wip-panel" aria-labelledby="wip-title">
          <div>
            <span className="tape-label">3D Art · Work in progress</span>
            <h1 id="wip-title">Page under development</h1>
            <p>
              This space is being prepared for the 3D work. Check back soon for the finished gallery.
            </p>
            <div className="wip-stamp">
              <Stamp label="WIP" />
            </div>
          </div>
          <div className="wip-panel__art">
            <WireCube />
          </div>
        </section>
      </main>
    </>
  );
};

export default UnderDevelopmentPage;
