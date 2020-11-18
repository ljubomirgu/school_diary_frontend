import React, {Component} from 'react';
import LoginWR from './LoginWR';
//import ApiWR from './ApiWR';


 class DashboardWR extends Component{

    constructor(props) {
        super(props);
        this.state = {
            userId:'',
            username: '',
            password: '',
            role: '',
            isLoggedIn: false,
            isError: false,
            firstName:'',
            lastName:'',
            jmbg:'',
            dateOfBirth:'',
            phoneNumber:'',
            accountId:''
        }
    }

    
    handleLoginChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginSubmit = async (event) => {
        event.preventDefault()
        let jsons = { password: this.state.password};
        const response = await fetch('/diary/login', {
            method: 'POST',
            body: JSON.stringify(jsons),
            headers:{
                'Authorization': 'Basic ' + window.btoa(this.state.username + ":" + this.state.password),
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        if (response.ok) {
            const account = await response.json();
            this.props.onLogin({
                user:account.user,
                userId: account.user.userId,
                role: account.role,
                isLoggedIn: true,
                username: this.state.username,
                password: this.state.password,
                accountId: account.accountId, // ili this.state.accountId


                firstName: account.user.firstName,
                lastName: account.user.lastName,
                jmbg: account.user.jmbg,
                dateOfBirth: account.user.dateOfBirth,
                phoneNumber: account.user.phoneNumber// kada dodam i druge stranice moram dodati i ostale atribute
            })
            if (account.role === 'ROLE_ADMIN') {
                console.log(account.role)
                this.props.history.push({pathname: '/administrators'})
               
            }
            else if (account.role === 'ROLE_TEACHER') {
                console.log(account.role)
                this.props.history.push({pathname: '/teachers'})
            }
            else if (account.role === 'ROLE_STUDENT') {
                console.log(account.role)
                this.props.history.push({pathname:'/students'})
            }
            else {
                console.log(account.role)
                this.props.history.push({pathname: '/parents'})
            }

        } else {
            this.setState({
                username:'',
                password: '',
                isError: true              
                 })
             alert("Username or password is not valid!\nTry again.")
        }
    }

    render(){

        return(
            <LoginWR
                userId={this.state.userId}
                password={this.state.password}
                username={this.state.username}
                role={this.state.role}
                onLoginSubmit={this.handleLoginSubmit}
                onChange={this.handleLoginChange}

                firstName={this.state.firstName}
                lastName={this.state.lastName}
                jmbg={this.state.jmbg}
                dateOfBirth={this.state.dateOfBirth}
                phoneNumber={this.state.phoneNumber} // ostali atributi?
                accountId={this.state.accountId}
            />
        )
    }


 }
 export default DashboardWR;