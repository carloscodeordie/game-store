'use client'

import { Button } from '@nextui-org/react'
import { SubmitButtonProps } from '@/interfaces/interfaces'

function SubmitButton({ label }: SubmitButtonProps) {
  return (
    <Button type="submit" className="bg-blue-700">
      {label}
    </Button>
  )
}

export default SubmitButton
