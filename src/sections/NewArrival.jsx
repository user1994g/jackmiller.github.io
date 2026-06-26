import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import img1 from '../assets/Images/11.webp';
import img2 from '../assets/Images/12.webp';
import img3 from '../assets/Images/13.webp';
import img4 from '../assets/Images/14.webp';

const Section = styled.section`
  width: min(var(--content-max), 92vw);
  margin: var(--section-gap) auto;
  padding: clamp(1.2rem, 3vw, 2.2rem);

  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(16, 17, 21, 0.66);
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: end;
  margin-bottom: clamp(1rem, 2vw, 1.8rem);

  @media (max-width: 56em) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 7vw, 5.2rem);
  font-family: 'Kaushan Script';
  font-weight: 300;
  color: ${(props) => props.theme.text};
`;

const Text = styled.p`
  justify-self: end;
  width: min(52ch, 100%);
  font-size: clamp(0.88rem, 1.2vw, 1.02rem);
  line-height: 1.7;
  color: rgba(240, 240, 240, 0.82);

  @media (max-width: 56em) {
    justify-self: start;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.9rem;

  @media (max-width: 64em) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 34em) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled(motion.article)`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
  }

  h2 {
    padding: 0.8rem;
    font-size: 0.86rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.92);
  }
`;

const projects = [
  { img: img1, title: 'Quiet Tension' },
  { img: img2, title: 'Street Atmosphere' },
  { img: img3, title: 'Night Texture' },
  { img: img4, title: 'Final Light Study' },
];

const NewArrival = () => {
  return (
    <Section id="highlights" className="new-arrival">
      <Header>
        <Title
          data-scroll
          data-scroll-speed="-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          highlights
        </Title>
        <Text>
          Recent visual experiments focused on atmosphere and cinematic consistency. This block is
          intentionally structured to read clearly on large monitor widths while stacking elegantly
          on mobile.
        </Text>
      </Header>

      <Grid>
        {projects.map((project, index) => (
          <Item
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <img width="800" height="1000" src={project.img} alt={project.title} />
            <h2>{project.title}</h2>
          </Item>
        ))}
      </Grid>
    </Section>
  );
};

export default NewArrival;
