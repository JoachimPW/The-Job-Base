import React, { Component } from 'react'
import AuthService from './AuthService';

export default class Login extends Component {
    API_URL = 'http://localhost:8080/api';
    constructor(props) {
        super(props)

        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
        this.Signup = new AuthService(`${this.API_URL}/users/create`)

        this.state = {
            // TODO: This needs to come from a Login component.
            username: "",
            password: ""
        }

        this.handleLoginInput = this.handleLoginInput.bind(this)
        this.handleSignupInput = this.handleSignupInput.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        
    }

    componentDidMount() {
        console.log("App component has mounted");
        // TJEK OM TOKEN ER UDLØBET
        // TODO: Move this to a Login component       
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
        event.preventDefault()
        this.props.loginToApp(this.state.username, this.state.password)       
        console.log(this.state.username, this.state.password)
    }

    handleSignupInput(event) {
        event.preventDefault()
        this.Signup.signup(this.state.username, this.state.password)
    }

    render() {
        return (
            <React.Fragment>
            <div className="col-md-6">
                <form autoComplete="off">
                    <div className="form-group">
                        <label for="Email">Company</label>
                        <input value={this.state.username} onChange={this.onChangeUsername} 
                            className="form-control" placeholder="Enter Username" />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input value={this.state.password} onChange={this.onChangePassword} type="password"
                            className="form-control" placeholder="Password" />
                            <p>{this.props.res}</p>
                    </div>
                    <button type="submit" onClick={this.handleLoginInput} className="btn btn-primary">Login</button>
                    <button onClick={this.handleSignupInput} style={{ marginLeft: "25px" }} className="btn btn-success">Signup</button>
                </form>

            </div>
          
            </React.Fragment>
        )
    }
}
