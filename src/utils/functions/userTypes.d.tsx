/* eslint-disable no-plusplus */
import { fakerPT_BR } from '@faker-js/faker';

export type Usuario = {
  idUsuario?: number;
  dsEmail: string;
  nmUsuario: string;
  cdInfoSenha: string;
  dtInclusao?: string;
  snConfirmado: string;
  dtExclusao: string;
  idConveniado?: number;
  idAssociado?: number;
  associado?: Associado;
  conveniado?: Conveniado;
  dsSenha?: string;
  perfilUsuario: PerfilUsuario;
};

export type Programa = {
  idPrograma: number;
  programaPai: Programa;
  pgCode: string;
  nmIcone: string;
  icone: JSX.Element;
  dsPrograma: string;
  nmPrograma: string;
  tpPrograma: string;
  dtInclusao: string;
};

export type PerfilUsuario = {
  idPerfilUsuario?: number | undefined;
  nmPerfilUsuario: string;
  dsPerfilUsuario: string;
  dtInclusao: string;
};

export type ProgramasDePerfilUsuario = {
  perfilUsuario?: PerfilUsuario;
  programa: Programa;
};

export type UsuariosDePerfilUsuario = {
  perfilUsuario?: PerfilUsuario;
  usuario: Usuario;
};

export interface Dependente {
  idAssociadoPai?: number;
  dsNome: string;
  dsGrauParentesco: string;
}

export interface Estado {
  idEstado?: number;
  cdEstado: string;
  dsEstado: string;
}

export type Endereco = {
  dsLogradouro: string;
  dsBairro: string;
  cdCep: string;
  dsCidade: string;
  dsNumeroLogradouro: string;
  estado: Estado;
};

export interface Associado {
  idAssociado?: number;
  nrMatricula: string;
  nmAssociado?: string;
  tpSituacao: string;
  dsSetor: string;
  dependentes: Dependente[];
  endereco?: Endereco;
  cdCpf: string;
  dtNascimento: string;
  dtInclusao?: string;
  dtExclusao?: string;
  dsEmail?: string;
  dsCelular: string;
}

export interface Conveniado {
  idConveniado?: number;
  cdCei: string;
  dsRamo: string;
  endereco: Endereco;
  cdCnpj: string;
  dsNomeResponsavel?: string;
  dsNomeFantasia?: string;
  dtInclusao?: string;
  dtExclusao?: string;
  dsEmail?: string;
  tpPessoa: 'J' | 'F';
  dsCelular?: string;
  cdCpf?: string;
  dsRazaoSocial?: string;
  dsTelefone?: string;
  documento: {
    idDocumento?: number;
    nmDocumento?: string;
    tpDocumento?: string;
    blobDocumento?: ArrayBuffer;
    usuario?: Usuario;
    dtInclusao?: string;
    dtExclusao?: string;
  };
}

export type FormValues = Associado | Conveniado | Endereco;

export function gerarAssociados(quantidade: number): Associado[] {
  const associados: Associado[] = [];

  // eslint-disable-next-line no-plusplus
  if (!quantidade) {
    const associado: Associado = {
      idAssociado: undefined,
      cdCpf: '',
      dtNascimento: '',
      dsSetor: '',
      dsCelular: '',
      nrMatricula: '',
      tpSituacao: '',
      dtInclusao: undefined,
      endereco: {
        dsNumeroLogradouro: '',
        dsLogradouro: '',
        dsBairro: '',
        cdCep: '',
        dsCidade: '',
        estado: {
          idEstado: undefined,
          cdEstado: '',
          dsEstado: '',
        },
      },
      dependentes: [],
    };
    return [associado];
  }
  for (let i = 0; i < quantidade; i++) {
    const associado: Associado = {
      idAssociado: undefined,
      cdCpf: fakerPT_BR.phone.number('###########'),
      dtNascimento: fakerPT_BR.date.birthdate().toLocaleDateString(),
      dsSetor: fakerPT_BR.person.jobArea(),
      dsCelular: fakerPT_BR.phone.number('519########'),
      nrMatricula: 'sdonasodinasdinatricula',
      tpSituacao: fakerPT_BR.helpers.arrayElement(['ativo', 'inativo']),
      dtInclusao: fakerPT_BR.date.past().toString(),
      endereco: {
        dsNumeroLogradouro: fakerPT_BR.location.buildingNumber(),
        dsLogradouro: fakerPT_BR.location.street(),
        dsBairro: fakerPT_BR.location.street(),
        cdCep: fakerPT_BR.location.zipCode('########'),
        dsCidade: fakerPT_BR.location.city(),
        estado: {
          idEstado: 1,
          cdEstado: 'RS',
          dsEstado: 'Rio Grande do Sul',
        },
      },
      dependentes: [],
    };

    const numDependentes = fakerPT_BR.number.int({ min: 0, max: 3 });
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < numDependentes; j++) {
      const dependente: Dependente = {
        dsNome: fakerPT_BR.person.fullName(),
        dsGrauParentesco: 'Filho',
      };

      associado.dependentes.push(dependente);
    }

    associados.push(associado);
  }

  return associados;
}

export function gerarConveniados(quantidade: number): Conveniado[] {
  const conveniados: Conveniado[] = [];

  if (!quantidade) {
    const conveniado: Conveniado = {
      idConveniado: 0,
      dsNomeFantasia: '',
      cdCnpj: '',
      dsRamo: '',
      dsCelular: '',
      dsTelefone: '',
      dtInclusao: '',
      documento: { idDocumento: undefined },
      tpPessoa: 'J',
      endereco: {
        dsNumeroLogradouro: '',
        dsLogradouro: '',
        dsBairro: '',
        cdCep: '',
        dsCidade: '',
        estado: {
          idEstado: 0,
          cdEstado: '',
          dsEstado: '',
        },
      },
      cdCei: '',
      dsNomeResponsavel: '',
      cdCpf: '',
      dsRazaoSocial: '',
    };
    return [conveniado];
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < quantidade; i++) {
    const conveniado: Conveniado = {
      idConveniado: 0,
      dsNomeFantasia: fakerPT_BR.company.name(),
      cdCnpj: fakerPT_BR.phone.number('###########'),
      dsRamo: fakerPT_BR.person.jobTitle(),
      dsCelular: fakerPT_BR.phone.number('519########'),
      dsTelefone: fakerPT_BR.phone.number('###########'),
      dtInclusao: '',
      tpPessoa: 'F',
      documento: { idDocumento: undefined },
      endereco: {
        dsNumeroLogradouro: fakerPT_BR.location.buildingNumber(),
        dsLogradouro: fakerPT_BR.location.street(),
        dsBairro: fakerPT_BR.location.street(),
        cdCep: fakerPT_BR.location.zipCode('########'),
        dsCidade: fakerPT_BR.location.city(),
        estado: {
          idEstado: 1,
          cdEstado: 'RS',
          dsEstado: 'Rio Grande do Sul',
        },
      },

      cdCei: fakerPT_BR.helpers.arrayElement(['213123', 'w1d1d12']),
      dsNomeResponsavel: fakerPT_BR.person.fullName(),
      cdCpf: fakerPT_BR.phone.number('###########'),
      dsRazaoSocial: fakerPT_BR.person.fullName(),
    };

    conveniados.push(conveniado);
  }

  return conveniados;
}

export function gerarUsuarios(quantidade: number): Usuario[] {
  const usuarios: Usuario[] = [];

  if (!quantidade) {
    const usuario: Usuario = {
      dsEmail: '',
      nmUsuario: '',
      cdInfoSenha: '',
      snConfirmado: 'S',
      dtExclusao: '',
      perfilUsuario: {
        idPerfilUsuario: undefined,
        nmPerfilUsuario: '',
        dsPerfilUsuario: '',
        dtInclusao: '',
      },
      associado: gerarAssociados(0)[0],
      conveniado: gerarConveniados(0)[0],
    };
    return [usuario];
  }

  for (let i = 0; i < quantidade; i++) {
    const usuario: Usuario = {
      dsEmail: fakerPT_BR.internet.email(),
      nmUsuario: fakerPT_BR.person.fullName(),
      cdInfoSenha: fakerPT_BR.internet.password(),
      perfilUsuario: {
        idPerfilUsuario: undefined,
        nmPerfilUsuario: '',
        dsPerfilUsuario: '',
        dtInclusao: '',
      },
      snConfirmado: 'S', // Pode ajustar conforme necessário
      dtExclusao: fakerPT_BR.date.past().toLocaleDateString(), // Pode ajustar conforme necessário
      associado: gerarAssociados(1)[0],
      conveniado: gerarConveniados(1)[0],
    };

    usuarios.push(usuario);
  }

  return usuarios;
}
