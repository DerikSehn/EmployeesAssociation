/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { ArrowBack } from '@mui/icons-material';
import { Conveniado } from '@/Utils/functions/userTypes.d';
import { Beneficio } from '@/src/utils/functions/productTypes.d';
import { QueryHandlerPaginacao } from '@/src/components/lists/GenericTable';
import Beneficios from '@/Components/programas/homepage/Beneficios';
import serverAction from '@/Utils/functions/auth.d';

export default function DialogDetalhesConveniado({
  conveniado,
  children,
}: {
  children: JSX.Element;
  conveniado: Conveniado;
}) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((pv) => !pv);
  const [beneficios, setBeneficios] = useState<Beneficio[]>([]);

  const getListBeneficios = async () => {
    if (!isMobile) {
      const paginacao: QueryHandlerPaginacao = {
        itensPorPagina: 3,
        paginaAtual: 1,
      };
      const obj = {
        maxDepth: 0,
        objName: 'beneficio',
        paginacao,
        limit: 3,
        tpBusca: `idConveniado`,
        dsBusca: conveniado.idConveniado,
      };

      await serverAction('actionResolver', obj, 'CtrlAction', true).then((res: any) => {
        const resList = res?.lista;

        setBeneficios(resList);
      });
    }
  };

  useEffect(
    () => {
      if (!isMobile) {
        getListBeneficios();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      {React.cloneElement(children, { onClick: toggleOpen })}
      <Dialog open={open} onClose={toggleOpen} maxWidth="lg">
        {isMobile || isTablet ? (
          <Button onClick={toggleOpen} variant="contained" endIcon={<ArrowBack />}>
            Voltar
          </Button>
        ) : null}
        <DialogTitle>Benefícios de {conveniado.dsRazaoSocial}</DialogTitle>
        <Beneficios defaultList={beneficios} title="" />
      </Dialog>
    </>
  );
}
