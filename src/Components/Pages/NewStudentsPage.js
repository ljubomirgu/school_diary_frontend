import React, { Component } from 'react';
import Profile from '../StudentAsUser/Profile';
import ProfileEdit from '../StudentAsUser/ProfileEdit';
import Grades from '../StudentAsUser/Grades'
//import './styls.css'
//import '../Table.css'
import './studentUser.css'

class StudentsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: '',
            username: '',
            password: '',
            isLoggedIn: false,
            loggedUser: null,
            targetPage: '',
            user: '',
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            dateEntered: '',
            selectedStudent: null,
            isProfileClick: false,
            isProfileEditClick: false,
            userId: '',
            student: null
        }
    }

    handlePageChange = (e) => {
        this.setState({
            targetPage: e.target.value
        })
    }
    handleLogin = (user) => {
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

    handleLogOut = (e) => {
        this.setState({ isLoggedIn: false, username: '', password: '' })
        window.location.reload();
    }

    handleProfileClose = () => { this.setState({ isProfileClick: false, targetPage: '' }) }//brisati
    handleGradesClose = () => { this.setState({ isProfileClick: false, targetPage: '' }) }//brisati

    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/students/' + this.props.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const student = await response.json();
            this.setState({ student, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            console.log("noMount")
        }

    }

    handleProfileEdit = () => { this.setState({ isProfileEditClick: true, isProfileClick: false, selectedStudent: this.props.user, targetPage: '' }) }
    handleCancelProfileEdit = () => { this.setState({ selectedStudent: null, isProfileEditClick: false, isProfileClick: true }) }

    handleProfileChange = (e) => {
        console.log(e.target.value)
        this.setState({
            selectedStudent: {
                ...this.state.selectedStudent,
                [e.target.name]: e.target.value

            }

        })
    }

    handleProfileEditSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/diary/students/' + this.props.userId, {
            method: 'PUT',

            body: JSON.stringify(this.state.selectedStudent),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        console.log("pre punjenja ")
        this.componentDidMount()
        this.setState({ isProfileClick: true, isProfileEditClick: null });
        console.log("pre  atudents")
        this.setState({ selectedStudent: null })
        console.log(" punjenja adminsa")

        if (!response.ok) {
            alert("Faild. The edit is not succeeded.")
        }
    }


    render() {
        return (
            <div className="admin-bg">
                <header>
                    <div className="wellcomeStudent">Wellcome to E-School Diary</div>     
                    <button className="logout"  onClick={(e) => this.handleLogOut(e)}>Sign out [{this.props.firstName}]</button>
                    <button className="logout"  style={{float:"left"}} value="profile" onClick={(e) => this.handlePageChange(e)}>Profile</button>
                    <button className="grades"  value="grades" onClick={(e) => this.handlePageChange(e)} >Grades</button>
                </header>
               

                    {this.state.isProfileEditClick &&
                        <ProfileEdit
                            {...this.state.selectedStudent}
                            note={this.state.note}
                            dateEntered={this.state.dateEntered}
                            handleProfileClose={this.handleProfileClose}
                            onChange={this.handleProfileChange}
                            handleCancelProfileEdit={this.handleCancelProfileEdit}
                            handleProfileEditSubmit={this.handleProfileEditSubmit}
                        />
                    }

                    {this.state.targetPage === 'profile' &&
                        <Profile
                            user={this.state.student}
                            username={this.props.username}
                            handleProfileClose={this.handleProfileClose}
                            password={this.props.password}
                            userId={this.props.userId}
                            targetPage={this.state.targetPage}
                        />
                    }
                    {this.state.targetPage === 'grades' &&
                        <Grades
                            user={this.props.user}
                            username={this.props.username}
                            password={this.props.password}
                            handleGradesClose={this.handleGradesClose}
                            targetPage={this.state.targetPage}
                        />}
                
            </div>

        )
    }

}
export default StudentsPage