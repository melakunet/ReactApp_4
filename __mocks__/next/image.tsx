// Jest mock for next/image — the real component requires a Node.js server
// environment that jsdom doesn't have, so we swap it for a plain <img> in tests.
import React from 'react';

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  onError?: React.ReactEventHandler<HTMLImageElement>;
};

const NextImage = ({ src, alt, style, onError }: Props) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} style={style} onError={onError} />
);

export default NextImage;
