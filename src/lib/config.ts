import type { ToastSettings } from '@skeletonlabs/skeleton'

export const API_URL = import.meta.env.VITE_API_URL 

export const transitionOptions = {
	defaultFlyEntry: { x: -50, duration: 700 },
	defaultFlyExit: { x: 50, duration: 400 },
	defaultFade: { duration: 400 }
}

export const toastAlreadyExists: ToastSettings = {
	message: 'Registro já existe',
  hideDismiss: true,
  timeout: 2000,
	background: 'variant-filled-warning'
}
export const toastRegistered: ToastSettings = {
	message: 'Cadastrado com sucesso!',
  hideDismiss: true,
  timeout: 2000,
	background: 'variant-filled-success'
}

export const toastUpdated: ToastSettings = {
	message: 'Atualizado com sucesso!',
  hideDismiss: true,
  timeout: 2000,
	background: 'variant-filled-success'
}

export const toastError: ToastSettings = {
	message: 'Ocorreu um erro, tente novamente mais tarde',
  hideDismiss: true,
  timeout: 2000,
	background: 'variant-filled-error'
}

export const toastCopied: ToastSettings = {
	message: 'Copiado!',
  hideDismiss: true,
  timeout: 2000,
}
