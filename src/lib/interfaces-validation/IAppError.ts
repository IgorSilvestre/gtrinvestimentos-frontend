import * as Yup from 'yup';

interface IMessage {
  clientMessage: string
  apiError: unknown
}

export interface IAppError {
  message: IMessage 
  status: number
}


const messageSchema = Yup.object().shape({
  clientMessage: Yup.string().required('Client message is required'),
  apiError: Yup.mixed().required('API error is required')
});

export const VAppError = Yup.object().shape({
  message: messageSchema,
  status: Yup.number().required('Status is required').positive('Status must be a positive number').integer('Status must be an integer')
});

