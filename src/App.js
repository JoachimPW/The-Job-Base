import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import './App.css';
import io from 'socket.io-client'; 
import List from './List'
import AddTask from "./AddTask";
import Login from './Login'

import AuthService from './AuthService';

class App extends Component {

    API_URL = 'http://localhost:8080/api';

    constructor(props) {
        super(props);

        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);

        this.state = {
            todoList: [],
            loggedIn: false
        };

        this.handleLogout = this.handleLogout.bind(this)
        this.addTask = this.addTask.bind(this);
        this.setDone = this.setDone.bind(this);
        this.getData = this.getData.bind(this);


    }
    SOCKET_URL = `${this.API_URL}/my_app`;

    componentDidMount() {
        const socket = io(`${this.SOCKET_URL}`);
        socket.on('connect',() => {
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

    }

     getData() {
         this.Auth.fetch(`${this.API_URL}/tasks`)
         .then(tasks => {
             this.setState({
                 todoList: tasks
             });
         })
         .catch(error => {
             // TODO: Inform the user about the error
             console.error("Error when fetching: ", error);
         })
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

    setDone(id, done) {
        let task = this.state.todoList.find(elm => elm.id === id);
        task.done = done;

        this.Auth.fetch(`${this.API_URL}/tasks/${id}`,{
            method: "PUT",
            body: JSON.stringify(task)
        })
        .then(result => {
            this.getData();
        })
        .catch(error => {
            // TODO: Inform the user about the error
            console.error("Error when setting done: ", error);
        })
    }
    
    handleLogout(event) {
        this.Auth.logout()
    }

    render() {

        if (localStorage.getItem("token") === "undefined" || !localStorage.getItem("token") ) {
            return( <Login/>  )               
        
        }

        // TODO: This app should render a Login component when the user
        // TODO: is not logged in.
        // TODO: Otherwise is should render the list as usual.

        // TODO: Create a Login component

        return (
            <div className="container">
                <div className="row">

                    <div className="col-sm" />
                    <div className="col-sm-8">
                        <h4 className="display-4">ToDo List</h4>
                        <br />
                        <List todoList={this.state.todoList} setDone={this.setDone}/>
                        <br/>
                        <AddTask addTask={this.addTask}/>
                        <br />
                        <form>
                            <button type="submit" onClick={this.handleLogout}>LOGOUT</button>
                        </form>
                    </div>
                    <div className="col-sm" />
                </div>
            </div>
        );
    }
}

export default App;
