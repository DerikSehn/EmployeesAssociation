/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { Autocomplete, AutocompleteChangeReason, AutocompleteProps, AutocompleteValue, TextField } from '@mui/material';
import { snakeCase } from 'lodash';
import { ReactNode, useState } from 'react';
import getObjectName from '@/Utils/functions/getObjectName';
import serverAction from '@/Utils/functions/auth.d';

export interface WrappedAutoCompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined = undefined,
> extends Omit<AutocompleteProps<T | string, Multiple, DisableClearable, FreeSolo>, 'renderInput' | 'options'> {
  renderInput?: AutocompleteProps<T | string, Multiple, DisableClearable, FreeSolo>['renderInput'];
  label?: ReactNode;
  pgCode?: string;
  searchParams?: object;
  variant?: 'filled' | 'outlined' | 'standard';
}

export default function UtilAutoComplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>({ value, onChange, ...props }: WrappedAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const [options, setOptions] = useState([]);

  const getOptions = async () => {
    const valueType = getObjectName(value);
    if (!valueType || valueType?.toLowerCase() === 'object') {
      return;
    }
    const dados = {
      objName: snakeCase(valueType),
      ...props.searchParams,
      ...value,
    };

    await serverAction('actionResolver', dados, 'CtrlAction', true).then((res: any) => {
      if (res.status) {
        setOptions(res.lista);
      }
    });
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    evtValue: AutocompleteValue<string | T, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
  ) => {
    let newValue = evtValue;

    if (typeof onChange === 'function') {
      if (reason === 'clear') {
        const clearedObj = Object.entries(value as object).map(([field]) => [field, undefined]);
        newValue = Object.fromEntries(clearedObj);
      }
      onChange(event, newValue, reason);
    }
  };

  return (
    <Autocomplete
      onFocus={() => getOptions()}
      renderInput={(params) => (
        <TextField {...params} label={props.label ?? ''} variant={props.variant ?? 'outlined'} value={value} />
      )}
      options={options}
      onChange={handleChange}
      {...props}
    />
  );
}
