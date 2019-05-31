import React, { Component } from 'react'
import AuthService from './AuthService';

export default class Login extends Component {
    API_URL = 'http://localhost:8080/api';
    constructor(props) {
        super(props)

        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);

        this.state = {
            // TODO: This needs to come from a Login component.
            username: "",
            password: ""
        }

        this.handleLoginInput = this.handleLoginInput.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
    }

    componentDidMount() {
        console.log("App component has mounted");

        // TODO: Move this to a Login component
        this.Auth.login(
            this.state.username,
            this.state.password
        )
            .then(response => {
                console.log("Authentication:", response.msg);
                this.getData();
            })
            .catch(error => {
                // TODO: Inform the user about the error
                console.error("Error authenticating:", error);
            });
    }


    onChangeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    handleLoginInput(event) {
        this.Auth.login(this.state.username, this.state.password)
    }



    render() {
        return (
            <div>
                <form>
                    <label>Username</label>
                    <input onChange={this.onChangeUsername} placeholder="Username..." />

                    <label>Password</label>
                    <input onChange={this.onChangePassword} placeholder="Password..." />

                    <button type="submit" onClick={this.handleLoginInput}>LOGIN</button>


                </form>
                <h1> HEJ </h1>
            </div>
        )
    }
}
