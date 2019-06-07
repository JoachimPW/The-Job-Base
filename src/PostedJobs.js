import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class PostedJobs extends Component {
    constructor(props) {
        super(props)
        this.state ={}
    }
    render() {
        let jobs = this.props.jobs
        let postedJobs = jobs.filter((elm => {
            let username = localStorage.getItem("username") === elm.company            
            return (username)
        }))

        let jobList = []
        postedJobs.forEach((elm) => {
            jobList.push(<React.Fragment>
                <Link to={{ pathname: `/jobs/${elm.category}/${elm.location}/${elm.title}` }} style={{ textDecoration: "none", color: "black" }}>
                <div className="category">
                <h2>{elm.title}</h2>
                    <p>{elm.description}</p>
                    <p>{elm.company}</p>
                    <small>{elm.category}</small>
                    <br></br>
                    <small>{elm.location}</small>
                </div>
                </Link>
            </React.Fragment>)
        })

{
        return (
            <React.Fragment>
            <div>
                <h2>Your posted jobs </h2>
                {jobList}
                
            </div>
            </React.Fragment>
        )
    }
}
}
