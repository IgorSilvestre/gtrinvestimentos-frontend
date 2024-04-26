import * as yup from 'yup';
import type { IOption } from './IOption';

export interface IAsset {
    name: string;
    tags: IOption[];
    priceInReais?: number;
    isForSale?: boolean;
    anualRevenueInReais?: number;
    marginEBITDA?: number;
    cashOrEquivalentInReais?: number;
    privateDebtInReais?: number;
    laborDebtInReais?: number;
    publicDebtInReais?: number;
    partnershipPercentage?: number;
    downPaymentInReais?: number;
    description?: string;
    capRatePercentage?: number;
    kmFromSP?: number;
    totalAreaM2?: number;
    constructedAreaM2?: number;
    vgvInReais?: number;
    docLink?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    street?: string;
    addressNumber?: string;
    addressComplement?: string;
    partner?: string;
    zoning?: string;
}

export const VAssetForm = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    tags: yup
        .array(
            yup.object().shape({
                label: yup.string().required(),
                value: yup.string().required()
            })
        )
        .optional(),
    priceInReais: yup.number().optional(),
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
    capRatePercentage: yup.number().optional(),
    kmFromSP: yup.number().optional(),
    totalAreaM2: yup.number().optional(),
    constructedAreaM2: yup.number().optional(),
    vgvInReais: yup.number().optional(),
    docLink: yup.string().optional(),
    state: yup.string().optional(),
    city: yup.string().optional(),
    neighborhood: yup.string().optional(),
    street: yup.string().optional(),
    addressNumber: yup.string().optional(),
    addressComplement: yup.string().optional(),
    partner: yup.string().optional(),
    zoning: yup.string().optional(),
})

