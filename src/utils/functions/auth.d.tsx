import { VariantType, enqueueSnackbar } from 'notistack';
import { API_BASE_URL, GET_API_TOKEN } from './env';
import { Documento } from './IDocumento';

export function setAlert(msg: string, variant?: VariantType | 'default') {
  enqueueSnackbar(msg, { variant });
}

export function getCdEmail(dsEmail: string) {
  const indexEmailFixer =
    dsEmail?.endsWith('unimedvaledocai.com.br') && dsEmail?.includes('@') ? dsEmail.indexOf('@') : dsEmail?.length;
  return dsEmail?.slice(0, indexEmailFixer);
}

export function validaEmail(dsEmail?: string) {
  if (dsEmail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(dsEmail)) {
      return true;
    }
    return false;
  }
  return true;
}

const headers = new Headers({
  'Content-Type': 'text/plain',
});

export default function serverAction(
  action: string,
  params: object,
  pgCode: string,
  exception: boolean,
  suffix?: string,
) {
  const body = JSON.stringify({
    nmMethod: action,
    dados: params,
    nmClasse: pgCode,
    lgTkn: GET_API_TOKEN(),
  });

  return fetch(`${API_BASE_URL}/${suffix ?? 'invoke'}.appAg`, {
    method: 'POST',
    headers,
    body,
  })
    .then(async (response) => response.json())
    .then((data) => {
      if (!data.status && exception) {
        setAlert(data.msg, 'error');
      }
      return data;
    })
    .catch((error) => {
      if (exception) {
        setAlert(error, 'error');
      }
    });
}

export async function uploadFile(nmDocumento: string, file: File): Promise<Documento> {
  const formData = new FormData();

  formData.append('blob', file);

  formData.append('nmDocumento', nmDocumento);
  formData.append('lgTkn', GET_API_TOKEN());
  const url = `${API_BASE_URL}/invoke.upload`;

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  return {
    blobDocumento: await file.arrayBuffer(),
    nmDocumento: file.name,
    ...(await res.json())?.documento,
    ...file,
  };
}
