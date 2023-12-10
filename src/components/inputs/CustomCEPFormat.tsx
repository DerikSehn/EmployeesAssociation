/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PatternFormat } from 'react-number-format';

export default function CustomCEPFormat({ ...props }: any) {
  return <PatternFormat format="#####-###" allowEmptyFormatting mask="_" {...props} />;
}
