import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { timingSafeEqual } from 'crypto';
import Location from './Location'
export default class Job extends Component {
    constructor(props) {
        super(props)
        this.state = {
            job: this.props.job
        }
    }

    componentDidMount() {
        //const {match: {params }} = this.props;
        console.log("Job component mounted")
        console.log("Job: ", this.state.job)
    }
 
    render() {     
        
        let jobss = this.props.jobs
        let items = jobss.filter((elm => {
            let category = this.props.match.params.category === elm.category
            let location = this.props.match.params.location === elm.location
            let title = this.props.match.params.title === elm.title
            console.log(category)
            return (category && location && title)
        }))

        let currentJobs = []
        items.forEach((elm) => {
            currentJobs.push(<React.Fragment>
                
                <div className="category">
                    <h2>{elm.title}</h2>
                    <p>{elm.description}</p>
                    <p>Category: {elm.category}</p>
                    <p>Company: {elm.company}</p>
                    <p>Email: {elm.email}</p>
                    <small>Location: {elm.location}</small>
                </div>
                
            </React.Fragment>)

        })

        let job = this.props.job
        
            return (
                <React.Fragment>
                    <h1>Current Job</h1>
                    <div>
                        {currentJobs}
                    </div>
                    
                    
                </React.Fragment>
            )
        
    }
}
