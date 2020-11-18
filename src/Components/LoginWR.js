import React, { Component } from 'react';
import './login.css';



class LoginWR extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            
            firstName:'',
            lastName:'',
            jmbg:'',
            dateOfBirth:'',
            phoneNumber:'',
            accountId:''
        };
    }


//višak:
    handleSubmit = (event) => {
        console.log("Form data submitted.")
        event.preventDefault();
    }

//show pass:
    myFunction = (e) => {        
            if (document.getElementById("pass").type === "password") {
              document.getElementById("pass").type = "text";
            } else {
              document.getElementById("pass").type = "password";
            }
        }


    render() {

        return (
            <div className="bg-img">
                <h1 className="loginH1" style={{ marginTop: "5%" }}>E - School Diary</h1>
                <div className="center" style={{ marginTop: "7%" }}>
                    <form className="loginForma">
                        <label htmlFor='username' className="fildsName">Username</label>
                        <input
                            type='text'
                            name='username'
                            value={this.props.username}
                            placeholder='Enter username'
                            onChange={this.props.onChange}
                            className="loginStyl"
                        />
                        <br />
                        <label htmlFor='password' className="fildsName" >Password</label>
                        <input
                            type='password'
                            name='password'
                            value={this.props.password}
                            placeholder='Enter password'
                            onChange={this.props.onChange}
                            id="pass"
                            className="loginStyl"
                        />

                        <label htmlFor='checkbox'>Show Password</label>
                        <input type="checkbox" name="checkbox" onClick={(e) => this.myFunction(e)} />

                        <br /><br />
                        <input type='button' onClick={this.props.onLoginSubmit} value='Log in' />
                    </form>
                </div>
                <div className="marquee">
                   <p>This is &Beta; version of <span style={{fontStyle:"italic", color:"white"}}> ESD </span>app...</p>
                </div>
            </div>
        )
    }
}

export default LoginWR;