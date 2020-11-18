import React, { Component } from 'react';
import './login.css';
//import schoolCover from './Photos/schoolCover.jpg'
import schoolCover from './Photos/classs.jpg'


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }

    
//višak:
    handleSubmit = (event) => {
        console.log("Form data submitted.")
        event.preventDefault();
    }

   

    render() {/*
        const loginStyle = {
            backgroundImage: `url("${schoolCover}")`,
            backgroundPosition: 'center',
            // width: '100%',
            // height: '400px',
            paddingTop: 201,
            backgroundSize: "cover",
            //  marginTop: "0%",
            //verticalAlign: "middle"

        };
*/
        return (
           // <div className="photo" style={loginStyle}>
           <div className="bg-img">
                <h1 className="loginH1">E - school diary</h1>
                <div className="center" style={{ marginTop: "10%" }}>
                    <form className="loginForma">
                        <label htmlFor='username'className="fildsName">Username</label>
                        <input
                            type='text'
                            name='username'
                            value={this.props.username}
                            placeholder='Enter username'
                            onChange={this.props.onChange}
                        />
                        <br />
                        <label htmlFor='password' className="fildsName">Password</label>
                        <input
                            type='password'
                            name='password'
                            value={this.props.password}
                            placeholder='Enter password'
                            onChange={this.props.onChange}
                        />                      
                        <br /><br />
                        <input type='button' onClick={this.props.onLoginSubmit} value='Log in' />
                    </form>

                    {/* 

            <table>
                <tr>
                   <td>Username</td>
                   <td><input
                    type='text'
                    name='username'
                    value={this.props.username}
                    placeholder='Enter username'
                    onChange={this.props.onChange}
                /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                    <input
                    type='password'
                    name='password'
                    value={this.props.password}
                    placeholder='Enter password'
                    onChange={this.props.onChange}
                />
                    </td>
                </tr>
                <tr>
                    <td colSpan="2" align="center">
                    <input type='button'  onClick={this.props.onLoginSubmit} value='Log in' />
                    </td>
                </tr>
            </table> */}


                </div>
            </div>
        )
    }
}

export default Login;