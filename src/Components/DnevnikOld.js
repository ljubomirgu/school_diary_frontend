import React, { Component } from 'react';
import TableOfAdmins from './Admins/TableOfAdmins'
import TableOfParents from './Parents/TableOfParents';
import TableOfStudents from './Students/TableOfStudents';
import TableOfTeachers from './Teachers/TableOfTeachers';
import TableOfYears from './Years/TableOfYears';
import TableOfClasses from './SchoolClass/TableOfClasses';
import TableOfSubjects from './Subjects/TableOfSubjects';



import Logina from './Logina'
import Login from './Login'

//const history = new BrowserHistory;

class DnevnikOld extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: '',
            username: '',
            password: '',
            isLoggedIn: false,
            loggedUser: null,
            targetPage: ''
        }
    }



    handleLogin = (user) => {
        //  this.setState({isLoggedIn: true}, history.pushState('/students'))
        this.setState({ isLoggedIn: true, loggedUser: user })

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

    handleLogOut = () => {
        this.setState({ isLoggedIn: false })
    }

    ////////////:
    handlePageChange = (e) =>{
        this.setState({
            targetPage: e.target.value
        })
    }



    render() {
        return this.state.isLoggedIn ? (
            <div>{/*
                <select onChange={(e) => this.handleUserChange(e)}>
                    <option value='student'>Student</option>
                    <option value='teacher'>Teacher</option>
                    <option value='parent'>Parent</option>
                    <option value='administrator'>Admin</option>                    
                </select>
                <div>
                    {this.state.userRole === 'student' && <TableOfStudents username={this.state.username}
                        password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.userRole === 'teacher' && <TableOfTeachers username={this.state.username}
                        password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.userRole === 'parent' && <TableOfParents username={this.state.username}
                        password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.userRole === 'administrator' && <TableOfAdmins username={this.state.username}
                        password={this.state.password} handleLogOut={this.handleLogOut} />}
                </div>

            ****************************************************** */}
                <select onChange={(e) => this.handlePageChange(e)}>
                    <option value='student'>Student</option>
                    <option value='teacher'>Teacher</option>
                    <option value='parent'>Parent</option>
                    <option value='administrator'>Admin</option> 
                    <option value='year'>Year</option>
                    <option value='schoolClass'>Class</option>
                    <option value='subject'>Subject</option>
                </select>
                <div>
                    {this.state.targetPage === 'student' && <TableOfStudents username={this.state.username}
                        password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.targetPage === 'teacher' && <TableOfTeachers username={this.state.username}
                        password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.targetPage === 'parent' && <TableOfParents username={this.state.username}
                        password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.targetPage === 'administrator' && <TableOfAdmins username={this.state.username}
                        password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.targetPage === 'year' && <TableOfYears username={this.state.username}
                        password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.targetPage === 'schoolClass' && <TableOfClasses username={this.state.username}
                        password={this.state.password} handleLogOut={this.handleLogOut} />}
                    {this.state.targetPage === 'subject' && <TableOfSubjects username={this.state.username}
                        password={this.state.password} handleLogOut={this.handleLogOut} />}
                </div>
            </div>


        ) : (
                <Login
                    username={this.state.username}
                    password={this.state.password}
                    onChange={this.handleLoginChange}
                    onLoginSubmit={this.handleLoginSubmit}

                />
            )
    }
}

export default DnevnikOld;
