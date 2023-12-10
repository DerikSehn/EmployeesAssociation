/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PatternFormat } from 'react-number-format';

export default function CustomCPFFormat({ ...props }: any) {
  return <PatternFormat format="###.###.###-##" mask="_" {...props} />;
}
