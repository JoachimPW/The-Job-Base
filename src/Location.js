import React, { Component } from 'react'

export default class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {

    }

    render() {

        let list = []
        this.props.locations.forEach((elm) => {
            list.push(<React.Fragment>
                <div style={{ display: "inline-block" }}>
                    <button>{elm.location}</button>
                </div>
            </React.Fragment>)
        })

        return (
            <div>
                {list}
            </div>
        )
    }
}
