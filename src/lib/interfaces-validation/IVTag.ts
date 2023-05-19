import * as yup from "yup";

export interface ITag {
  label: string;
  _id?: string
}

export const VTag = yup.object().shape({
  name: yup.string().required("Name is required"),
});
