'use client'

import { RentsChartProps } from '@/interfaces/interfaces'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

function RentsChart({ rents, videogames }: RentsChartProps) {
  const data = {
    labels: ['Rents', 'Videogames'],
    datasets: [
      {
        label: '# of rents',
        data: [rents, videogames - rents],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  }

  return <Pie data={data} />
}

export default RentsChart
