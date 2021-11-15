import React, { useEffect } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import stylisRTLPlugin from 'stylis-plugin-rtl';

interface RTLProps {
  children: React.ReactNode;
  direction: 'ltr' | 'rtl';
}

const styleCache = () =>
  createCache({
    key: 'rtl',
    prepend: true,
    stylisPlugins: [stylisRTLPlugin],
  });

const RTL: React.FC<RTLProps> = (props) => {
  const { children, direction } = props;

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  if (direction === 'rtl') {
    return <CacheProvider value={styleCache()}>{children}</CacheProvider>;
  }

  return <>{children}</>;
};

export default RTL;
