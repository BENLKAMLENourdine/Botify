import React from 'react';
import './App.css';
import axios from 'axios'
import { Chart } from "react-google-charts"
import DropDown from './components/dropDown'

const link = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY"

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      neos: [],
      error: false,
      res: null,
      chart: true
    }
    this.selectOrbitingBody = this.selectOrbitingBody.bind(this)
    this.switchView = this.switchView.bind(this)
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
      this.setState({ neos: newNEO, res })
    } catch (error) {
      this.setState({ error: true })
    }
  }

  selectOrbitingBody(event) {
    const newNeo = []
    this.state.res.forEach(element => {
      if (element['close_approach_data'].length && element['close_approach_data'].some(function(el){
        return el['orbiting_body'] === event.target.value
      })) {
        newNeo.push([
          element['name'],
          element['estimated_diameter']['kilometers']['estimated_diameter_min'],
          element['estimated_diameter']['kilometers']['estimated_diameter_max']
        ])
      }
    })
    this.setState({ neos: newNeo })
  }

  switchView() {
    this.setState({ chart: !this.state.chart })
  }

  render() {
    return (
      <div className="App">
        { this.state.error ? <div>Error while fetching neos</div> :
        <div>
          <DropDown clicked={this.selectOrbitingBody}/>
          <button onClick={this.switchView}>Switch View</button>
          { this.state.chart ?
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
        }} /> :
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
    ...this.state.neos
  ]}
  options={{
    showRowNumber: true,
  }}
  rootProps={{ 'data-testid': '1' }}
/>
      }
    </div>}
      </div>
    )
  }
}

export default App;
