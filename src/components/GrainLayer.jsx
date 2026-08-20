import React from 'react';
import styled from 'styled-components';

const Layer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  opacity: 0.09;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
`;

const GrainLayer = () => <Layer aria-hidden="true" />;

export default GrainLayer;
