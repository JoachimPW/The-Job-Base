import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
import { browserHistory } from 'react-router'
import './App.css';
import io from 'socket.io-client';
import List from './List'
import Category from './Category'
import AddTask from "./AddTask";
import Login from './Login'
import Job from './Job'
import JobList from './JobList'
import NewJob from './NewJob'
import PostedJobs from './PostedJobs'
import SearchJob from './SearchJob'
import Location from './Location'
import { IoIosArrowBack } from "react-icons/io";
import AuthService from './AuthService';

class App extends Component {

    API_URL = process.env.REACT_APP_API_URL;
    
    constructor(props) {
        super(props);

        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);

        this.state = {
            todoList: [],
            categories: [],
            locations: [],
            jobs: [],
            loggedIn: false,
            token: "",
            res: "",
            username: ""
        };

        this.handleLogout = this.handleLogout.bind(this)
        this.addTask = this.addTask.bind(this);
        this.getData = this.getData.bind(this);
        this.getJobs = this.getJobs.bind(this);
        this.getLocations = this.getLocations.bind(this);
        this.loginToApp = this.loginToApp.bind(this);
        this.goBack = this.goBack.bind(this);
        this.getJobsFromCategory = this.getJobsFromCategory.bind(this);      

        this.filterByTitle = this.filterByTitle.bind(this);
        this.postNewJob = this.postNewJob.bind(this);
    }

    SOCKET_URL = `${this.API_URL}/my_app`;

    componentDidMount() { 
        this.setState({
            username: localStorage.getItem("username")
        }) 
              
        this.setState({
            token: localStorage.getItem("token")
        })
        const socket = io(`${this.SOCKET_URL}`);
        socket.on('connect', () => {
            console.log("Connected to socket.io");
            socket.emit('Hello');
        });

        socket.on('new-data', (questions) => {
            console.log(`server msg: ${questions.msg}`);
            this.getData();
            /* Lav en getdata funktion her og indsæt din fetch i en get data funktion */
        });
        console.log("App component has mounted");
        this.getData();
        this.getJobs();
        this.getLocations();           
    }

    async postNewJob(title, description, category, email, location) {
        await this.Auth.fetch(`${this.API_URL}/jobs/newJob`, { 
            method: 'POST',          
            body: JSON.stringify({
                title: title,
                description: description,
                category: category,
                company: localStorage.getItem("username"),
                email: email,
                location: location
            })
        })   

    }

    async loginToApp(username, password) {
        console.log(username, password)
        let res = await this.Auth.login(username, password)
        this.setState({
            res: res.msg,
            username: username
        })

        this.setState({
            loggedIn: true,
            token: localStorage.getItem("token")
        })
        localStorage.setItem("username", this.state.username)
    }

    async getData() {
        await this.Auth.fetch(`${this.API_URL}/jobs/categories`)
            .then(data => {
                this.setState({
                    categories: data
                });
            })
            .catch(error => {
                // TODO: Inform the user about the error
                console.error("Error when fetching: ", error);
            })
    }

    async getLocations() {
        await this.Auth.fetch(`${this.API_URL}/jobs/locations`)
        .then(data => {
            this.setState({
                locations: data
            })
        })
    }

    getJobs(){
        this.Auth.fetch(`${this.API_URL}/jobs`)
        .then(jobs => {
            this.setState({
                jobs: jobs
            })
        })
    }

    getJobsFromCategory(category) {
        return this.state.jobs.filter((elm) => elm.category.includes(category))
    }

    goBack() {
        window.history.back();
    }

    addTask(task) {
        let newTask = {
            task: task,
            done: false
        };

        this.Auth.fetch(`${this.API_URL}/tasks/newTask`, {
            method: "POST",
            body: JSON.stringify(newTask)
        })
            .then(result => {
                this.getData();
            })
            .catch(error => {
                // TODO: Inform the user about the error
                console.error("Error when adding task: ", error);
            })
    }

   

    filterByTitle(title){
        return this.state.jobs.find((elm) => elm.title === title)
    }

    handleLogout(event) {
        this.Auth.logout()
        this.setState({
            token: ""
        })
    }

    render() {
     
        let currentUser = localStorage.getItem("username")
        let token = this.state.token
        if (token === 'undefined' || token === "" || !token) {
            return (<Login res={this.state.res} loginToApp={this.loginToApp} />)
        }      

        return (
            <React.Fragment>
                <Router>
                    <div className="container">
                        <div className="row">

                            <div className="col-sm" />
                            <div className="col-sm-8">
                            <a href="/"> <h4 className="display-4"> The Job Base</h4></a>
                                <br />
                                <br />
                                <Switch>
                                    <Route exact path="/newjob"
                                        render={(props) =>
                                            <React.Fragment>
                                                <NewJob {...props} 
                                                categories={this.state.categories}
                                                location={this.state.locations}
                                                jobs = {this.state.jobs}
                                                postNewJob={this.postNewJob} />
                                            </React.Fragment>
                                        }
                                    />
                                </Switch>
                                <Switch>
                                    <Route exact path="/search"
                                        render={(props) =>
                                            <React.Fragment>
                                                <SearchJob {...props} 
                                                categories={this.state.categories}
                                                location={this.state.locations}
                                                jobs = {this.state.jobs}
                                                postNewJob={this.postNewJob} />
                                            </React.Fragment>
                                        }
                                    />
                                </Switch>

                                <Switch>
                                    <Route exact path="/postedjobs"
                                        render={(props) =>
                                            <React.Fragment>
                                                <PostedJobs {...props} 
                                                categories={this.state.categories}
                                                category = {props.match.params.category}
                                                location={this.state.locations}
                                                jobs = {this.state.jobs}
                                                 />
                                            </React.Fragment>
                                        }
                                    />
                                </Switch>
                                <Switch>
                                    <Route exact path="/(jobs|)"
                                        render={(props) =>
                                            <React.Fragment>
                                                <Category {...props} 
                                                categories={this.state.categories}
                                                jobs = {this.state.jobs} />
                                            </React.Fragment>
                                        }
                                    />
                                </Switch>
                                <Switch>
                                    <Route exact path={"/jobs/:category"}
                                    render={(props) =>
                                        <React.Fragment>
                                        <Location {...props}  
                                        jobs = {this.state.jobs}                                      
                                        category = {props.match.params.category}
                                        locations={this.state.locations}
                                        />                                        
                                        </React.Fragment>
                                    }
                                    />
                                </Switch>

                                <Switch>
                                    <Route exact path={"/jobs/:category/:location"}
                                    render={(props) => 
                                    <React.Fragment>
                                        <JobList {...props}
                                        jobs = {this.state.jobs}
                                        category = {props.match.params.category}
                                        location = {props.match.params.location}
                                        />                                       
                                    </React.Fragment>}
                                    />
                                </Switch>

                                <Switch>
                                    <Route exact path={"/jobs/:category/:location/:title"}
                                    render={(props) => 
                                    <React.Fragment>
                                        <Job {...props}
                                        job = {this.filterByTitle(props.match.params.title)}   
                                        jobs = {this.state.jobs}                                   
                                        category = {props.match.params.category}
                                        location = {props.match.params.location}
                                        />                                       
                                    </React.Fragment>}
                                    />
                                </Switch>
                                
                            </div>
                            <div className="col-sm" />
                        </div>
                    </div>
                    <div className="username">
                    <div className="backBtn">
                            <button onClick={this.goBack}> <IoIosArrowBack></IoIosArrowBack>Back</button>
                        </div>
                        <br></br>
                        <h3> Logged in as <br></br></h3>
                        <h4>{this.state.username}</h4>
                        <br></br>
                        <a href="/newjob"><h4>Create Job Post</h4></a>
                        <a href="/search"><h4>Look up a job</h4></a>
                        <a href="/postedjobs"><h4>View posted jobs</h4></a>                        
                        </div>
                    <div className="logOut">
                        <form>
                            <button type="submit" onClick={this.handleLogout}>LOGOUT</button>
                        </form>
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
