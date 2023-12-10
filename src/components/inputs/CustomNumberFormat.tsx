/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { NumericFormat, NumericFormatProps } from 'react-number-format';

export default function CustomNumberFormat({
  inputRef,
  onChange,
  name,
  thousandSeparator = '.',
  decimalSeparator = ',',
  fixedDecimalScale = true,
  prefix = 'R$ ',
  ...props
}: NumericFormatProps & {
  inputRef: any;
  onChange: any;
  name: any;
  thousandsSeparator: any;
  decimalSeparator: any;
  fixedDecimalScale: boolean;
  prefix: any;
}) {
  return (
    <NumericFormat
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.value,
          },
        });
      }}
      // mask={ '9999.9999.999999.99-9'}
      // maskChar='_'
      decimalScale={2}
      fixedDecimalScale={fixedDecimalScale}
      allowNegative
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      valueIsNumericString
      prefix={prefix}
      {...props}
    />
  );
}
