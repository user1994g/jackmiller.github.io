import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const Container = styled(motion.div)`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  background:
    radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.1), transparent 40%),
    #090a0d;
`;

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1.1,
      ease: 'easeInOut',
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      delay: 0.2,
    },
  },
};

const Text = styled(motion.span)`
  font-size: clamp(0.95rem, 1.6vw, 1.25rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
`;

const Loader = () => {
  return (
    <Container initial={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }} transition={{ duration: 0.8 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="48px"
        viewBox="0 0 24 24"
        width="48px"
        fill="none"
        style={{ width: 'clamp(2.6rem, 5vw, 4rem)', height: 'auto' }}
      >
        <g>
          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"
            style={{ stroke: '#fff' }}
          />
        </g>
      </svg>
      <Text variants={textVariants} initial="hidden" animate="visible">
        Jack Miller Portfolio
      </Text>
    </Container>
  );
};

export default Loader;
