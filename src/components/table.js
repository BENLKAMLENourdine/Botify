import React from 'react'
import { Chart } from "react-google-charts"

class Table extends React.Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <Chart
  width={'1000px'}
  height={'700px'}
  chartType="Table"
  loader={<div>Loading Chart</div>}
  data={[
    [
      { type: 'string', label: 'NEO Name' },
      { type: 'number', label: 'Min estimated diameter (Km)' },
      { type: 'number', label: 'Max estimated diameter (Km)' },
    ],
    ...this.props.neos
  ]}
  options={{
    showRowNumber: true,
  }}
  rootProps={{ 'data-testid': '1' }}
/>
        )
    }
}

export default Table