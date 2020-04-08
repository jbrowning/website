import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import AreaChart from './charts/_AreaChart'
import { parseDate } from './_util'

export default function UsAreaChartContainer() {
  const transformData = data => {
    const transformedData = data.allCovidUsDaily.nodes
      .map(node => [
        {
          date: parseDate(node.date),
          label: 'Total',
          value: node.totalTestResults,
        },
        { date: parseDate(node.date), label: 'Positive', value: node.positive },
      ])
      .flat()
    return transformedData
  }
  const data = useStaticQuery(graphql`
    {
      allCovidUsDaily {
        nodes {
          totalTestResults
          positive
          date
        }
      }
    }
  `)
  return (
    <div className="us-area-chart-container">
      <AreaChart
        data={transformData(data)}
        fill={d => {
          if (d === 'Total') return '#585BC1'
          return '#FFA270'
        }}
        height={250}
        labelOrder={['Total', 'Positive']}
        marginBottom={40}
        marginLeft={80}
        marginRight={10}
        marginTop={10}
        xTicks={4}
        yTicks={4}
        width={750}
      />
    </div>
  )
}
