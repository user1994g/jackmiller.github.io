import React, { useEffect, useRef, useState } from 'react';

import img4 from '../assets/VideoHeroes/4-hero.jpg';
import img5 from '../assets/VideoHeroes/5-hero.jpg';
import img6 from '../assets/VideoHeroes/6-hero.jpg';
import img7 from '../assets/VideoHeroes/7-hero.jpg';
import img8 from '../assets/VideoHeroes/8-hero.jpg';
import img9 from '../assets/VideoHeroes/9-hero.jpg';
import img10 from '../assets/VideoHeroes/10-hero.jpg';
import img12 from '../assets/VideoHeroes/12-hero.jpg';
import img13 from '../assets/VideoHeroes/13-hero.jpg';
import img14 from '../assets/VideoHeroes/14-hero.jpg';
import thumb4 from '../assets/VideoThumbs/4-thumb.jpg';
import thumb5 from '../assets/VideoThumbs/5-thumb.jpg';
import thumb6 from '../assets/VideoThumbs/6-thumb.jpg';
import thumb7 from '../assets/VideoThumbs/7-thumb.jpg';
import thumb8 from '../assets/VideoThumbs/8-thumb.jpg';
import thumb9 from '../assets/VideoThumbs/9-thumb.jpg';
import thumb10 from '../assets/VideoThumbs/10-thumb.jpg';
import thumb12 from '../assets/VideoThumbs/12-thumb.jpg';
import thumb13 from '../assets/VideoThumbs/13-thumb.jpg';
import thumb14 from '../assets/VideoThumbs/14-thumb.jpg';
import useStudioMotion from '../hooks/useStudioMotion';

const finalLessonImage = `${process.env.PUBLIC_URL}/new-home/img/44.jpg`;
const finalLessonStream =
  'https://clip-kingdom-play.lovable.app/api/public/stream/878b4496-ab7a-47fe-8e0f-0b489311241c';

const collections = [
  {
    title: 'Narrative Shorts',
    note: 'Narrative short films and story-led visual work.',
    items: [
      {
        id: 'the-final-lesson',
        image: finalLessonImage,
        thumbnail: finalLessonImage,
        title: 'The Final Lesson',
        category: 'Short film video',
        duration: '04:12',
        year: '2024',
        tools: 'Premiere + Lumetri',
        logline:
          'A narrative short film presented through cinematic visual storytelling and editorial pacing.',
        video: finalLessonStream,
      },
      {
        id: 'signal-field',
        image: img4,
        thumbnail: thumb4,
        title: 'Signal Field',
        category: 'Cinematic study',
        duration: '03:31',
        year: '2026',
        tools: 'Sony A7 + DaVinci',
        logline:
          'An experiment in contrast, rhythm, and urban texture captured during blue hour.',
      },
      {
        id: 'cold-frame',
        image: img6,
        thumbnail: thumb6,
        title: 'Cold Frame',
        category: 'Visual poem',
        duration: '02:58',
        year: '2025',
        tools: 'FX3 + Resolve',
        logline: 'Still architecture and moving shadows become a single visual sentence.',
      },
      {
        id: 'final-composition',
        image: img10,
        thumbnail: thumb10,
        title: 'Final Composition',
        category: 'Edit exercise',
        duration: '05:06',
        year: '2025',
        tools: 'Premiere + After Effects',
        logline: 'A montage project exploring continuity cuts and emotional transitions.',
      },
    ],
  },
  {
    title: 'Documentary Fragments',
    note: 'Observed moments, natural light, and grounded sound design.',
    items: [
      {
        id: 'echo-transfer',
        image: img8,
        thumbnail: thumb8,
        title: 'Echo Transfer',
        category: 'Doc fragment',
        duration: '06:14',
        year: '2026',
        tools: 'Zoom H6 + FX30',
        logline:
          'A quiet portrait of late-night transit workers and the spaces between shifts.',
      },
      {
        id: 'night-junction',
        image: img9,
        thumbnail: thumb9,
        title: 'Night Junction',
        category: 'Field study',
        duration: '04:47',
        year: '2025',
        tools: 'Handheld + 35mm',
        logline:
          'One rail route, three viewpoints, and a layered soundscape built from station ambience.',
      },
      {
        id: 'glass-division',
        image: img13,
        thumbnail: thumb13,
        title: 'Glass Division',
        category: 'Interview piece',
        duration: '05:22',
        year: '2025',
        tools: 'Resolve Fairlight',
        logline:
          'Reflections and off-axis framing turn a simple interview into visual narrative.',
      },
      {
        id: 'zero-ground',
        image: img14,
        thumbnail: thumb14,
        title: 'Zero Ground',
        category: 'Location study',
        duration: '03:55',
        year: '2024',
        tools: 'Gimbal + ND filters',
        logline: 'A texture-first exploration of concrete, rain, and negative space.',
      },
    ],
  },
  {
    title: 'Experimental Visuals',
    note: 'Motion design tests, color language, and concept edits.',
    items: [
      {
        id: 'liminal-room',
        image: img5,
        thumbnail: thumb5,
        title: 'Liminal Room',
        category: 'Concept loop',
        duration: '02:09',
        year: '2026',
        tools: 'After Effects + Grain',
        logline:
          'Set design and looping edits create a shifting, dreamlike room sequence.',
      },
      {
        id: 'no-sleep-city',
        image: img7,
        thumbnail: thumb7,
        title: 'No Sleep City',
        category: 'Night study',
        duration: '03:18',
        year: '2025',
        tools: 'Long exposure + AE',
        logline:
          'Neon motion and shutter drag are blended into an abstract city sketch.',
      },
      {
        id: 'red-corridor',
        image: img12,
        thumbnail: thumb12,
        title: 'Red Corridor',
        category: 'Atmosphere piece',
        duration: '04:02',
        year: '2025',
        tools: 'Color isolation',
        logline:
          'A single red-lit location becomes a sequence of tension-driven compositions.',
      },
      {
        id: 'blue-sector',
        image: img6,
        thumbnail: thumb6,
        title: 'Blue Sector',
        category: 'Studio test',
        duration: '02:44',
        year: '2024',
        tools: 'LED practicals',
        logline:
          'Controlled lighting and practical effects push a minimalist sci-fi look.',
      },
    ],
  },
];

let programmeIndex = 0;
const programme = collections.map((collection) => ({
  ...collection,
  items: collection.items.map((item) => {
    programmeIndex += 1;
    return {
      ...item,
      collectionTitle: collection.title,
      collectionNote: collection.note,
      programmeNumber: String(programmeIndex).padStart(2, '0'),
    };
  }),
}));

const featuredFilm = programme[0].items[0];

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const getFocusableElements = (container) =>
  Array.from(container?.querySelectorAll(focusableSelector) || []).filter(
    (element) => !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true',
  );

const Meta = ({ project }) => (
  <div className="film-meta" aria-label="Project details">
    <span>{project.year}</span>
    <span>{project.duration}</span>
    <span>{project.category}</span>
  </div>
);

const Videos = () => {
  const sectionRef = useRef(null);
  const programmeRef = useRef(null);
  const projectDialogRef = useRef(null);
  const projectCloseRef = useRef(null);
  const cinemaDialogRef = useRef(null);
  const cinemaCloseRef = useRef(null);
  const videoRef = useRef(null);
  const projectTriggerRef = useRef(null);
  const playerTriggerRef = useRef(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [playingProject, setPlayingProject] = useState(null);
  const playerOpen = Boolean(playingProject);
  const modalOpen = Boolean(selectedProject || playingProject);

  useStudioMotion(sectionRef);

  const openProject = (project, trigger) => {
    projectTriggerRef.current = trigger || document.activeElement;
    setSelectedProject(project);
  };

  const closeProject = () => {
    setPlayingProject(null);
    setSelectedProject(null);
  };

  const openPlayer = (project, trigger) => {
    if (!project.video) return;

    playerTriggerRef.current = trigger || document.activeElement;
    setPlayingProject(project);
  };

  const closePlayer = () => {
    videoRef.current?.pause();
    setPlayingProject(null);
  };

  useEffect(() => {
    if (!modalOpen) return undefined;

    document.body.classList.add('dialog-open');
    return () => {
      document.body.classList.remove('dialog-open');
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const focusFrame = window.requestAnimationFrame(() => projectCloseRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(focusFrame);
      const restoreTarget = projectTriggerRef.current;
      window.requestAnimationFrame(() => restoreTarget?.focus());
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!playerOpen) return undefined;

    const focusFrame = window.requestAnimationFrame(() => cinemaCloseRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(focusFrame);
      const restoreTarget = playerTriggerRef.current;
      window.requestAnimationFrame(() => restoreTarget?.focus());
    };
  }, [playerOpen]);

  useEffect(() => {
    if (!selectedProject && !playerOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (playerOpen) closePlayer();
        else closeProject();
        return;
      }

      if (event.key !== 'Tab') return;

      const activeDialog = playerOpen ? cinemaDialogRef.current : projectDialogRef.current;
      const focusable = getFocusableElements(activeDialog);
      if (!focusable.length) {
        event.preventDefault();
        activeDialog?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [playerOpen, selectedProject]);

  return (
    <>
      <section
        className="film-programme"
        ref={sectionRef}
        aria-label="The Cut Room film programme"
      >
        <section className="video-showcase" aria-labelledby="feature-film-title">
          <div className="studio-wrap video-showcase__grid">
            <div className="video-showcase__stage">
              <div className="video-showcase__screen">
                <video
                  src={featuredFilm.video}
                  poster={featuredFilm.image}
                  controls
                  playsInline
                  preload="metadata"
                  controlsList="nodownload noplaybackrate"
                  disablePictureInPicture
                  disableRemotePlayback
                  onContextMenu={(event) => event.preventDefault()}
                  onDragStart={(event) => event.preventDefault()}
                  aria-label={`Watch ${featuredFilm.title}`}
                >
                  Your browser does not support the video player.
                </video>
              </div>
              <div className="video-showcase__screen-bar" aria-hidden="true">
                <span>Now showing</span>
                <span>01 / 12</span>
              </div>
            </div>

            <div className="video-showcase__content">
              <span className="tape-label">Featured film · available now</span>
              <h2 id="feature-film-title">{featuredFilm.title}</h2>
              <Meta project={featuredFilm} />
              <p>{featuredFilm.logline}</p>
              <div className="video-showcase__actions">
                <button
                  className="studio-button studio-button--paper"
                  type="button"
                  onClick={(event) => openPlayer(featuredFilm, event.currentTarget)}
                  aria-haspopup="dialog"
                >
                  Open cinema view
                </button>
                <button
                  className="studio-button studio-button--ghost"
                  type="button"
                  onClick={(event) => openProject(featuredFilm, event.currentTarget)}
                  aria-haspopup="dialog"
                >
                  Project notes
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="studio-wrap video-library" ref={programmeRef}>
          <div className="video-library__intro" data-reveal>
            <div>
              <span className="studio-kicker">Browse the archive</span>
              <h2>All videos</h2>
            </div>
            <p>
              One complete film is ready to watch. The other eleven entries open project notes,
              artwork, and production details while their previews are being prepared.
            </p>
          </div>

          <nav className="video-index" aria-label="Video collections" data-stagger>
            {programme.map((collection, index) => {
              const collectionId = collection.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <a href={`#${collectionId}`} key={collection.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{collection.title}</strong>
                  <span>{collection.items.length} projects</span>
                </a>
              );
            })}
          </nav>

          {programme.map((collection) => {
            const collectionId = collection.title.toLowerCase().replace(/\s+/g, '-');
            const sectionId = `${collectionId}-title`;
            return (
              <section
                className="programme-section"
                id={collectionId}
                key={collection.title}
                aria-labelledby={sectionId}
              >
                <header className="programme-section__head" data-reveal>
                  <div>
                    <span className="studio-kicker">Collection</span>
                    <h2 id={sectionId}>{collection.title}</h2>
                  </div>
                  <p>{collection.note}</p>
                </header>

                <div className="programme-grid" data-stagger>
                  {collection.items.map((project) => (
                    <button
                      className="programme-card"
                      type="button"
                      key={project.id}
                      onClick={(event) => openProject(project, event.currentTarget)}
                      aria-haspopup="dialog"
                      aria-label={`Open project notes for ${project.title}`}
                    >
                      <span className="programme-card__image">
                        <img
                          src={project.thumbnail}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          width="520"
                          height="325"
                        />
                        <span className="programme-card__play" aria-hidden="true">
                          {project.video ? '▶' : '+'}
                        </span>
                        <span className="programme-card__status">
                          {project.video ? 'Watch film' : 'Project notes'}
                        </span>
                      </span>
                      <span className="programme-card__copy">
                        <span className="programme-card__eyebrow">
                          <span className="frame-number" aria-hidden="true">
                            {project.programmeNumber}
                          </span>
                          <span>{project.category}</span>
                        </span>
                        <strong>{project.title}</strong>
                        <span className="programme-card__logline">{project.logline}</span>
                        <span className="programme-card__footer">
                          <span>{project.year}</span>
                          <span>{project.duration}</span>
                          <span>{project.tools}</span>
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {selectedProject ? (
        <div
          className="studio-dialog studio-dialog--cinema"
          onMouseDown={(event) => event.target === event.currentTarget && closeProject()}
          aria-hidden={playerOpen ? 'true' : undefined}
          style={playerOpen ? { visibility: 'hidden' } : undefined}
        >
          <section
            className="project-dialog"
            ref={projectDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            aria-describedby="project-dialog-description"
            tabIndex="-1"
          >
            <header className="project-dialog__bar">
              <strong>
                Programme {selectedProject.programmeNumber} · {selectedProject.collectionTitle}
              </strong>
              <button ref={projectCloseRef} type="button" onClick={closeProject}>
                Close
              </button>
            </header>

            <div className="project-dialog__body">
              <div className="project-dialog__visual">
                <img src={selectedProject.image} alt={`Poster artwork for ${selectedProject.title}`} />
              </div>
              <div className="project-dialog__info">
                <span className="studio-kicker">Jack Miller Media · project file</span>
                <h2 id="project-dialog-title">{selectedProject.title}</h2>
                <Meta project={selectedProject} />
                <p id="project-dialog-description">{selectedProject.logline}</p>
                <p>{selectedProject.collectionNote}</p>
                <div className="film-meta" aria-label="Production tools">
                  <span>{selectedProject.tools}</span>
                  <span>{selectedProject.collectionTitle}</span>
                </div>
                <div className="project-dialog__actions">
                  {selectedProject.video ? (
                    <button
                      className="studio-button"
                      type="button"
                      onClick={(event) => openPlayer(selectedProject, event.currentTarget)}
                      aria-haspopup="dialog"
                    >
                      Watch the film
                    </button>
                  ) : (
                    <button className="studio-button studio-button--ghost" type="button" disabled>
                      Preview unavailable
                    </button>
                  )}
                  <button
                    className="studio-button studio-button--ghost"
                    type="button"
                    onClick={closeProject}
                  >
                    Back to programme
                  </button>
                </div>
                <p className="project-dialog__note">
                  {selectedProject.video
                    ? 'The full cut is ready to watch in the cinema player.'
                    : 'Preview unavailable — this programme entry currently presents project notes and artwork only.'}
                </p>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {playingProject?.video ? (
        <div
          className="studio-dialog"
          onMouseDown={(event) => event.target === event.currentTarget && closePlayer()}
        >
          <section
            className="cinema-dialog"
            ref={cinemaDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cinema-dialog-title"
            tabIndex="-1"
          >
            <header className="cinema-dialog__bar">
              <strong id="cinema-dialog-title">Now showing · {playingProject.title}</strong>
              <button ref={cinemaCloseRef} type="button" onClick={closePlayer}>
                Close film
              </button>
            </header>
            <div className="cinema-dialog__screen">
              <video
                ref={videoRef}
                src={playingProject.video}
                controls
                autoPlay
                playsInline
                preload="metadata"
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                disableRemotePlayback
                onContextMenu={(event) => event.preventDefault()}
                onDragStart={(event) => event.preventDefault()}
              >
                Your browser does not support the video player.
              </video>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default Videos;
