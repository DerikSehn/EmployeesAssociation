/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, MenuItem, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isObject } from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import ImageUploader from '@/Components/inputs/ImageUploader';
import UtilAutoComplete from '@/Components/inputs/UtilAutoComplete';
import { Documento } from '@/Utils/functions/IDocumento';
import serverAction, { setAlert, validaEmail } from '@/Utils/functions/auth.d';
import { Conveniado, gerarConveniados } from '@/Utils/functions/userTypes.d';
import CustomCelularFormat from '@/Components/inputs/CustomCelularFormat';
import CustomCNPJFormat from '@/Components/inputs/CustomCNPJFormat';
import CustomCPFFormat from '@/Components/inputs/CustomCPFFormat';
import CustomCEPFormat from '@/Components/inputs/CustomCEPFormat';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: '.5em',
  },
  secao: {
    padding: '0 0 1em',
    '& > div': {
      padding: 4,
    },
  },
  secaoTitle: {
    padding: '0 0 1em',
  },
  button: {
    margin: theme.spacing(2),
  },
  imgUploader: {
    height: '100%',
  },
  tabs: {},
}));

type CadEmpresasProps = {
  editEmpresa?: Conveniado;
};
function CadEmpresas({ editEmpresa }: CadEmpresasProps) {
  const classes = useStyles();
  const [formValues, setFormValues] = useState<Conveniado>(
    editEmpresa || /* ({} as Conveniado) */ gerarConveniados(0)[0],
  );

  const handleChange = (event: any, field?: any) => {
    const { name, value } = event.target;
    setFormValues((pvSt: any) => ({
      ...pvSt,
      ...(typeof field === 'string' ? { [field]: { ...pvSt[field], [name]: value } } : { [name]: value }),
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await serverAction(`cadConveniado`, formValues, 'CtrlConveniado', true).then((res: any) => {
      if (res.status) {
        setAlert(`Conveniado ${editEmpresa ? 'alterado' : 'cadastrado'} com sucesso!`, 'info');
      }
    });
  };

  const handleAutoCompleteChange = (value: unknown, field?: string) => {
    handleChange(
      {
        target: {
          name: 'estado',
          value,
        },
      } as React.ChangeEvent<HTMLInputElement>,
      field,
    );
  };
  const handleDropImg = async (documento: Documento | null) => {
    handleChange({
      target: {
        name: 'documento',
        value: documento,
      },
    });
  };

  const handleDeleteImg = async () => {
    const obj = {
      objName: 'conveniado',
      idAction: formValues.idConveniado,
      field: 'idDocumento',
    };
    const res = formValues.idConveniado ? await serverAction(`setColumnAction`, obj, 'CtrlAction', true) : true;
    if (res || res?.status) {
      const objDoc = {
        objName: 'documento',
        idAction: formValues.documento.idDocumento,
      };
      await serverAction(`delAction`, objDoc, 'CtrlAction', true).then((resDoc: any) => {
        if (resDoc.status) {
          setAlert(`Imagem removida`, 'info');
        }
      });
      handleDropImg(null);
    }
  };

  return (
    <Grid container item xs={12} className={classes.root}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container>
          <Grid container item xs={12} lg={8} justifyContent="space-between" className={classes.secao}>
            <Grid container item xs={12} className={classes.secaoTitle}>
              <Typography variant="subtitle1">Dados cadastrais</Typography>
            </Grid>

            <Grid item xs={7}>
              <TextField
                margin="dense"
                variant="filled"
                name="dsRazaoSocial"
                label="Razão Social"
                value={formValues.dsRazaoSocial}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <TextField
                margin="dense"
                variant="filled"
                name="dtInclusao"
                label="Data de Abertura"
                disabled
                value={formValues.dtInclusao ? formValues.dtInclusao : moment().format('DD/MM/YYYY')}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                variant="filled"
                name="dsEmail"
                label="Email"
                onChange={handleChange}
                value={formValues.dsEmail}
                fullWidth
                error={!validaEmail(formValues.dsEmail)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                variant="filled"
                name="dsRamo"
                label="Ramo"
                value={formValues.dsRamo}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                variant="filled"
                name="dsCelular"
                InputProps={{ inputComponent: CustomCelularFormat }}
                label="Celular"
                value={formValues.dsCelular}
                onChange={handleChange}
                fullWidth
                // Adicione a máscara de telefone aqui
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                variant="filled"
                name="dsTelefone"
                label="Telefone"
                value={formValues.dsTelefone}
                onChange={handleChange}
                fullWidth
                // Adicione a máscara de telefone aqui
              />
            </Grid>
          </Grid>
          <Grid p={isMobile || isTablet ? 1 : 5} item xs={12} lg={4}>
            <ImageUploader
              className={classes.imgUploader}
              variant="drop"
              nmImagem="Logotipo do conveniado"
              value={formValues.documento?.blobDocumento}
              title="Arraste para cá a Logotipo da Empresa"
              onDrop={handleDropImg}
              onDelete={handleDeleteImg}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
          <Grid container item xs={12} justifyContent="space-between" className={classes.secaoTitle}>
            <Typography variant="subtitle1">Responsável</Typography>
          </Grid>
          <Grid container item xs={3} className={classes.tabs}>
            <TextField
              margin="dense"
              variant="filled"
              name="tpPessoa"
              label="Tipo de Pessoa"
              value={formValues.tpPessoa}
              onChange={handleChange}
              fullWidth
              select
            >
              <MenuItem value="F">Pessoa Física</MenuItem>
              <MenuItem value="J">Pessoa Jurídica</MenuItem>
            </TextField>
          </Grid>
          {formValues.tpPessoa?.toUpperCase() === 'J' ? (
            <>
              <Grid item xs={5}>
                <TextField
                  margin="dense"
                  variant="filled"
                  name="dsNomeFantasia"
                  label="Nome Fantasia"
                  value={formValues.dsNomeFantasia}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  variant="filled"
                  name="cdCnpj"
                  InputProps={{ inputComponent: CustomCNPJFormat }}
                  label="CNPJ"
                  value={formValues.cdCnpj}
                  onChange={handleChange}
                  fullWidth

                  // Adicione a máscara de CPF aqui
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={5}>
                <TextField
                  margin="dense"
                  variant="filled"
                  name="dsNomeResponsavel"
                  label="Nome do Responsável"
                  value={formValues.dsNomeResponsavel}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  variant="filled"
                  name="cdCpf"
                  InputProps={{ inputComponent: CustomCPFFormat }}
                  label="CPF"
                  value={formValues.cdCpf}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </>
          )}
        </Grid>

        <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
          <Grid container item xs={12} className={classes.secaoTitle}>
            <Typography variant="subtitle1">Endereço</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              margin="dense"
              variant="filled"
              name="dsLogradouro"
              label="Rua"
              value={formValues.endereco?.dsLogradouro}
              onChange={(e) => handleChange(e, 'endereco')}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              margin="dense"
              variant="filled"
              name="dsNumeroLogradouro"
              label="Número"
              value={formValues.endereco?.dsNumeroLogradouro}
              onChange={(e) => handleChange(e, 'endereco')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              margin="dense"
              variant="filled"
              name="dsBairro"
              label="Bairro"
              value={formValues.endereco?.dsBairro}
              onChange={(e) => handleChange(e, 'endereco')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              margin="dense"
              variant="filled"
              name="cdCep"
              label="CEP"
              InputProps={{ inputComponent: CustomCEPFormat }}
              value={formValues.endereco?.cdCep}
              onChange={(e) => handleChange(e, 'endereco')}
              fullWidth
              // Adicione a máscara de CEP aqui
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UtilAutoComplete
              style={{ marginTop: '8px' }}
              label="Estado"
              value={formValues?.endereco?.estado ?? { idEstado: null }}
              variant="filled"
              defaultValue={formValues?.endereco?.estado ?? { idEstado: null }}
              getOptionLabel={(option) =>
                isObject(option) && option?.idEstado ? `${option?.cdEstado} - ${option?.dsEstado}` : ''
              }
              onChange={(_, value) => handleAutoCompleteChange(value, 'endereco')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              variant="filled"
              name="dsCidade"
              label="Cidade"
              value={formValues.endereco?.dsCidade}
              onChange={(e) => handleChange(e, 'endereco')}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="space-between" className={classes.secao}>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              {editEmpresa ? 'Confirmar alterações' : 'Cadastrar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

CadEmpresas.defaultProps = {
  editEmpresa: undefined,
};

export default CadEmpresas;
