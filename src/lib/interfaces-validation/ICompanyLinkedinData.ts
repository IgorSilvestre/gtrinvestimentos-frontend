import * as yup from 'yup'


interface Employee {
  link: string;
  name: string;
  title: string;
}

interface Headquarters {
  country: string;
  fullAddress: string;
  locality: string;
}

interface Location {
  cityStatePostalCountry: string;
  fullAddress: string;
  getDirectionsLink: string;
  street: string;
}

interface SimilarPage {
  industry: string;
  link: string;
  location: string;
  logo: string;
  title: string;
}

interface Update {
  comments: number;
  date: string;
  linksInPostText: {
    hashtagLinks: string[];
  };
  media: string[];
  postAuthor: {
    link: string;
    text: string;
  };
  postText: string;
  reactions: number;
}

interface Company {
  banner_img: string;
  company_id: number;
  company_name: string;
  company_size: string;
  description: string;
  domain: string;
  employee_count_on_li: number;
  employees_on_li: Employee[];
  final_li_url: string;
  founded: number;
  headquarters: Headquarters;
  industries: string;
  locations: Location[];
  logo: string;
  original_li_url: string;
  similar_pages: SimilarPage[];
  type: string;
  updates: Update[];
  website: string;
}

export interface ICompanyLinkedinData {
  message: string;
  results: Company[];
}

const EmployeeSchema = yup.object().shape({
  link: yup.string().url(),
  name: yup.string(),
  title: yup.string(),
});

const HeadquartersSchema = yup.object().shape({
  country: yup.string(),
  fullAddress: yup.string(),
  locality: yup.string(),
});

const LocationSchema = yup.object().shape({
  cityStatePostalCountry: yup.string(),
  fullAddress: yup.string(),
  getDirectionsLink: yup.string().url(),
  street: yup.string(),
});

const SimilarPageSchema = yup.object().shape({
  industry: yup.string(),
  link: yup.string().url(),
  location: yup.string(),
  logo: yup.string().url(),
  title: yup.string(),
});

const UpdateSchema = yup.object().shape({
  comments: yup.number(),
  date: yup.string(), // Adjust based on your date format
  linksInPostText: yup.object().shape({
    hashtagLinks: yup.array().of(yup.string().url()),
  }),
  media: yup.array().of(yup.string().url()),
  postAuthor: yup.object().shape({
    link: yup.string().url(),
    text: yup.string(),
  }),
  postText: yup.string(),
  reactions: yup.number(),
});

const CompanySchema = yup.object().shape({
  banner_img: yup.string().url(),
  company_id: yup.number(),
  company_name: yup.string(),
  company_size: yup.string(),
  description: yup.string(),
  domain: yup.string().url(),
  employee_count_on_li: yup.number(),
  employees_on_li: yup.array().of(EmployeeSchema),
  final_li_url: yup.string().url(),
  founded: yup.number(),
  headquarters: HeadquartersSchema,
  industries: yup.string(),
  locations: yup.array().of(LocationSchema),
  logo: yup.string().url(),
  original_li_url: yup.string().url(),
  similar_pages: yup.array().of(SimilarPageSchema),
  type: yup.string(),
  updates: yup.array().of(UpdateSchema),
  website: yup.string().url(),
});

export const VCompanyLinkedinData = yup.object().shape({
  message: yup.string(),
  results: yup.array().of(CompanySchema),
});

