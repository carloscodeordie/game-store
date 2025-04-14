import RentsChart from '@/components/RentsChart'
import { getRentsCount } from '@/actions/rentsCountAction'
import { getVideogamesCount } from '@/actions/videogamesCountAction'

const Dashboard = async () => {
  const rents = await getRentsCount()
  const videogames = await getVideogamesCount()

  return (
    <div className="w-full flex justify-center items-center">
      <div>
        <div className="my-8 w-full">
          <RentsChart rents={rents} videogames={videogames} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
