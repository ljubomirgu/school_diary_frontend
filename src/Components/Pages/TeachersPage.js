import React, { Component } from 'react';
import Gradings from '../TeacherAsUser/Gradings';
import Profile from '../TeacherAsUser/Profile';
import ProfileEdit from '../TeacherAsUser/ProfileEdit';
import Subjects from '../TeacherAsUser/Subjects';
import DepartsAndSubjects from '../TeacherAsUser/DepartsAndSubjects';

import './studentUser.css'

class TeachersPage extends Component {
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
            dateOfEmployment: '',
            vocation: '',
            selectedTeacher: null,
            isProfileClick: false,
            isProfileEditClick: false,
            userId: '',
            teacher: null,
            subjects: [],
            lectures: []
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
        const response = await fetch('/diary/teachers/' + this.props.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        const response1 = await fetch('/diary/subjects/teacher/' + this.props.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        const response2 = await fetch('/diary/lectures/by-teacher/' + this.props.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

       if (response.ok && response1.ok && response2.ok) {
         
            const teacher = await response.json();
            const subjects = await response1.json();
            const lectures= await response2.json();
            this.setState({ teacher, subjects,lectures, isLoading: false })
            console.log(this.state.teacher)
            console.log(this.state.subjects)
            console.log(this.state.lectures)

        } else {
            this.setState({ isLoading: false, isError: true })
            console.log("noMount")
        }

    }

    handleProfileEdit = () => { this.setState({ isProfileEditClick: true, isProfileClick: false, selectedTeacher: this.props.user, targetPage: '' }) }
    handleCancelProfileEdit = () => { this.setState({ selectedTeacher: null, isProfileEditClick: false, isProfileClick: true }) }

    handleProfileChange = (e) => {
        console.log(e.target.value)
        this.setState({
            selectedTeacher: {
                ...this.state.selectedTeacher,
                [e.target.name]: e.target.value

            }

        })
    }

    handleProfileEditSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/diary/teachers/' + this.props.userId, {
            method: 'PUT',

            body: JSON.stringify(this.state.selectedTeacher),
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
        this.setState({ selectedTeacher: null })
        console.log(" punjenja adminsa")

        if (!response.ok) {
            alert("Faild. The edit is not succeeded.")
        }
    }

    handleCloseSubjects = () => this.setState({ targetPage: '' })
    handleDepartsClose = () => { this.setState({ isProfileClick: false, targetPage: '' }) }

    handleCloseBack= () => this.setState({targetPage:''})

    render() {
        return (
            <div className="admin-bg">
                <header>
                    <div className="wellcomeStudent">Wellcome to E-School Diary</div>
                    <button className="logout" onClick={(e) => this.handleLogOut(e)}>Sign out [{this.props.firstName}]</button>
                    <button className="logout" style={{ float: "left" }} value="profile" onClick={(e) => this.handlePageChange(e)}>Profile</button>
{/*                     <button className="grades" value="subjects" onClick={(e) => this.handlePageChange(e)} >Subjects</button>
                    <button className="grades" value="departs" onClick={(e) => this.handlePageChange(e)} >Departments</button> */}
                    <button className="grades" value="departsAndSubjects" onClick={(e) => this.handlePageChange(e)} >Departments and subjects</button>
{/*                     <button className="grades" value="grading" onClick={(e) => this.handlePageChange(e)} >Grading</button> */}
                </header>


                {this.state.isProfileEditClick &&
                    <ProfileEdit
                        {...this.state.selectedTeacher}
                        vocation={this.state.vocation}
                        dateOfEmployment={this.state.dateOfEmployment}
                        handleProfileClose={this.handleProfileClose}
                        onChange={this.handleProfileChange}
                        handleCancelProfileEdit={this.handleCancelProfileEdit}
                        handleProfileEditSubmit={this.handleProfileEditSubmit}
                    />
                }

                {this.state.targetPage === 'profile' &&
                    <Profile
                        user={this.state.teacher}
                        username={this.props.username}
                        handleProfileClose={this.handleProfileClose}
                        password={this.props.password}
                        userId={this.props.userId}
                        targetPage={this.state.targetPage}
                    />
                }
                {this.state.targetPage === 'grades' &&
                    <Gradings
                        user={this.props.user}
                        username={this.props.username}
                        password={this.props.password}
                        handleGradesClose={this.handleGradesClose}
                        targetPage={this.state.targetPage}
                    />}

                {this.state.targetPage === 'subjects' &&
                    <Subjects
                        subjects={this.state.subjects}
                        user={this.props.user}
                        username={this.props.username}
                        password={this.props.password}
                        handleDepartsClose={this.handleDepartsClose}
                        targetPage={this.state.targetPage}
                        handleCloseSubjects={this.handleCloseSubjects}
                    />}

                {this.state.targetPage === 'departsAndSubjects' &&
                    <DepartsAndSubjects
                        lectures={this.state.lectures}
                        subjects={this.state.subjects}
                        user={this.props.user}
                        teacher={this.state.teacher}
                        username={this.props.username}
                        password={this.props.password}
                        handleDepartsClose={this.handleDepartsClose}
                        targetPage={this.state.targetPage}
                        handleCloseBack={this.handleCloseBack}
                    />}

            </div>

        )
    }

}
export default TeachersPage