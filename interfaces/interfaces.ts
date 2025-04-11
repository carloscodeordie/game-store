import { ReactNode } from 'react'

export interface AuthLayoutProps {
  children: ReactNode
}

export interface SubmitButtonProps {
  label: string
}

export interface FormMessage {
  message: string | null
}
