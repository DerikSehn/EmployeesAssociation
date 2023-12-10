/* eslint-disable react/jsx-props-no-spreading */
import { TextField, TextFieldProps } from '@mui/material';
import { InputMask, InputMaskProps } from '@react-input/mask';
import React, { forwardRef } from 'react';

type MaskedInputProps = TextFieldProps & {
  mask: string;
  replacement: string;
};

export default function MaskedInput({ mask = '(99) 9 9999-9999', replacement = '_', ...props }: MaskedInputProps) {
  const ForwardedInputMask = forwardRef<HTMLInputElement, InputMaskProps>((iProps, forwardedRef) => (
    <InputMask ref={forwardedRef} mask={mask} replacement={replacement} {...iProps} />
  ));

  return <TextField InputProps={{ components: { Input: ForwardedInputMask } }} {...props} />;
}
