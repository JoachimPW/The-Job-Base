import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class Category extends Component {
    render() {

        if (this.props.categories.length) {
            let list = []
            this.props.categories.forEach((elm) => {
                list.push(<React.Fragment>
                    <div className="category">
                    <Link to={{pathname: `/jobs/${elm.title}`}} style={{textDecoration: "none", color: "black"}}>
                        <h2>{elm.title}</h2>
                        <p>{elm.description}</p>
                        </Link>
                    </div>
                </React.Fragment>)
            })


            return (
                <div>
                    {list}
                </div>
            )
        }
        return <h1>NO DATA</h1>
    }
}
