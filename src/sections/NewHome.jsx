import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import '../styles/NewHome.css';

gsap.registerPlugin(ScrollTrigger);

const imageIds = Array.from({ length: 49 }, (_, i) => i + 1);
const makeSet = (count, offset) => Array.from({ length: count }, (_, i) => imageIds[(i + offset) % imageIds.length]);
const galleryVersion = '20260517c';

const grids = [
  {
    id: 'grid-1',
    className: 'grid grid--1',
    images: makeSet(18, 0),
    title: 'Stories carved in light',
    titleClass: 'content__title--left',
  },
  {
    id: 'grid-2',
    className: 'grid grid--2',
    images: makeSet(20, 7),
    title: 'Fragments of movement',
    titleClass: 'content__title--right',
    spacing: true,
    spacingClass: 'content--spacing-mid',
  },
  {
    id: 'grid-3',
    className: 'grid grid--3',
    images: makeSet(16, 15),
    title: 'Cinematic shadow play',
    titleClass: 'content__title--left',
    hint: 'Keep scrolling',
    gapClass: 'content--gap-tight',
  },
  {
    id: 'grid-4',
    className: 'grid grid--4',
    images: makeSet(12, 23),
    title: 'Frames that breathe',
    titleClass: 'content__title--right',
    spacing: true,
    spacingClass: 'content--spacing-breath',
  },
  {
    id: 'grid-5',
    className: 'grid grid--5',
    images: makeSet(20, 31),
    title: 'Textures in motion',
    titleClass: 'content__title--left',
  },
  {
    id: 'grid-6',
    className: 'grid grid--6',
    images: makeSet(14, 39),
    title: 'A quiet afterglow',
    titleClass: 'content__title--right',
    spacing: true,
  },
];

const backgroundUrl = (id) => `${process.env.PUBLIC_URL}/new-home/img/${id}.jpg?v=${galleryVersion}`;

const getGrid = (elements) => {
  const items = gsap.utils.toArray(elements);
  let bounds = [];

  const getSubset = (axis, dimension, alternating, merge) => {
    let list = [];
    const subsets = {};
    const onlyEven = alternating === 'even';

    bounds.forEach((b, i) => {
      const position = Math.round(b[axis] + b[dimension] / 2);
      const subset = subsets[position] || [];
      subset.push(items[i]);
      subsets[position] = subset;
    });

    Object.keys(subsets).forEach((key) => list.push(subsets[key]));

    if (onlyEven || alternating === 'odd') {
      list = list.filter((_, i) => !(i % 2) === onlyEven);
    }

    if (merge) {
      const merged = [];
      list.forEach((subset) => merged.push(...subset));
      return merged;
    }

    return list;
  };

  const refresh = () => {
    bounds = items.map((el) => el.getBoundingClientRect());
  };

  items.refresh = refresh;
  items.columns = (alternating, merge) => getSubset('left', 'width', alternating, merge);
  items.rows = (alternating, merge) => getSubset('top', 'height', alternating, merge);
  items.refresh();

  return items;
};

const applyAnimation = (grid, animationType) => {
  const gridWrap = grid.querySelector('.grid-wrap');
  const gridItems = grid.querySelectorAll('.grid__item');
  const gridItemsInner = [...gridItems].map((item) => item.querySelector('.grid__item-inner'));

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: gridWrap,
      start: 'top bottom+=5%',
      end: 'bottom top-=5%',
      scrub: true,
    },
  });

  switch (animationType) {
    case 'type1':
      grid.style.setProperty('--perspective', '1000px');
      grid.style.setProperty('--grid-inner-scale', '0.5');

      timeline
        .set(gridWrap, { rotationY: 25 })
        .set(gridItems, { z: () => gsap.utils.random(-1600, 200) })
        .fromTo(
          gridItems,
          { xPercent: () => gsap.utils.random(-1000, -500) },
          { xPercent: () => gsap.utils.random(500, 1000) },
          0,
        )
        .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0);
      break;

    case 'type2':
      grid.style.setProperty('--grid-width', '160%');
      grid.style.setProperty('--perspective', '2000px');
      grid.style.setProperty('--grid-inner-scale', '0.5');
      grid.style.setProperty('--grid-item-ratio', '0.8');
      grid.style.setProperty('--grid-columns', '6');
      grid.style.setProperty('--grid-gap', '14vw');

      timeline
        .set(gridWrap, { rotationX: 20 })
        .set(gridItems, { z: () => gsap.utils.random(-3000, -1000) })
        .fromTo(
          gridItems,
          {
            yPercent: () => gsap.utils.random(80, 700),
            rotationY: -25,
            opacity: 0.45,
          },
          {
            ease: 'power2',
            yPercent: () => gsap.utils.random(-700, -80),
            rotationY: 25,
            opacity: 1,
          },
          0,
        )
        .fromTo(gridWrap, { rotationZ: -5 }, { rotationX: -20, rotationZ: 10, scale: 1.2 }, 0)
        .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0);
      break;

    case 'type3':
      grid.style.setProperty('--grid-width', '105%');
      grid.style.setProperty('--grid-columns', '8');
      grid.style.setProperty('--perspective', '1500px');
      grid.style.setProperty('--grid-inner-scale', '0.5');

      timeline
        .set(gridItems, {
          transformOrigin: '50% 0%',
          z: () => gsap.utils.random(-3600, -1600),
          rotationX: () => gsap.utils.random(-55, -20),
          opacity: 0.2,
        })
        .to(
          gridItems,
          {
            xPercent: () => gsap.utils.random(-100, 100),
            yPercent: () => gsap.utils.random(-220, 220),
            rotationX: 0,
            opacity: 1,
          },
          0,
        )
        .to(gridWrap, { z: 5200 }, 0)
        .fromTo(gridItemsInner, { scale: 2 }, { scale: 0.5 }, 0);
      break;

    case 'type4':
      grid.style.setProperty('--grid-width', '50%');
      grid.style.setProperty('--perspective', '3000px');
      grid.style.setProperty('--grid-item-ratio', '0.8');
      grid.style.setProperty('--grid-columns', '3');
      grid.style.setProperty('--grid-gap', '1vw');

      timeline
        .set(gridWrap, {
          transformOrigin: '0% 50%',
          rotationY: 30,
          xPercent: -75,
        })
        .set(gridItems, { transformOrigin: '50% 0%' })
        .to(gridItems, { duration: 0.5, ease: 'power2', z: 500, stagger: 0.04 }, 0)
        .to(gridItems, { duration: 0.5, ease: 'power2.in', z: 0, stagger: 0.04 }, 0.5)
        .fromTo(
          gridItems,
          { rotationX: -55, opacity: 1 },
          { duration: 1, rotationX: 55, opacity: 0.35, stagger: 0.04 },
          0,
        );
      break;

    case 'type5': {
      grid.style.setProperty('--grid-width', '120%');
      grid.style.setProperty('--grid-columns', '8');
      grid.style.setProperty('--grid-gap', '0');

      const gridObj = getGrid(gridItems);

      timeline
        .set(gridWrap, { rotationX: 50 })
        .to(gridWrap, { rotationX: 30 })
        .fromTo(gridItems, { opacity: 0.3 }, { opacity: 1 }, 0)
        .to(gridObj.rows('even'), { xPercent: -100, ease: 'power1' }, 0)
        .to(gridObj.rows('odd'), { xPercent: 100, ease: 'power1' }, 0)
        .addLabel('rowsEnd', '>-=0.15')
        .to(gridItems, { ease: 'power1', yPercent: () => gsap.utils.random(-100, 200) }, 'rowsEnd');
      break;
    }

    case 'type6': {
      grid.style.setProperty('--perspective', '2200px');
      grid.style.setProperty('--grid-width', '92%');
      grid.style.setProperty('--grid-gap', '1.6vw');
      grid.style.setProperty('--grid-columns', '4');
      grid.style.setProperty('--grid-item-ratio', '0.92');

      const gridObj = getGrid(gridItems);

      timeline
        .set(gridWrap, {
          transformOrigin: '50% 50%',
          rotationX: 18,
          rotationY: -12,
          z: -220,
        })
        .set(gridItems, {
          transformOrigin: (index) => (index % 2 ? '50% 100%' : '50% 0%'),
          rotationX: (index) => (index % 2 ? 72 : -72),
          yPercent: (index) => (index % 2 ? 18 : -18),
          z: () => gsap.utils.random(-520, -140),
          opacity: 0.82,
        })
        .set(gridItemsInner, { scale: 1.14 })
        .to(
          gridObj.columns('even', true),
          {
            rotationX: 0,
            yPercent: 0,
            z: 60,
            opacity: 1,
            stagger: 0.035,
          },
          0,
        )
        .to(
          gridObj.columns('odd', true),
          {
            rotationX: 0,
            yPercent: 0,
            z: 60,
            opacity: 1,
            stagger: 0.035,
          },
          0.08,
        )
        .to(
          gridWrap,
          {
            rotationX: -6,
            rotationY: 10,
            z: 260,
          },
          0,
        )
        .to(
          gridItemsInner,
          {
            scale: 1,
            stagger: 0.02,
          },
          0,
        )
        .to(
          gridItems,
          {
            rotationZ: () => gsap.utils.random(-3, 3),
            xPercent: () => gsap.utils.random(-6, 6),
          },
          0.45,
        );
      break;
    }

    default:
      break;
  }
};

const NewHome = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const root = rootRef.current;
    if (!root) return undefined;

    let ctx;
    ctx = gsap.context(() => {
      const gridNodes = root.querySelectorAll('.grid');
      gridNodes.forEach((grid, index) => {
        let animationType;
        switch (index % 6) {
          case 0:
            animationType = 'type1';
            break;
          case 1:
            animationType = 'type2';
            break;
          case 2:
            animationType = 'type3';
            break;
          case 3:
            animationType = 'type4';
            break;
          case 4:
            animationType = 'type5';
            break;
          case 5:
            animationType = 'type6';
            break;
          default:
            animationType = 'type1';
        }
        applyAnimation(grid, animationType);
      });
    }, root);

    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshId);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="new-home" ref={rootRef}>
      <div className="new-home__main">
        <section className="intro">
          <h1 className="intro__title">
            <span className="intro__title-pre">Jack Miller Media</span>
            <span className="intro__title-sub">Perspective-driven visual stories</span>
          </h1>
          <span className="intro__info">Scroll to explore the new home page concept</span>
        </section>

        {grids.map((grid) => (
          <React.Fragment key={grid.id}>
            {grid.hint ? (
              <div className="scroll-hint">
                <span>{grid.hint}</span>
              </div>
            ) : null}
            <section
              className={`content${grid.spacing ? ' content--spacing' : ''}${grid.spacingClass ? ` ${grid.spacingClass}` : ''}${
                grid.gapClass ? ` ${grid.gapClass}` : ''
              }`}
            >
            <div className={grid.className}>
              <div className="grid-wrap">
                {grid.images.map((imgId, index) => (
                  <div key={`${grid.id}-${index}`} className="grid__item">
                    <div className="grid__item-inner">
                      <img
                        className="grid__item-image"
                        src={backgroundUrl(imgId)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        fetchpriority={grid.id === 'grid-1' && index < 4 ? 'high' : 'low'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <h2 className={`content__title ${grid.titleClass}`}>{grid.title}</h2>
          </section>
          </React.Fragment>
        ))}

        <section className="outro">
          <span>More stories arriving soon.</span>
        </section>
      </div>
    </div>
  );
};

export default NewHome;
