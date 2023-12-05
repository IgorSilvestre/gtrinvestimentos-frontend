import * as yup from 'yup';

interface ICNPJActivity {
  code: string
  text: string
}

interface ICNPJQSA {
  nome: string
  qual: string
}

interface ICNPJBilling {
  free: boolean
  database: boolean
}

export interface ICNPJData {
  abertura: string
  situacao: string
  tipo: string
  nome: string
  fantasia: string
  porte: string
  natureza_juridica: string
  atividade_principal: ICNPJActivity[]
  atividades_secundarias: ICNPJActivity[]
  qsa: ICNPJQSA[]
  logradouro: string
  numero: string
  municipio: string
  bairro: string
  uf: string
  cep: string
  telefone: string
  data_situacao: string
  cnpj: string
  ultima_atualizacao: string
  status: string
  complemento: string
  email: string
  efr: string
  motivo_situacao: string
  situacao_especial: string
  data_situacao_especial: string
  capital_social: string
  billing: ICNPJBilling
}


// Schema for ICNPJActivity
const ICNPJActivitySchema = yup.object().shape({
  code: yup.string(),
  text: yup.string(),
});

// Schema for ICNPJQSA
const ICNPJQSASchema = yup.object().shape({
  nome: yup.string(),
  qual: yup.string(),
});

// Schema for ICNPJBilling
const ICNPJBillingSchema = yup.object().shape({
  free: yup.boolean(),
  database: yup.boolean(),
});

// Schema for ICNPJData
export const VCNPJData = yup.object().shape({
  abertura: yup.string(),
  situacao: yup.string(),
  tipo: yup.string(),
  nome: yup.string(),
  fantasia: yup.string(),
  porte: yup.string(),
  natureza_juridica: yup.string(),
  atividade_principal: yup.array().of(ICNPJActivitySchema),
  atividades_secundarias: yup.array().of(ICNPJActivitySchema),
  socios: yup.array().of(ICNPJQSASchema),
  logradouro: yup.string(),
  numero: yup.string(),
  municipio: yup.string(),
  bairro: yup.string(),
  uf: yup.string(),
  cep: yup.string(),
  telefone: yup.string(),
  data_situacao: yup.string(),
  cnpj: yup.string(),
  ultima_atualizacao: yup.string(),
  status: yup.string(),
  complemento: yup.string(),
  email: yup.string().email(),
  efr: yup.string(),
  motivo_situacao: yup.string(),
  situacao_especial: yup.string(),
  data_situacao_especial: yup.string(),
  capital_social: yup.string(),
  billing: ICNPJBillingSchema,
});

