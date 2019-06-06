import React, { Component } from 'react'

export default class SearchJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: "",
            filtered: this.props.jobs
        }

        this.handleSearchInput = this.handleSearchInput.bind(this);

    }

    handleSearchInput(event) {
        this.setState({
            searchTerm: event.target.value
        })

        let currentList = [];
        let newList = [];

        if (event.target.value !== "") {

            currentList = this.props.jobs;

            newList = currentList.filter(item => {

                const lc = item.title.toLowerCase();

                const filter = event.target.value.toLowerCase();

                return lc.includes(filter);
            });

        } else {

            newList = this.props.items;
        }

        this.setState({
            filtered: newList
        });
    }

    render() {

        let jobList = []
        if (this.state.filtered) {
            this.state.filtered.forEach((elm) => {
                jobList.push(<React.Fragment>
                    <div className="category">
                        <h2>{elm.title}</h2>
                        <p>{elm.description}</p>
                        <p>{elm.company}</p>
                        <small>{elm.location}</small>
                    </div>
                </React.Fragment>)
            })
        }
       
        {
            return (
                <React.Fragment>
                    <div>
                        <h2>Search for a job</h2>
                        <input onChange={this.handleSearchInput} type="text"
                            className="searchTerm" placeholder="Search..."></input>
                        {jobList}
                    </div>
                </React.Fragment>
            )
        }
    }
}
