import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12, label: 'Selected titles', frame: 'A01' },
  { value: 10, label: 'Still studies', frame: 'A02' },
  { value: 4, label: 'Write ups', frame: 'A03' },
  { value: 2026, label: 'Current reel', frame: 'A04' },
];

const Stats = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      root.querySelectorAll('[data-count]').forEach((node) => {
        const end = Number(node.dataset.count);
        const counter = { value: reduced ? end : 0 };
        gsap.to(counter, {
          value: end,
          duration: reduced ? 0 : 1.2,
          ease: 'power3.out',
          scrollTrigger: reduced ? undefined : { trigger: node, start: 'top 92%', once: true },
          onUpdate: () => { node.textContent = String(Math.round(counter.value)); },
        });
      });
    }, root);
    return () => context?.revert?.();
  }, []);

  return (
    <section className="slate-strip" ref={sectionRef} aria-label="Portfolio snapshot">
      <div className="studio-wrap slate-strip__grid">
        {stats.map((stat) => (
          <article className="slate-stat" key={stat.label}>
            <span className="frame-number">{stat.frame}</span>
            <strong data-count={stat.value}>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Stats;
