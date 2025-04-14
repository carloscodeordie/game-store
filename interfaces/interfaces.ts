import { ReactNode } from 'react'

export interface DefaultLayoutProps {
  children: ReactNode
}

export interface SubmitButtonProps {
  label: string
}

export interface FormMessageProps {
  message: string | null
}

export interface RentsChartProps {
  rents: number
  videogames: number
}
