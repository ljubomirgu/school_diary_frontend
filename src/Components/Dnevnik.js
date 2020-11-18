import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link, history} from 'react-router-dom'
//import { BrowserRouter, Switch, Route, Link, BrowserHistory} from 'react-router-dom'
import StudentsPage from './Pages/StudentsPage'
import TeachersPage from './Pages/TeachersPage'
import ParentsPage from './Pages/ParentsPage'
import AdministartorsPage from './Pages/AdministratorsPage'
import NotFoundPage from './Pages/NotFoundPage'
import LoginPage from './Pages/LoginPage'
import PrivateRoute from '../Components/PrivateRoute'


import Logina from './Logina'
import Login from './Login'

//const history = new BrowserHistory;

class Dnevnik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: '',
            username: '',
            password: '',
            isLoggedIn: false,
            loggedUser: null
        }
    }

    

    handleLogin = (user) => {
        //  this.setState({isLoggedIn: true}, history.pushState('/students'))
          this.setState({isLoggedIn: true, loggedUser: user})
  
      }

    handleUserChange = (e) => {
        this.setState({
            userRole: e.target.value
        })
        console.log(this.state);
    }

    handleLoginChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleLoginSubmit = (e) => {
        e.preventDefault()
        this.setState({ isLoggedIn: true })
       
    }

    handleLogOut = () =>{
        this.setState({isLoggedIn: false})
    }



    render() {
        return this.state.isLoggedIn ? (
           /* <div>
                <select onChange={(e) => this.handleUserChange(e)}>
                    <option value='student'>Student</option>
                    <option value='teacher'>Teacher</option>
                    <option value='parent'>Parent</option>
                    <option value='administrator'>Admin</option>
                    <option value='year'>Year</option>
                </select>
                <div>
                    {this.state.userRole === 'student' && <TableOfStudents  username={this.state.username}
                    password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.userRole === 'teacher' && <TableOfTeachers username={this.state.username}
                    password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.userRole === 'parent' && <TableOfParents username={this.state.username}
                    password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.userRole === 'administrator' && <TableOfAdmins username={this.state.username}
                    password={this.state.password} handleLogOut={this.handleLogOut} />}
                </div>
            </div>
            */
           <BrowserRouter     >
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
                    render={ (props) => <LoginPage {...props} onLogin={ user => this.handleLogin(user)} />}
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

        ) : (
                <LoginPage
                    username={this.state.username}
                    password={this.state.password}
                    onChange={this.handleLoginChange}
                   // onLoginSubmit={this.handleLoginSubmit}
                      onLogin={this.handleLogin}

                />
            )
    }
}

export default Dnevnik;
