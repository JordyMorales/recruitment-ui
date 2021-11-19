import React from 'react';
import { styled } from '@mui/system';
import { Theme } from '@mui/material';
import type { SxProps } from '@mui/system';

interface LogoProps {
  sx?: SxProps<Theme>;
}

const Svg = styled('svg')``;

const NearshoreCode: React.FC<LogoProps> = (props) => (
  <Svg version="1.1" viewBox="96.469 18.119 266.141 127.616" height="250" width="250" {...props}>
    <g transform="matrix(1, 0, 0, 1, 19.418173, -47.541031)">
      <rect
        filter="none"
        opacity="0.85"
        fill="rgba(38,122,78,255)"
        transform="matrix(0.999998, -0.002084, 0.451022, 0.999062, -75.780556, -16.283665)"
        x="209.223"
        y="103.85"
        width="90.3"
        height="66.843"
        rx="1.607"
        ry="1.607"
      />
      <rect
        filter="none"
        opacity="0.85"
        fill="rgba(78,186,137,255)"
        transform="matrix(1, -0.000035, -0.467747, 1.000016, -2.562253, -37.42548)"
        x="209.241"
        y="103.094"
        width="90.308"
        height="66.356"
        rx="2.497"
        ry="2.497"
      />
    </g>
    <g>
      <text fill="rgba(78,186,137,255)" fontFamily="Arial, sans-serif" fontSize="30px" x="96.483" y="139.154">
        Nearshore
      </text>
      <text fill="rgba(255, 255, 255, 255)" fontFamily="Arial, sans-serif" fontSize="30px" x="247.533" y="139.277">
        &lt;Code/&gt;
      </text>
    </g>
  </Svg>
);

export default NearshoreCode;
