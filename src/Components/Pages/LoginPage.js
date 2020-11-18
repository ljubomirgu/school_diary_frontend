import React, { Component } from 'react'
import '../login.css'

export class LoginPage extends Component {
constructor(props){
    super(props)
    this.state = {
        user: null,
        username: '',
        password: ''
    }
}

    callBackLogin = () => {
        this.props.onLogin(this.state.user)
        //this.props.history.push('/students')
        console.log(this.state)
        if (this.state.user.role === 'ROLE_ADMIN') {
            console.log(this.state.user.role)
            this.props.history.push('/administrators')
           
        }
        else if (this.state.user.role === 'ROLE_TEACHER') {
            console.log(this.state.user.role)
            this.props.history.push('/teachers')
        }
        else if (this.state.user.role === 'ROLE_STUDENT') {
            console.log(this.state.user.role)
            this.props.history.push('/students')
        }
        else {
            console.log(this.state.user.role)
            this.props.history.push('/parents')
        }
    
    }

    handleLoginChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleLogin = async (event) => {
        event.preventDefault()
        const response = await fetch('/diary/login', {
            method: 'POST',
            body: JSON.stringify({username:"admin", password:"aaaaa", role:"rrrr", userId:2}),
            headers:{
                'Authorization': 'Basic ' + window.btoa(this.state.username + ":" + this.state.password),
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        if (response.ok) {
            const user = await response.json();
            this.setState({user: {...user}})
            console.log(this.state.user)            
            console.log(this.props)
            this.callBackLogin()
            console.log("aaaaa")

        } else {
            this.setState({
                isError: true
            })
        }
    }


    render(){
        return(
            <div className="bg-img">
            <h1 className="loginH1">E - school diary</h1>
            <div className="center" style={{ marginTop: "10%" }}>
                <form className="loginForma">
                    <label htmlFor='username'className="fildsName">Username</label>
                    <input
                        type='text'
                        name='username'
                        value={this.state.username}
                        placeholder='Enter username'
                        onChange={this.handleLoginChange}
                    />
                    <br />
                    <label htmlFor='password' className="fildsName">Password</label>
                    <input
                        type='password'
                        name='password'
                        value={this.state.password}
                        placeholder='Enter password'
                        onChange={this.handleLoginChange}
                    />                      
                    <br /><br />
                    <input type='button' onClick={this.handleLogin} value='Log in' />
                </form>

                
                // <button onClick={this.props.onLogin}>Log in</button>
            <button onClick={this.handleLogin}>Log in</button>
        
            </div>
        </div>


          

        
        )
    }

}
export default LoginPage