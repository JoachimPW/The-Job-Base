import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { timingSafeEqual } from 'crypto';
import Location from './Location'
export default class Job extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        //const {match: {params }} = this.props;
    }

    render() {
        let jobss = this.props.jobs
        let items = jobss.filter((elm => {
            let category = this.props.match.params.category === elm.category
            console.log(category)
            return (category)
        }))

        let currentJobs = []
        items.forEach((elm) => {
            currentJobs.push(<React.Fragment>
                <div>
                    <h2>{elm.title}</h2>
                    <p>{elm.description}</p>
                    <p>{elm.company}</p>
                </div>
            </React.Fragment>)

        })

        {
            

            return (
                <React.Fragment>
                    <h1>{this.props.match.params.category}</h1>
                    <div className="row justify-content-md-center search">
                        <div className="col-md-6 col-centered" style={{ textAlign: "center" }}>
                            <h2>Søgekriterier</h2>
                            <Location locations={this.props.locations}/>                           
                        </div>
                    </div>
                    <br></br>

                    <div>
                        <h1>{this.props.match.params.category}</h1>
                        {currentJobs}
                    </div>
                </React.Fragment>
            )
        }
    }
}
