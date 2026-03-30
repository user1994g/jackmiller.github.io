import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%,
  100% {
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35), 0 0 0 0 rgba(240, 216, 173, 0.34);
  }

  50% {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.45), 0 0 0 8px rgba(240, 216, 173, 0);
  }
`;

const Root = styled.div`
  position: fixed;
  inset: auto 0 0 0;
  z-index: 9999;
  pointer-events: none;
`;

const ToggleButton = styled.button`
  pointer-events: auto;
  position: fixed;
  right: 1rem;
  right: max(1rem, env(safe-area-inset-right, 0px));
  bottom: 1rem;
  bottom: max(1rem, env(safe-area-inset-bottom, 0px));
  min-width: 3.15rem;
  height: 3.15rem;
  padding: 0 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(17, 18, 22, 0.95), rgba(8, 9, 12, 0.96));
  color: rgba(250, 252, 255, 0.98);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  animation: ${pulse} 2.4s ease-in-out infinite;
  box-shadow: 0 0 0 1px rgba(240, 216, 173, 0.24);
  transition: transform 0.18s ease, border-color 0.18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(240, 216, 173, 0.58);
    outline: none;
  }
`;

const ChatIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.15rem;
  height: 1.15rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ChatPanel = styled(motion.section)`
  pointer-events: auto;
  position: fixed;
  right: 1rem;
  right: max(1rem, env(safe-area-inset-right, 0px));
  bottom: calc(max(1rem, env(safe-area-inset-bottom, 0px)) + 3.55rem);
  width: min(23rem, calc(100vw - 2rem));
  max-height: min(70vh, 34rem);
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  gap: 0.6rem;
  padding: 0.72rem;
  transform-origin: bottom right;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background:
    linear-gradient(180deg, rgba(8, 9, 12, 0.97), rgba(5, 6, 9, 0.98)),
    radial-gradient(circle at 50% -40%, rgba(255, 255, 255, 0.08), transparent 54%);
  box-shadow:
    0 22px 56px rgba(0, 0, 0, 0.56),
    inset 0 1px 0 rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(9px);

  @media (max-width: 42em) {
    right: 0.75rem;
    right: max(0.75rem, env(safe-area-inset-right, 0px));
    bottom: calc(max(0.75rem, env(safe-area-inset-bottom, 0px)) + 3.55rem);
    width: min(22rem, calc(100vw - 1.5rem));
    max-height: 74vh;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;

  h3 {
    margin: 0;
    font-size: 0.82rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: rgba(248, 251, 255, 0.96);
  }

  p {
    margin: 0.22rem 0 0;
    font-size: 0.72rem;
    color: rgba(207, 213, 224, 0.72);
  }
`;

const CloseButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(247, 249, 252, 0.92);
  font-size: 0.74rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.32rem 0.5rem;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: rgba(240, 216, 173, 0.58);
    outline: none;
  }
`;

const Messages = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  padding-right: 0.16rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.22);
    border-radius: 999px;
  }
`;

const Bubble = styled.div`
  width: fit-content;
  max-width: 90%;
  border-radius: 10px;
  padding: 0.52rem 0.62rem;
  line-height: 1.45;
  font-size: 0.78rem;

  ${({ $role }) => ($role === 'user'
    ? `
      align-self: flex-end;
      background: rgba(240, 216, 173, 0.2);
      color: rgba(255, 248, 236, 0.98);
      border: 1px solid rgba(240, 216, 173, 0.38);
    `
    : `
      align-self: flex-start;
      background: rgba(255, 255, 255, 0.08);
      color: rgba(239, 242, 247, 0.92);
      border: 1px solid rgba(255, 255, 255, 0.18);
    `)}
`;

const QuickActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.38rem;
`;

const Chip = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  padding: 0.3rem 0.55rem;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(236, 239, 244, 0.9);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: rgba(240, 216, 173, 0.58);
    color: #fff;
    outline: none;
  }
`;

const InputForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.4rem;
`;

const Input = styled.input`
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(245, 247, 250, 0.95);
  padding: 0.54rem 0.62rem;
  font-size: 16px;
  line-height: 1.2;

  &::placeholder {
    color: rgba(204, 210, 219, 0.58);
  }

  &:focus {
    outline: none;
    border-color: rgba(240, 216, 173, 0.6);
  }
`;

const Send = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.11);
  color: rgba(250, 252, 255, 0.97);
  padding: 0.54rem 0.7rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: rgba(240, 216, 173, 0.58);
    outline: none;
  }
`;

const quickPrompts = ['Home', 'About me', 'Photos', 'Videos', '3D Art'];

const actionCues = new Set([
  'go',
  'open',
  'show',
  'find',
  'take',
  'bring',
  'see',
  'watch',
  'where',
  'locate',
  'need',
  'want',
  'looking',
  'lookingfor',
  'help',
  'needhelp',
]);

const greetingWords = new Set(['hi', 'hello', 'hey', 'yo', 'sup']);
const thanksWords = new Set(['thanks', 'thank', 'thx', 'cheers']);
const helpWords = new Set(['help', 'options', 'menu', 'commands', 'guide']);
const confirmWords = new Set(['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'please', 'doit']);
const cancelWords = new Set(['no', 'nope', 'nah', 'stop', 'cancel', 'nevermind']);

const siteIntents = [
  {
    id: 'home',
    label: 'Home',
    action: { type: 'scroll', target: '#home' },
    keywords: ['home', 'top', 'start', 'landing', 'main'],
    phrases: ['go home', 'take me home', 'back to top', 'home page', 'front page'],
    responses: [
      'Taking you to the top of the home page.',
      'Opening the home section now.',
      'Got it. Jumping to home.',
    ],
    guidance: 'Use Home for the hero section and main landing view.',
  },
  {
    id: 'about',
    label: 'About',
    action: { type: 'scroll', target: '#about' },
    keywords: ['about', 'bio', 'story', 'background', 'jack', 'person'],
    phrases: ['about me', 'who is jack', 'jack story', 'about section', 'about page'],
    responses: [
      'Taking you to the About section.',
      'Opening the About section now.',
      'Got it. Jumping to About.',
    ],
    guidance: 'Use About for your story, background, and profile section.',
  },
  {
    id: 'photos',
    label: 'Photos',
    action: { type: 'scroll', target: '#shop' },
    keywords: ['photo', 'photos', 'image', 'images', 'picture', 'gallery', 'gallary', 'portfolio', 'stills'],
    phrases: ['photo gallery', 'show photos', 'open gallery', 'find photos', 'show me pictures'],
    responses: [
      'Opening the photo gallery section.',
      'Taking you to Photos now.',
      'Got it. Jumping to the gallery.',
    ],
    guidance: 'Use Photos for still images and gallery work.',
  },
  {
    id: 'videos',
    label: 'Videos',
    action: { type: 'route', path: '/videos' },
    keywords: ['video', 'videos', 'film', 'films', 'movie', 'movies', 'reel', 'reels', 'clip', 'clips', 'vedio', 'vedios'],
    phrases: ['video page', 'show videos', 'open videos', 'find videos', 'watch videos', 'show me films'],
    responses: [
      'Opening the videos page.',
      'Taking you to Videos now.',
      'Got it. Jumping to the videos section.',
    ],
    guidance: 'Use Videos for film work, poster rows, and playable titles.',
  },
  {
    id: 'threedart',
    label: '3D Art',
    action: { type: 'route', path: '/3d-art' },
    keywords: ['3d', '3d art', 'three d', 'three d art', 'cgi', 'render', 'renders'],
    phrases: ['3d art', 'open 3d art', 'show 3d art', 'find 3d art'],
    responses: [
      'Opening the 3D Art page.',
      'Taking you to 3D Art now.',
      'Got it. Jumping to the 3D Art page.',
    ],
    guidance: 'Use 3D Art for CGI, renders, and future 3D work.',
  },
  {
    id: 'writeups',
    label: 'Write Ups',
    action: { type: 'route', path: '/write-ups', state: { allowUnlisted: true, unlisted: 'write-ups', via: 'assistant' } },
    keywords: ['write', 'writeup', 'writeups', 'write up', 'write ups', 'write-ups', 'notes', 'blog', 'secret', 'hidden', 'unlisted'],
    phrases: ['write ups', 'write up', 'write ups page', 'open write ups', 'open writeups', 'open the write ups', 'notes page', 'blog page', 'secret page', 'hidden page', 'unlisted page'],
    responses: [
      'Opening the Write Ups page.',
      'Taking you to the hidden Write Ups page.',
      'Got it. Jumping to Write Ups.',
    ],
    guidance: 'Write Ups is an unlisted page only reachable via lookup or the Site Helper.',
  },
  {
    id: 'finallesson',
    label: 'Final Lesson',
    action: { type: 'route', path: '/final-lesson', state: { allowUnlisted: true, unlisted: 'final-lesson', via: 'assistant' } },
    keywords: ['fmp 3', 'fmp3', 'final lesson', 'the final lesson'],
    phrases: ['open fmp 3', 'show fmp 3', 'open final lesson', 'open the final lesson', 'take me to final lesson'],
    responses: [
      'Opening The Final Lesson.',
      'Taking you to the hidden Final Lesson page.',
      'Got it. Jumping to The Final Lesson.',
    ],
    guidance: 'The Final Lesson is an unlisted page only reachable via lookup or the Site Helper.',
  },
  {
    id: 'contact',
    label: 'Contact',
    action: { type: 'scroll', target: '#contact' },
    keywords: ['contact', 'email', 'reach', 'message', 'talk'],
    phrases: ['contact info', 'how to contact', 'reach jack', 'email jack'],
    responses: [
      'Taking you to Contact.',
      'Opening the contact section now.',
      'Got it. Jumping to Contact.',
    ],
    guidance: 'Use Contact to get in touch or find contact details.',
  },
];

const videoTitles = [
  "the dark echo's of 1939",
  'signal field',
  'cold frame',
  'final composition',
  'echo transfer',
  'night junction',
  'glass division',
  'zero ground',
  'liminal room',
  'no sleep city',
  'red corridor',
  'blue sector',
];

const initialMessages = [
  {
    id: 'intro',
    role: 'bot',
    text: 'Hi, I am the Site Helper. Ask naturally and I will guide you to the right part of the site.',
  },
];

const normalizeText = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const tokenize = (value) => value.split(' ').filter(Boolean);

const hasAnyWord = (tokens, dictionary) => tokens.some((token) => dictionary.has(token));

const hasPhrase = (normalized, phrases) => phrases.some((phrase) => normalized.includes(phrase));

const isOneEditAway = (a, b) => {
  if (a === b) {
    return true;
  }

  if (Math.abs(a.length - b.length) > 1) {
    return false;
  }

  let i = 0;
  let j = 0;
  let edits = 0;

  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
      continue;
    }

    edits += 1;
    if (edits > 1) {
      return false;
    }

    if (a.length > b.length) {
      i += 1;
    } else if (a.length < b.length) {
      j += 1;
    } else {
      i += 1;
      j += 1;
    }
  }

  return true;
};

const tokenMatchesKeyword = (token, keyword) => {
  if (token === keyword) {
    return 'exact';
  }

  if (token.length >= 4 && keyword.startsWith(token)) {
    return 'near';
  }

  if (keyword.length >= 4 && token.startsWith(keyword)) {
    return 'near';
  }

  if (token.length >= 4 && keyword.length >= 4 && isOneEditAway(token, keyword)) {
    return 'near';
  }

  return null;
};

const scoreIntent = (intent, normalized, tokens) => {
  let score = 0;
  const matchedKeywords = new Set();

  if (hasPhrase(normalized, intent.phrases)) {
    score += 4.4;
  }

  tokens.forEach((token) => {
    for (let index = 0; index < intent.keywords.length; index += 1) {
      const keyword = intent.keywords[index];
      const matchType = tokenMatchesKeyword(token, keyword);

      if (!matchType) {
        continue;
      }

      matchedKeywords.add(keyword);
      score += matchType === 'exact' ? 2.2 : 1.35;
      break;
    }
  });

  if (matchedKeywords.size >= 2) {
    score += 1.1;
  }

  if (matchedKeywords.size >= 1 && tokens.length <= 4) {
    score += 0.8;
  }

  if (matchedKeywords.size > 0 && hasAnyWord(tokens, actionCues)) {
    score += 0.7;
  }

  if (normalized.includes('looking for') || normalized.includes('trying to find')) {
    score += 0.5;
  }

  return score;
};

const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

const detectVideoTitleMention = (normalized) => videoTitles.find((title) => normalized.includes(title));

const analyzeMessage = (rawValue, pendingIntent) => {
  const normalized = normalizeText(rawValue);

  if (!normalized) {
    return { type: 'empty' };
  }

  const tokens = tokenize(normalized);

  if (pendingIntent && hasAnyWord(tokens, confirmWords)) {
    return { type: 'confirm', intent: pendingIntent };
  }

  if (pendingIntent && hasAnyWord(tokens, cancelWords)) {
    return { type: 'cancel' };
  }

  if (normalized.includes('what is on this page') || normalized.includes('where am i')) {
    return { type: 'page-status' };
  }

  if (normalized.includes('best place') || normalized.includes('where should i go') || normalized.includes('what should i look at')) {
    return { type: 'recommend' };
  }

  if (normalized.includes('play ') || normalized.includes('watch ') || normalized.includes('find ') || normalized.includes('show ')) {
    const matchedTitle = detectVideoTitleMention(normalized);
    if (matchedTitle) {
      return { type: 'video-title', title: matchedTitle };
    }
  }

  const ranked = siteIntents
    .map((intent) => ({ intent, score: scoreIntent(intent, normalized, tokens) }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];
  const second = ranked[1];

  if (top && top.score >= 2.7) {
    const isAmbiguous = second && second.score >= 2.2 && Math.abs(top.score - second.score) <= 0.8;

    if (isAmbiguous) {
      return { type: 'ambiguous', intents: [top.intent, second.intent] };
    }

    return { type: 'intent', intent: top.intent };
  }

  if (top && top.score >= 1.6) {
    return { type: 'suggest', intent: top.intent };
  }

  if (hasAnyWord(tokens, thanksWords)) {
    return { type: 'thanks' };
  }

  if (normalized.includes('what can you do') || normalized.includes('how can you help') || hasAnyWord(tokens, helpWords)) {
    return { type: 'help' };
  }

  if (hasAnyWord(tokens, greetingWords)) {
    return { type: 'greeting' };
  }

  return { type: 'fallback' };
};

const pageLabelByPath = (pathname) => {
  if (pathname === '/videos') {
    return 'Videos';
  }

  if (pathname === '/3d-art') {
    return '3D Art';
  }

  if (pathname === '/write-ups') {
    return 'Write Ups';
  }

  if (pathname === '/final-lesson') {
    return 'Final Lesson';
  }

  return 'Home';
};

const SiteHelperChat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [pendingIntent, setPendingIntent] = useState(null);

  const scrollAnchorRef = useRef(null);
  const panelId = useMemo(() => 'site-helper-panel', []);

  const appendMessage = (role, text) => {
    setMessages((prev) => [
      ...prev.slice(-15),
      { id: `${role}-${Date.now()}-${Math.random()}`, role, text },
    ]);
  };

  const runAction = (action) => {
    if (!action) {
      return;
    }

    if (action.type === 'route') {
      if (location.pathname !== action.path) {
        if (action.state) {
          navigate(action.path, { state: action.state });
        } else {
          navigate(action.path);
        }
      }
      return;
    }

    navigate('/', { state: { scrollTarget: action.target } });
  };

  const handleIntent = (intent) => {
    appendMessage('bot', pickRandom(intent.responses));
    runAction(intent.action);
    setPendingIntent(null);
  };

  const submitQuery = (rawValue) => {
    const value = rawValue.trim();

    if (!value) {
      return;
    }

    appendMessage('user', value);

    const result = analyzeMessage(value, pendingIntent);

    if (result.type === 'empty') {
      return;
    }

    if (result.type === 'confirm') {
      handleIntent(result.intent);
      return;
    }

    if (result.type === 'cancel') {
      setPendingIntent(null);
      appendMessage('bot', 'No problem. Ask me for another part of the site any time.');
      return;
    }

    if (result.type === 'intent') {
      handleIntent(result.intent);
      return;
    }

    if (result.type === 'suggest') {
      setPendingIntent(result.intent);
      appendMessage('bot', `I think you mean ${result.intent.label}. Say "yes" and I will open it.`);
      return;
    }

    if (result.type === 'ambiguous') {
      setPendingIntent(null);
      appendMessage('bot', `I can take you to ${result.intents[0].label} or ${result.intents[1].label}. Which one do you want?`);
      return;
    }

    if (result.type === 'video-title') {
      setPendingIntent(siteIntents.find((intent) => intent.id === 'videos'));
      appendMessage('bot', `That title is on the Videos page. Say "yes" and I will open Videos so you can find ${result.title}.`);
      return;
    }

    if (result.type === 'page-status') {
      setPendingIntent(null);
      appendMessage('bot', `You are on the ${pageLabelByPath(location.pathname)} page right now.`);
      return;
    }

    if (result.type === 'recommend') {
      setPendingIntent(null);
      if (location.pathname === '/videos') {
        appendMessage('bot', 'You are already in the strongest place for film work. Browse the poster rows or open The dark echo\'s of 1939 first.');
        return;
      }

      appendMessage('bot', 'If you want motion work, go to Videos. If you want still images, go to Photos. If you want CGI later, use 3D Art.');
      return;
    }

    if (result.type === 'thanks') {
      setPendingIntent(null);
      appendMessage('bot', 'Anytime. I can still help with Home, About, Photos, Videos, and 3D Art.');
      return;
    }

    if (result.type === 'help') {
      setPendingIntent(null);
      appendMessage('bot', 'I can guide you to Home, About, Photos, Videos, and 3D Art. You can ask naturally, like "take me to the videos" or "where is the photo gallery".');
      return;
    }

    if (result.type === 'greeting') {
      setPendingIntent(null);
      appendMessage('bot', 'Hi. Tell me what you want to find and I will point you to the right page.');
      return;
    }

    setPendingIntent(null);
    appendMessage('bot', 'I can help you find Home, About, Photos, Videos, or 3D Art. Try asking in a full sentence and I will work it out.');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitQuery(query);
    setQuery('');
  };

  const handleQuickPrompt = (prompt) => {
    submitQuery(prompt);
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, open]);

  return (
    <Root>
      <AnimatePresence>
        {open && (
          <ChatPanel
            id={panelId}
            aria-label="Site helper chat"
            initial={{ opacity: 0, y: 12, x: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, x: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Header>
              <div>
                <h3>Site Helper</h3>
                <p>Smarter local guide for navigation and finding work</p>
              </div>
              <CloseButton type="button" onClick={() => setOpen(false)}>Close</CloseButton>
            </Header>

            <Messages>
              {messages.map((message) => (
                <Bubble key={message.id} $role={message.role}>{message.text}</Bubble>
              ))}
              <div ref={scrollAnchorRef} />
            </Messages>

            <QuickActions>
              {quickPrompts.map((prompt) => (
                <Chip key={prompt} type="button" onClick={() => handleQuickPrompt(prompt)}>{prompt}</Chip>
              ))}
            </QuickActions>

            <InputForm onSubmit={handleSubmit} role="search" aria-label="Ask site helper">
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try: hello i want to find the videos pls"
                aria-label="Find something on site"
              />
              <Send type="submit">Send</Send>
            </InputForm>
          </ChatPanel>
        )}
      </AnimatePresence>

      <ToggleButton
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? 'Close site helper' : 'Open site helper'}
      >
        <span style={{ display: 'grid', placeItems: 'center', gap: '0.08rem', lineHeight: 1 }}>
          <ChatIcon aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path
                d="M4 5.5C4 4.12 5.12 3 6.5 3h11C18.88 3 20 4.12 20 5.5v7C20 11.88 18.88 13 17.5 13H10l-4.6 4.2c-.64.58-1.67.13-1.67-.74V5.5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8.5" cy="8.6" r="1" fill="currentColor" />
              <circle cx="12" cy="8.6" r="1" fill="currentColor" />
              <circle cx="15.5" cy="8.6" r="1" fill="currentColor" />
            </svg>
          </ChatIcon>
          <span style={{ fontSize: '0.52rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Site Helper</span>
        </span>
      </ToggleButton>
    </Root>
  );
};

export default SiteHelperChat;
