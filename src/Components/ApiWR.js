import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import StudentsPage from './Pages/StudentsPage'
import TeachersPage from './Pages/TeachersPage'
import ParentsPage from './Pages/ParentsPage'
import AdministartorsPage from './Pages/AdministratorsPage'
import NotFoundPage from './Pages/NotFoundPage'
//import LoginPage from './Pages/LoginPage'
import PrivateRoute from '../Components/PrivateRoute'
import DashboardWR from './DashboardWR'
//port LoginWR from './LoginWR'

import NewStudentsPage from './Pages/NewStudentsPage'

class ApiWR extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,            

         /*   userId:'',
            username: '',
            password: '',
            role: '',*/
        }
    }

    handleLogin = (user) => { // user je account
        this.setState({
            ...user
        })
    }

    handleUserChange = (e) => {
        this.setState({
            userRole: e.target.value
        })
    }

    handleLogOut = () => {
        this.setState({ isLoggedIn: false })
    }

    render() {
          return (
      //  return this.state.isLoggedIn ? (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact path='/'
                        render={(props) =>
                            <DashboardWR {...props} onLogin={this.handleLogin} />}
                    />
                    <PrivateRoute
                        isLoggedIn={this.state.isLoggedIn}
                        isAuthorized={this.state.role === "ROLE_ADMIN"}
                        path='/administrators'
                        render={(props) => <AdministartorsPage {...props}
                            user={this.state.user}
                            userId={this.state.userId}
                            username={this.state.username}
                            password={this.state.password}
                            firstName={this.state.firstName}
                            
                            lastName={this.state.lastName}
                            jmbg={this.state.jmbg}
                            dateOfBirth={this.state.dateOfBirth}
                            phoneNumber={this.state.phoneNumber}
                            
                            />}
                    />
                    <PrivateRoute
                        isLoggedIn={this.state.isLoggedIn}
                        isAuthorized={this.state.role === "ROLE_STUDENT"}
                        path='/students'
                        render={(props) => <NewStudentsPage {...props}
                            userId={this.state.userId}
                            username={this.state.username}
                            password={this.state.password} 
                            firstName={this.state.firstName}
                            user={this.state.user}

                            lastName={this.state.lastName}
                            jmbg={this.state.jmbg}
                            dateOfBirth={this.state.dateOfBirth}
                            note={this.state.note}
                            dateEntered={this.state.dateEntered}
                            />}
                    />
                    <PrivateRoute
                        isLoggedIn={this.state.isLoggedIn}
                        isAuthorized={this.state.role === "ROLE_TEACHER"}
                        path='/teachers'
                        render={(props) => <TeachersPage {...props}
                            userId={this.state.userId}
                            username={this.state.username}
                            password={this.state.password} 
                            firstName={this.state.firstName}
                            user={this.state.user}

                            lastName={this.state.lastName}
                            jmbg={this.state.jmbg}
                            dateOfBirth={this.state.dateOfBirth}
                            vocation={this.state.vocation}
                            dateOfEmployment={this.state.dateOfEmployment}
                            />}
                    />
                    <PrivateRoute
                        isLoggedIn={this.state.isLoggedIn}
                        isAuthorized={this.state.role === "ROLE_PARENT"}
                        path='/parents'
                        render={(props) => <ParentsPage {...props}
                            userId={this.state.userId}
                            username={this.state.username}
                            password={this.state.password} 
                            firstName={this.state.firstName}
                            user={this.state.user}

                            lastName={this.state.lastName}
                            jmbg={this.state.jmbg}
                            dateOfBirth={this.state.dateOfBirth}
                            email={this.state.email}
                            />}
                    />
                    <Route component={NotFoundPage} />
                </Switch>
            </BrowserRouter>
        )/* : (
            < LoginWR
                userId = { this.state.userId }
                password = { this.state.password }
                username = { this.state.username }
                role = { this.state.role }
                onLoginSubmit = { this.handleLoginSubmit }
                onChange = { this.handleLoginChange }
            />
        )*/
    }

}
export default ApiWR