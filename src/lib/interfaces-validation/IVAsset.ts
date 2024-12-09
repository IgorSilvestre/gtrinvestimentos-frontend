import * as yup from 'yup';
import type { IOption } from './IOption';
import { type IPerson } from './IVPerson';

export interface IAsset {
  _id?: string;
  name: string;
  tags: string[];
  imgURL?: string
  environmentalAreaPercentage?: number
  valuationPriceInReais?: number
  numberOfEmployees?: number
  priceInReais?: number;
  isForSale?: boolean;
  isAtypicalContract?: boolean;
  anualRevenueInReais?: number;
  marginEBITDA?: number;
  cashOrEquivalentInReais?: number;
  privateDebtInReais?: number;
  laborDebtInReais?: number;
  publicDebtInReais?: number;
  partnershipPercentage?: number;
  contractTerm?: string;
  downPaymentInReais?: number;
  description?: string;
  tenant?: string;
  capRatePercentage?: number;
  monthlyRentInReais?: number;
  kmFromSP?: number;
  landAreaM2?: number;
  constructedAreaM2?: number;
  vgvInReais?: number;
  docLink?: string;
  energyOffTaker?: string;
  energyInstalledCapacityInMWp?: number;
  projectAproveDate?: string;
  constructionStartDate?: string;
  ppaInReaisToMWh?: number
  capexInReais?: number
  address?: string;
  addressComplement?: string;
  contact?: string;
  zoning?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IAssetShow extends Omit<IAsset, 'tags' | 'contact'> {
  tags?: IOption[]
  contact?: IPerson
}


export interface IAssetPaginated {
  data: IAssetShow[]
  totalPages: number,
  totalAssets: number
  nextPage: number | null
  previousPage: number | null
}

export const VAssetForm = yup.object().shape({
  name: yup.string().required('Nome é obrigatório').min(2, 'Deve ter pelo menos 2 caracteres'),
  tags: yup.array().of(yup.string()).required('Tags são obrigatórias').min(1, 'Deve ter pelo menos 1 tag'),
  priceInReais: yup.number().positive('O valor deve ser positivo').optional(),
  isForSale: yup.boolean().optional(),
  anualRevenueInReais: yup.number().optional(),
  marginEBITDA: yup.number().optional(),
  cashOrEquivalentInReais: yup.number().optional(),
  privateDebtInReais: yup.number().optional(),
  laborDebtInReais: yup.number().optional(),
  publicDebtInReais: yup.number().optional(),
  partnershipPercentage: yup.number().optional(),
  downPaymentInReais: yup.number().optional(),
  description: yup.string().optional(),
  energyOffTaker: yup.string().optional(),
  energyInstalledCapacityInMWp: yup.number().optional(),
  projectAproveDate: yup.string().optional(),
  constructionStartDate: yup.string().optional(),
  ppaInReaisToMWh: yup.number().optional(),
  capexInReais: yup.number().optional(),
  tenant: yup.string().optional(),
  capRatePercentage: yup.number().optional(),
  monthlyRentInReais: yup.number().optional(),
  kmFromSP: yup.number().optional(),
  landAreaM2: yup.number().optional(),
  constructedAreaM2: yup.number().optional(),
  vgvInReais: yup.number().optional(),
  numberOfEmployees: yup.number().optional(),
  environmentalAreaPercentage: yup.number().optional(),
  valuationPriceInReais: yup.number().optional(),
  imgURL: yup.string().optional(),
  docLink: yup.string().optional(),
  address: yup.string().required(),
  addressComplement: yup.string().optional(),
  contact: yup.string().optional(),
  zoning: yup.array().of(yup.string()).optional(),
})

