import { getRentsForDashboard } from '@/actions/rentsAction'
import { getCurrentUser } from '@/actions/usersAction'

async function RentsSlot() {
  const user = await getCurrentUser()
  const data = user ? await getRentsForDashboard() : []

  return (
    <div className="w-full h-full p-4 flex justify-center">
      <div className="w-full">
        <h2 className="text-center text-xl">Games rented</h2>
        <div className="rounded-md border border-default-100 my-8">
          {data.map(({ customers, rents, videogames }) => (
            <div
              key={1}
              className="border-b border-default-100 p-2 flex gap-2 justify-between"
            >
              <span>
                {rents?.status} - {videogames?.name}
              </span>
              <span className="text-gray-500">by {customers.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RentsSlot
