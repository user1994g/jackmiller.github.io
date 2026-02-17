import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  min-height: 100vh;
  width: 80vw;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  /* background-color: blue; */
  position: relative;

@media (max-width: 48em){
  width: 90vw;
} 

`;

const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 64em){
    justify-content: center;
}
`;

const Banner = styled.h1`
  font-size: 80px;
  font-family: 'Kaushan Script';
  color: ${(props) => props.theme.text};
  /* position: absolute; */
  white-space: nowrap;
  text-transform: uppercase;
  line-height: 1;

  @media (max-width: 70em){
    font-size: ${(props) => props.theme.fontlg};
}
@media (max-width: 64em){
    margin: 1rem 0;
}
 
@media (max-width: 48em){
    font-size: ${(props) => props.theme.fontmd};
    margin: 0.5rem 0;

}
@media (max-width: 30em){
    font-size: ${(props) => props.theme.fontsm};
}

  span {
    display: block;
    background-color: ${(props) => props.theme.body};

    padding: 0.6rem 1.2rem;
    
  }
`;

const Marquee = () => {
  return (
    <Section>
      <Container id="direction">
        <Banner>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="8"
            data-scroll-target="#direction"
          >
            Currently in development.
          </span>
        </Banner>
        <Banner data-scroll data-scroll-speed="-2" data-scroll-target="#direction">
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="-6"
            data-scroll-target="#direction"
          >
            Carefully edited visuals.
          </span>
        </Banner>
        <Banner>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="6"
            data-scroll-target="#direction"
          >
            Dark cinematic style.
          </span>
        </Banner>
        <Banner>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="-4"
            data-scroll-target="#direction"
          >
            Creative visual storytelling.
          </span>
        </Banner>
      </Container>
    </Section>
  );
};

export default Marquee;
