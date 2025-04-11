'use client'

import { Button } from '@nextui-org/react'
import { SubmitButtonProps } from '@/interfaces/interfaces'
import { useFormStatus } from 'react-dom'

function SubmitButton({ label }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" isLoading={pending} className="bg-blue-700">
      {label}
    </Button>
  )
}

export default SubmitButton
