import React from 'react';
import { styled } from '@mui/system';
import { Theme } from '@mui/material';
import type { SxProps } from '@mui/system';

interface LogoProps {
  sx?: SxProps<Theme>;
}

const Svg = styled('svg')``;

const StaticLogo: React.FC<LogoProps> = (props) => (
  <Svg
    viewBox="18.362 15.185 173.309 88.154"
    xmlns="http://www.w3.org/2000/svg "
    height="50"
    width="50"
    {...props}
  >
    <rect
      filter="none"
      opacity="0.91"
      fill="rgb(38, 122, 78)"
      transform="matrix(0.999998, -0.002084, 0.451022, 0.999062, -184.837906, -66.757927)"
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
      fill="rgb(78, 186, 137)"
      transform="matrix(1, -0.000035, -0.467747, 1.000016, -111.619606, -87.899742)"
      x="209.241"
      y="103.094"
      width="90.308"
      height="66.356"
      rx="2.497"
      ry="2.497"
    />
  </Svg>
);

export default StaticLogo;
