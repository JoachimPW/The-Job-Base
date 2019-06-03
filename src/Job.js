import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
export default class Job extends Component {
    render() {

        if (this.props.locations.length) {
            let list = []
            this.props.locations.forEach((elm) => {
                list.push(<React.Fragment>

                    <div style={{ display: "inline-block" }}>
                        <button>{elm.location}</button>
                    </div>

                </React.Fragment>)
            })


            return (
                <React.Fragment>
                    <div className="row justify-content-md-center search">
                        <div className="col-md-6 col-centered" style={{ textAlign: "center" }}>
                            <h2>Søgekriterier</h2>
                            <div>{list}</div>
                        </div>
                    </div>
<br></br>
                    <ul>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    </ul>


                </React.Fragment>
            )
        }
        return <h1>NO DATA</h1>

    }
}
