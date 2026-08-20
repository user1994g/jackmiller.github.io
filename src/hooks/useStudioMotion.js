import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const useStudioMotion = (scopeRef, { hero = false } = {}) => {
  useLayoutEffect(() => {
    const root = scopeRef.current;
    if (!root || typeof window === 'undefined') return undefined;

    const context = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduced) {
        gsap.set(root.querySelectorAll('[data-reveal], [data-stagger] > *'), { clearProps: 'all' });
        return;
      }

      if (hero) {
        gsap.from(root.querySelectorAll('[data-hero]'), {
          yPercent: 105,
          opacity: 0,
          duration: 0.78,
          stagger: 0.07,
          ease: 'power4.out',
        });
      }

      root.querySelectorAll('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      root.querySelectorAll('[data-stagger]').forEach((group) => {
        gsap.from(group.children, {
          y: 28,
          opacity: 0,
          duration: 0.66,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 86%', once: true },
        });
      });
    }, root);

    return () => context?.revert?.();
  }, [hero, scopeRef]);
};

export default useStudioMotion;
