import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 1.05rem;
  left: clamp(0.9rem, 2vw, 2rem);
  z-index: 21;
  width: fit-content;

  a {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  svg {
    width: 2.2rem;
    height: auto;
    overflow: visible;
    stroke-linejoin: round;
    stroke-linecap: round;

    g path {
      stroke: #f6f3ef;
    }
  }
`;

const Text = styled(motion.span)`
  font-size: clamp(0.72rem, 1.2vw, 0.95rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(246, 243, 239, 0.9);

  @media (max-width: 48em) {
    display: none;
  }
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
      duration: 1.4,
      delay: 0.45,
      ease: 'easeInOut',
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    x: -12,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: 0.9,
      ease: 'easeInOut',
    },
  },
};

const Logo = () => {
  return (
    <Container>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="48px"
          viewBox="0 0 24 24"
          width="48px"
          fill="none"
        >
          <g>
            <motion.path
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"
            />
          </g>
        </svg>

        <Text variants={textVariants} initial="hidden" animate="visible">
          Jack Miller Portfolio
        </Text>
      </Link>
    </Container>
  );
};

export default Logo;
