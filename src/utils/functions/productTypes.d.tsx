/* eslint-disable no-plusplus */
import { fakerPT_BR } from '@faker-js/faker';
import dayjs from 'dayjs';
import { Associado, Conveniado, gerarAssociados, gerarConveniados } from './userTypes.d';
import { Documento } from './IDocumento';

export interface Compra {
  idCompra: number;
  associado: Associado;
  conveniado: Conveniado;
  beneficio: Beneficio;
  dtCompra: string;
  vlCompra: number;
}

export interface TipoBeneficio {
  idTipoBeneficio?: number;
  nmTipoBeneficio: string;
  dsObservacoes: string;
  dtInclusao: string;
  dtExclusao?: string;
}

export interface Beneficio {
  idBeneficio?: number;
  conveniado: Conveniado;
  tipoBeneficio: TipoBeneficio;
  nmBeneficio: string;
  dsObservacoes: string;
  dtInclusao: string;
  dtExclusao?: string;
  vlMinimo: number;
  qtMinima: number;
  vlMaximo: number;
  qtMaxima: number;
  tpPeriodoApuracao: string;
}

export interface EstatisticasAssociado {
  idEstatistica?: number;
  idAssociado: number;
  idBeneficio: number;
  dtInicio: Date;
  dtFinalizacao: Date;
  vlAcumulado: number;
  qtAcumulada: number;
}

export interface Evento {
  idEvento: number;
  nmEvento: string;
  dsEvento: string;
  dtInclusao: string;
  dtExclusao?: string;
  documento?: Documento;
  conveniado: Conveniado;
}

export function gerarTipoBeneficio(qt: number): TipoBeneficio[] {
  const tipoBeneficios: TipoBeneficio[] = [];
  if (!qt) {
    const tipoBeneficio: TipoBeneficio = {
      nmTipoBeneficio: '',
      dsObservacoes: '',
      dtInclusao: '',
      dtExclusao: '',
    };
    return [tipoBeneficio];
  }
  for (let i = 0; i < qt; i++) {
    const tipoBeneficio: TipoBeneficio = {
      nmTipoBeneficio: fakerPT_BR.lorem.words(1),
      dsObservacoes: fakerPT_BR.lorem.words(6),
      dtInclusao: dayjs().format('YYYY-MM-DD hh:mm:ss'),
      dtExclusao: undefined,
    };
    tipoBeneficios.push(tipoBeneficio);
  }
  return tipoBeneficios;
}

export function gerarBeneficios(qt: number): Beneficio[] {
  const beneficios: Beneficio[] = [];
  if (!qt) {
    const beneficio: Beneficio = {
      idBeneficio: undefined,
      conveniado: gerarConveniados(0)[0],
      tipoBeneficio: gerarTipoBeneficio(0)[0],
      nmBeneficio: '',
      dsObservacoes: '',
      dtInclusao: '',
      dtExclusao: '',
      vlMinimo: 0,
      qtMinima: 0,
      vlMaximo: 0,
      qtMaxima: 0,
      tpPeriodoApuracao: '',
    };
    return [beneficio];
  }
  for (let i = 0; i < qt; i++) {
    const beneficio: Beneficio = {
      conveniado: gerarConveniados(0)[0],
      tipoBeneficio: gerarTipoBeneficio(1)[0],
      nmBeneficio: fakerPT_BR.lorem.words(3),
      dsObservacoes: fakerPT_BR.lorem.sentence(),
      dtInclusao: dayjs().format('DD/MM/YYYY hh:mm:ss'),
      dtExclusao: undefined,
      vlMinimo: fakerPT_BR.number.float({ min: 0, max: 100 }),
      qtMinima: fakerPT_BR.number.int({ min: 0, max: 100 }),
      vlMaximo: fakerPT_BR.number.float({ min: 101, max: 200 }),
      qtMaxima: fakerPT_BR.number.int({ min: 101, max: 200 }),
      tpPeriodoApuracao: 'L',
    };
    beneficios.push(beneficio);
  }
  return beneficios;
}

export function gerarEvento(): Evento {
  const evento: Evento = {
    idEvento: 0,
    nmEvento: '',
    dsEvento: '',
    dtInclusao: '',
    dtExclusao: '',
    documento: { idDocumento: undefined },
    conveniado: gerarConveniados(1)[0],
  };
  return evento;
}

export default function gerarEventos(qt: number): Evento[] {
  const eventos: Evento[] = [];

  if (!qt) {
    const evento: Evento = {
      idEvento: 0,
      nmEvento: '',
      dsEvento: '',
      documento: { idDocumento: undefined },
      dtInclusao: '',
      dtExclusao: '',
      conveniado: gerarConveniados(0)[0],
    };
    return [evento];
  }
  for (let i = 0; i < qt; i++) {
    const evento = gerarEvento();
    eventos.push(evento);
  }
  return eventos;
}

export function gerarCompras(qt: number): Compra[] {
  const compras: Compra[] = [];

  if (!qt) {
    const compra: Compra = {
      idCompra: 0,
      associado: gerarAssociados(0)[0],
      beneficio: gerarBeneficios(0)[0],
      conveniado: gerarConveniados(0)[0],
      dtCompra: '',
      vlCompra: 0,
    };
    return [compra];
  }

  for (let i = 0; i < qt; i++) {
    const compra: Compra = {
      idCompra: i + 1,
      associado: gerarAssociados(0)[0],
      beneficio: gerarBeneficios(0)[0],
      conveniado: gerarConveniados(0)[0],
      dtCompra: '',
      vlCompra: 0,
    };

    compras.push(compra);
  }

  return compras;
}
