import React from 'react'

class DropDown extends React.Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <div className="dropdown">
                <label htmlFor="orbiting_body">Orbiting Body</label>
                <select id="orbiting_body" onChange={this.props.clicked}>
                    <option selected disabled>Choose an orbiting body</option>
                    <option value="Earth">Earth</option>
                    <option value="Mars">Mars</option>
                </select>
            </div>
        )
    }
}

export default DropDown