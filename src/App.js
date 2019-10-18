import React from 'react';
import './App.css';
import axios from 'axios'
import DropDown from './components/dropDown'
import Bar from './components/bar'
import Table from './components/table'

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
    this.download = this.download.bind(this)
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

  download () {
    let str = 'NEO Name; Min Estimated diameter (Km); Max Estimated diameter (Km)\r\n'
    this.state.neos.forEach(el => {
      let line = ''
      for (let i in el){
        if (line != '') line += ';'
        line += el[i]
      }
      str += line + '\r\n'
    })
    const filenmae = 'export.csv'

    const blob = new Blob([str], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
  }

  render() {
    return (
      <div className="App">
        { this.state.error ? <div>Error while fetching neos</div> :
          <div>
            <DropDown clicked={this.selectOrbitingBody}/>
            <button onClick={this.switchView}>Switch View</button>
            { this.state.chart ?
                <Bar neos={this.state.neos} /> :
                <div>
                  <button onClick={this.download}>Download</button>
                  <Table neos={this.state.neos} />
                </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default App;
