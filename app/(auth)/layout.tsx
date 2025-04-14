import { DefaultLayoutProps } from '@/interfaces/interfaces'
import Image from 'next/image'
import Logo from '@/images/logo.png'

const AuthLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div>
      <div className="w-screen flex justify-center items-center mb-12">
        <Image src={Logo} alt="Game Store logo" height={300} width={500} />
      </div>
      <div className="w-screen flex justify-center items-center px-4">
        <div className="w-full max-w-[400px] mx-auto">{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
