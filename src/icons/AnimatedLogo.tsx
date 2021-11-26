import React from 'react';
import { styled } from '@mui/system';
import { Theme } from '@mui/material';
import type { SxProps } from '@mui/system';

interface AnimatedLogoProps {
  sx?: SxProps<Theme>;
}

const Svg = styled('svg')``;

const AnimatedLogo: React.FC<AnimatedLogoProps> = (props) => (
  <Svg version="1.1" viewBox="0 0 100 50" height="180" width="180" {...props}>
    <rect>
      <animate id="r1" begin="0;r1.end" dur="2s" attributeName="visibility" from="hide" to="hide" />
    </rect>
    <rect
      fill="rgb(38,122,78)"
      x="-100"
      y="9"
      width="35"
      height="25"
      transform="skewX(23)"
      opacity="0.91"
      rx="1"
      ry="1"
    >
      <animate begin="r1.begin" attributeName="x" from="30" to="50" dur="1.05s" />
    </rect>
    <rect
      fill="rgb(38,122,78)"
      x="-100"
      y="9"
      width="35"
      height="25"
      transform="skewX(23)"
      opacity="0.91"
      rx="1"
      ry="1"
    >
      <animate begin="r1.begin+1s" attributeName="x" from="50" to="30" dur="1.05s" />
    </rect>

    <rect>
      <animate id="r2" begin="0;r2.end" dur="2s" attributeName="visibility" from="hide" to="hide" />
    </rect>
    <rect
      fill="rgb(78,186,137)"
      x="-100"
      y="0"
      width="35"
      height="25"
      transform="skewX(-23)"
      opacity="0.85"
      rx="1"
      ry="1"
    >
      <animate begin="r2.begin" attributeName="x" from="30" to="10" dur="1.05s" />
    </rect>
    <rect
      fill="rgb(78,186,137)"
      x="-100"
      y="0"
      width="35"
      height="25"
      transform="skewX(-23)"
      opacity="0.85"
      rx="1"
      ry="1"
    >
      <animate begin="r2.begin+1s" attributeName="x" from="10" to="30" dur="1.05s" />
    </rect>
  </Svg>
);

export default AnimatedLogo;
