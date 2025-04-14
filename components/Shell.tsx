import Side from './Side'
import Nav from './Nav'
import { DefaultLayoutProps } from '@/interfaces/interfaces'

const Shell = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="flex w-screen h-screen">
      <aside className="w-[300px] min-w-[300px] max-w-[300px] h-full border-r border-default-50">
        <Side />
      </aside>
      <div className="w-[calc(100vw-200px)] ">
        <Nav />
        <main className="h-[calc(100vh-65px)]">{children}</main>
      </div>
    </div>
  )
}

export default Shell
