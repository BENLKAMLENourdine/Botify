import React from 'react'
import { Chart } from "react-google-charts"

class Bar extends React.Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <Chart
          width={'1000px'}
          height={'700px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['NEO Name', 'Min Estimated diameter (Km)', 'Max Estimated diameter (Km)'],
            ...this.props.neos
          ]}
          options={{
            title: 'Estimated Diameter of NEO objects',
            chartArea: { width: '50%' },
            hAxis: {
              title: 'Estimated diameter (Km)',
              minValue: 0,
            },
            vAxis: {
              title: 'NEOs',
            },
        }} />
        )
    }
}

export default Bar