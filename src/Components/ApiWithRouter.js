import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import StudentsPage from './Pages/StudentsPage'
import TeachersPage from './Pages/TeachersPage'
import ParentsPage from './Pages/ParentsPage'
import AdministartorsPage from './Pages/AdministratorsPage'
import NotFoundPage from './Pages/NotFoundPage'
import LoginPage from './Pages/LoginPage'
import PrivateRoute from '../Components/PrivateRoute'


class AppWithRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false,
            loggedUser: null
        }
    }

    handleLogin = (user) => {
      //  this.setState({isLoggedIn: true}, history.pushState('/students'))
        this.setState({isLoggedIn: true, loggedUser: user})

    }


    render() {
        return(
        <BrowserRouter>
            <>
                <div className="navigation">
                    <Link to="/students"> Students </Link>
                    <Link to="/teachers"> Teachers </Link>
                    <Link to="/parents"> Parents </Link>
                    <Link to="/administrators"> Administrators </Link>
                </div>
                <Switch>
                    <Route
                    path="/login"
                    render={ (props) => <LoginPage {...props} onLogin={this.handleLogin} />}
                    />
                    <PrivateRoute 
                         isLoggedIn={this.state.isLoggedIn}
                         isAuthorized={this.state.role === "ROLE_STUDENT"} //da li treba userRole, kao u Dnevnik, ili role kao u json??????
                         path="/students" 
                         render={(props) => <StudentsPage {...props}
                            userId={this.state.userId} username={this.state.username}
                            password={this.state.password} role={this.state.role} />}
                        // component={StudentsPage} 
                    />
                    <PrivateRoute 
                        isLoggedIn={this.state.isLoggedIn}
                        isAuthorized={this.state.role === "ROLE_TEACHER"}
                        path="/teachers" 
                        render={(props) => <TeachersPage {...props} username={this.state.username}  password={this.state.password} />}
                       // component={TeachersPage} 
                    />
                    <PrivateRoute
                        isLoggedIn={this.state.isLoggedIn}
                        isAuthorized={this.state.role === "ROLE_PARENT"}
                        path="/parents" 
                        render={(props) => <ParentsPage {...props} username={this.state.username}  password={this.state.password} />}
                        //component={ParentsPage} 
                     />
                    <PrivateRoute 
                        isLoggedIn={this.state.isLoggedIn}
                        isAuthorized={this.state.role === "ROLE_ADMIN"}
                        path="/administrators" 
                        render={(props) => <AdministartorsPage {...props} username={this.state.username}  password={this.state.password} />}
                        //component={AdministratorsPage} 
                    />
                    <Route component={NotFoundPage} />

                </Switch>
            </>
        </BrowserRouter>
        )
    }

}

export default AppWithRouter