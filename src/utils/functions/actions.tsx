/* eslint-disable @typescript-eslint/no-explicit-any */
import serverAction from './auth.d';

export default async function getActions(objName: string): Promise<any> {
  const dados = {
    objName,
  };
  await serverAction('actionResolver', dados, 'CtrlAction', true).then((res: any) => {
    if (res.status) {
      return res.lista;
    }
    return null;
  });
}
