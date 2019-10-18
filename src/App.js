import React from 'react';
import './App.css';
import axios from 'axios'

const link = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY"

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  async componentDidMount() {
    const res = (await axios.get(link))
    console.log(res)
  }

  render() {
    return (
      <div className="App">
      </div>
    )
  }
}

export default App;
