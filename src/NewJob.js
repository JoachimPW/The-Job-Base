import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class NewJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            category: "",
            email: "",
            location: "",
            errTitle: "",
            errDesc: "",
            errCat: "",
            errMail: "",
            errLoc: "",
            sucess: "",
            refresh: "",
            LinkToJob: ""

        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);

        this.refresh = this.refresh.bind(this);

    }

    onChangeTitle(event) {
        this.setState({
            title: event.target.value
        })
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        })
    }

    onChangeCategory(event) {
        this.setState({
            category: event.target.value
        })
    }

    onChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    onChangeLocation(event) {
        this.setState({
            location: event.target.value
        })
    }

    handleFormInput(event) {
        if (this.state.title.length === 0) {
            event.preventDefault();
            this.setState({
                errTitle: "Missing!"
            })
        }
        else {
            event.preventDefault();
            this.setState({
                errTitle: ""
            })
        }

        if (this.state.description.length === 0) {
            event.preventDefault();
            this.setState({
                errDesc: "Missing!"
            })
        }

        else {
            event.preventDefault();
            this.setState({
                errDesc: ""
            })
        }

        if (this.state.category.length === 0) {
            event.preventDefault();
            this.setState({
                errCat: "Missing!"
            })
        }

        else {
            event.preventDefault();
            this.setState({
                errCat: ""
            })
        }
        if (this.state.email.length === 0) {
            event.preventDefault();
            this.setState({
                errMail: "Missing!"
            })
        }

        else {
            event.preventDefault();
            this.setState({
                errMail: ""
            })
        }
        if (this.state.location.length === 0) {
            event.preventDefault();
            this.setState({
                errLoc: "Missing!"
            })
        }
        else {
            event.preventDefault();
            this.setState({
                errLoc: ""
            })
        }

        if (this.state.title.length && this.state.description.length && this.state.category.length && this.state.email.length && this.state.location.length > 0) {
            this.props.postNewJob(this.state.title, this.state.description, this.state.category, this.state.email, this.state.location)
            this.setState({
                sucess: "Job Post Created!",
                LinkToJob: <Link onClick={() => window.location.refresh()} to={{ pathname: `/jobs/${this.state.category}/${this.state.location}/${this.state.title}` }} >
                <h4>View your posted job</h4>
                </Link>
            })
            console.log("sender værdier")
        }
    }
    refresh() {
        this.setState({
            refresh :""
        })
    }

    render() {
        return (
            <div>
                <h1>Create a new job post</h1>
                <br></br>

                <form className="newjob">
                    <label>Title</label>
                    <br></br>
                    <small className="errmsg">{this.state.errTitle}</small>
                    <input placeholder="Job title..." value={this.state.title} onChange={this.onChangeTitle}></input>

                    <br></br>
                    <label>Description</label>
                    <br></br>
                    <small className="errmsg">{this.state.errDesc}</small>
                    <textarea placeholder="Job description..." value={this.state.description} onChange={this.onChangeDescription}></textarea>

                    <br></br>
                    <label>Category</label>
                    <br></br>
                    <small className="errmsg">{this.state.errCat}</small>
                    <select value={this.state.category} onChange={this.onChangeCategory}>
                        <option selected>Choose Category</option>
                        <option>Healthcare</option>
                        <option>Service</option>
                        <option>Education</option>
                        <option>Engineering</option>
                        <option>IT</option>
                    </select>

                    <br></br>

                    <label>Email</label>
                    <br></br>
                    <small className="errmsg">{this.state.errMail}</small>
                    <input placeholder="Contact Email..." value={this.state.email} onChange={this.onChangeEmail}></input>

                    <br></br>
                    <label>Location</label>
                    <br></br>
                    <small className="errmsg">{this.state.errLoc}</small>
                    <select value={this.state.location} onChange={this.onChangeLocation}>
                        <option selected>Choose Location</option>
                        <option>Nordjylland</option>
                        <option>Midtjylland</option>
                        <option>Syddanmark</option>
                        <option>Hovedstaden</option>
                        <option>Sjælland</option>
                        <option>Bornholm</option>
                    </select>

                    <br></br>
                    <br></br>
                    <div className="postJob">
                        <button onClick={this.handleFormInput}>POST JOB</button>
                    </div>
                    <br></br>
                    <h3 style={{textAlign:"center"}}>{this.state.sucess}</h3>
                    {this.state.LinkToJob}
                </form>
            </div>
        )
    }
}
