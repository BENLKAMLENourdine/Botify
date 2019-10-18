import React from 'react';
import './App.css';
import axios from 'axios'
import { Chart } from "react-google-charts"

const link = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY"

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      neos: [],
      error: false
    }
  }

  async componentDidMount() {
    try {
      const res = (await axios.get(link))['data']['near_earth_objects']
      const newNEO = []
      res.forEach(element => {
        newNEO.push([element['name'],
          element['estimated_diameter']['kilometers']['estimated_diameter_min'],
          element['estimated_diameter']['kilometers']['estimated_diameter_max']
        ])
      })
      newNEO.sort(function(a, b) {
        return (b[1] + b[2]) / 2 - (a[1] + a[2]) / 2
      })
      this.setState({ neos: newNEO })
    } catch (error) {
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <div className="App">
        { this.state.error ? <div>Error while fetching neos</div> :
      <Chart
      width={'1000px'}
      height={'700px'}
    chartType="BarChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['NEO Name', 'Min Estimated diameter (Km)', 'Max Estimated diameter (Km)'],
      ...this.state.neos
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
    }} />}
      </div>
    )
  }
}

export default App;
