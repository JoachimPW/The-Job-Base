import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: this.props.jobs
        }

        this.amountOfJobs = this.amountOfJobs.bind(this);
    }

    amountOfJobs(category) {
        const amount = this.props.jobs.filter(elm => elm.category === category)
        return amount.length;
    }   

    render() {
        if (this.props.categories.length) {
            let list = []
            this.props.categories.forEach((elm) => {
                list.push(<React.Fragment>
                    <Link to={{pathname: `/jobs/${elm.title}`}} style={{textDecoration: "none", color: "black"}}>
                    <div className="category">                    
                        <h2>{elm.title} ({this.amountOfJobs(`${elm.title}`)})</h2>
                        <p>{elm.description}</p>                        
                    </div>
                    </Link>
                </React.Fragment>)
            })

            return (
                <div>
                    <h3>Choose Job Category</h3>
                    <br></br>
                    {list}
                </div>
            )
        }
        return <h1>NO DATA</h1>
    }
}
