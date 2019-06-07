import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.amountOfJobs = this.amountOfJobs.bind(this);
    }

    componentDidMount() {
        console.log("category:" + this.props.category)
    }

    amountOfJobs(category, location) {
         const amount = this.props.jobs.filter(elm =>           
             elm.category === category &&
             elm.location === location)    
             return amount.length      
    }
       // ${this.props.category}
    

    render() {

        let list = []
        this.props.locations.forEach((elm) => {
            list.push(<React.Fragment>
                <Link to={{ pathname: `/jobs/${this.props.category}/${elm.location}` }} style={{ textDecoration: "none", color: "black" }}>
                    <div className="category" style={{ display: "inline-block" }}>
                        <h2>{elm.location} ({this.amountOfJobs(`${this.props.category}`, `${elm.location}`)})</h2>
                    </div>
                </Link>
            </React.Fragment>)
        })

        return (
            <React.Fragment>
                <br></br>
                <br></br>
                <div>
                    <h3>Choose Job Location for {this.props.category}</h3>
                    {list}
                </div>
            </React.Fragment>
        )
    }
}
