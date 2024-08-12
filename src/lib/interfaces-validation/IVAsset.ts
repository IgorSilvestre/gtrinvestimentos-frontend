import * as yup from 'yup';
import type { IOption } from './IOption';

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
    state?: string;
    city?: string;
    neighborhood?: string;
    street?: string;
    addressNumber?: string;
    addressComplement?: string;
    contact?: string;
    zoning?: string[];
}

export interface IAssetShow extends Omit<IAsset, 'tags'>{
    tags?: IOption[]
}


export interface IAssetPaginated {
	data: IAssetShow[]
	totalPages: number,
	totalCompanies: number
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
    tenant: yup.string().optional(),
    capRatePercentage: yup.number().optional(),
    monthlyRentInReais: yup.number().optional(),
    kmFromSP: yup.number().optional(),
    landAreaM2: yup.number().optional(),
    constructedAreaM2: yup.number().optional(),
    vgvInReais: yup.number().optional(),
    numberOfEmployees: yup.number().optional(),
    environmentalAreaPercentage: yup.number().optional(),
    valuationPriceInReais: yup.boolean().optional(),
    imgURL: yup.string().optional(),
    docLink: yup.string().optional(),
    state: yup.string().optional(),
    city: yup.string().optional(),
    neighborhood: yup.string().optional(),
    street: yup.string().optional(),
    addressNumber: yup.string().optional(),
    addressComplement: yup.string().optional(),
    contact: yup.string().optional(),
    zoning: yup.array().of(yup.string()).optional(),
})

