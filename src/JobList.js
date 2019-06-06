import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { timingSafeEqual } from 'crypto';
import Location from './Location'
export default class JobList extends Component {
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
            let location = this.props.match.params.location === elm.location
            console.log(category)
            return (category && location)
        }))

        let currentJobs = []
        items.forEach((elm) => {
            currentJobs.push(<React.Fragment>
                <Link to={{ pathname: `/jobs/${this.props.category}/${elm.location}/${elm.title}` }} style={{ textDecoration: "none", color: "black" }}>
                <div className="category">
                    <h2>{elm.title}</h2>
                    <p>{elm.description}</p>
                    <p>{elm.company}</p>
                    <small>{elm.location}</small>
                </div>
                </Link>
                <hr></hr>
            </React.Fragment>)

        })

        {
            

            return (
                <React.Fragment>
                    <h1>{this.props.match.params.category}</h1>
                    <br></br>
                    <h3>Found following jobs in {this.props.match.params.location} </h3>                                         
                    <br></br>
                    <div>
                        {currentJobs}
                    </div>
                </React.Fragment>
            )
        }
    }
}
