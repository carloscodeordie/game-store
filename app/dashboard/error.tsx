'use client'

const DashboardError = ({ error, reset }) => {
  console.log(error)
  return (
    <div>
      <h2>Something bad happened :( </h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

export default DashboardError
