/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { CardProps } from '@mui/material';
import { Evento } from '@/Utils/functions/productTypes.d';

export type CardAFUProps = {
  title?: string;
  description?: string | number;
  buttonText?: string;
  variant?: 'default' | 'contained' | 'indicador';
  onClick?(action: any): void;
};

export interface CardEventoProps extends CardAFUProps {
  evento?: Evento;
  imagem?: string;
  CardProps?: CardProps;
  readOnly?: boolean;
  onDelete?(evento: Evento): void;
}

export interface CardInfoProps extends CardAFUProps {
  imagem?: string;
}

export interface CardContainedProps extends CardAFUProps {
  icon: ReactElement;
  buttonColor: 'primary' | 'secondary' | 'error' | 'warning' | 'info';
}

export default interface CardIndicadorProps extends CardContainedProps {
  buttonText: string | undefined;
}
