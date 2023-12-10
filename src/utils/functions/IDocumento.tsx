import { Usuario } from './userTypes.d';

export interface Documento {
  idDocumento?: number;
  nmDocumento?: string;
  tpDocumento?: string;
  blobDocumento?: ArrayBuffer | string;
  usuario?: Usuario;
  dtInclusao?: string;
  dtExclusao?: string;
}
