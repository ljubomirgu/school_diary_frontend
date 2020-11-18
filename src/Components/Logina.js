import React, { Component } from 'react';
import './login.css';
import schoolCover from './Photos/schoolCover.jpg'


class Logina extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }

    
// da li treba ovo:
    handleSubmit = (event) => {
        console.log("Form data submitted.")
        event.preventDefault();
    }

    render(){
        return (
          
           <div className="bg-img" >
                <h1 className="loginH1">E - school diary</h1>
                <div className="center" style={{ marginTop: "20%" }}>
                    <form className="loginForma">
                        <label htmlFor='username'><strong>Username </strong></label>
                        <input
                            type='text'
                            name='username'
                            value={this.props.username}
                            placeholder='Enter username'
                            onChange={this.props.onChange}
                        />
                        <br />
                        <label htmlFor='password'><strong>Password </strong></label>
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


                </div>
            </div>
        )
    }
}

export default Logina;