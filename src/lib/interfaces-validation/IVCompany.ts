import * as yup from 'yup';
import type {IOption} from './IOption';
import type {IPerson} from './IVPerson';

export interface ICompany {
  _id?: string;
  name: string;
  description: string;
  target: string;
  tags: IOption[];
  employees: IPerson[];
  createdAt?: Date;
  lastUpdated?: Date;
}

export const VCompany = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  description: yup.string().min(2).optional(),
  target: yup.string().min(2).optional(),
  lastUpdated: yup.date().optional()
});
