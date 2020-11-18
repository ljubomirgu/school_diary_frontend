import React, { Component } from 'react';
import ProfileEdit from '../ParentAsUser/ProfileEdit'
//import './styls.css'
//import '../Table.css'
import './studentUser.css'
import Profile from '../ParentAsUser/Profile'
import Students from '../ParentAsUser/Students'
import Children from '../ParentAsUser/Children'

class ParentsPage extends Component {
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
            email: '',
            selectedParent: null,
            isProfileClick: false,
            isProfileEditClick: false,
            userId: '',
            parent: null,
            student: null,
            students: []
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
        const response = await fetch('/diary/parents/' + this.props.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        const response1 = await fetch('/diary/students/by-parent/' + this.props.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok && response1.ok) {
            const parent = await response.json();
            const students = await response1.json();
            this.setState({ parent, students, isLoading: false })
            console.log(this.state.parent)
        } else {
            this.setState({ isLoading: false, isError: true })
            console.log("no mount")
        }

    }

    handleProfileEdit = () => { this.setState({ isProfileEditClick: true, isProfileClick: false, selectedParent: this.props.user, targetPage: '' }) }
    handleCancelProfileEdit = () => { this.setState({ selectedParent: null, isProfileEditClick: false, isProfileClick: true }) }

    handleProfileChange = (e) => {
        console.log(e.target.value)
        this.setState({
            selectedParent: {
                ...this.state.selectedParent,
                [e.target.name]: e.target.value

            }

        })
    }

    handleProfileEditSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/diary/parents/' + this.props.userId, {
            method: 'PUT',

            body: JSON.stringify(this.state.selectedParent),
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
        this.setState({ selectedParent: null })
        console.log(" punjenja adminsa")

        if (!response.ok) {
            alert("Faild. The edit is not succeeded.")
        }
    }

    handleCloseChildren = () => this.setState({ targetPage: ''})
    handleCloseAllGrades = () => this.setState({targetPage:''})

    render() {
        return (
            <div className="admin-bg">
                <header>
                    <div className="wellcomeStudent">Wellcome to E-School Diary</div>
                    <button className="logout" onClick={(e) => this.handleLogOut(e)}>Sign out [{this.props.firstName}]</button>
                    <button className="logout" style={{ float: "left" }} value="profile" onClick={(e) => this.handlePageChange(e)}>Profile</button>
                    <button className="grades" value="grades" onClick={(e) => this.handlePageChange(e)} >All grades</button>
                    <button className="grades" value="children" onClick={(e) => this.handlePageChange(e)} >Students</button>
                </header>


                {this.state.isProfileEditClick &&
                    <ProfileEdit
                        {...this.state.selectedParent}
                        email={this.state.email}
                        handleProfileClose={this.handleProfileClose}
                        onChange={this.handleProfileChange}
                        handleCancelProfileEdit={this.handleCancelProfileEdit}
                        handleProfileEditSubmit={this.handleProfileEditSubmit}
                    />
                }

                {this.state.targetPage === 'profile' &&
                    <Profile
                        user={this.state.parent}
                        username={this.props.username}
                        handleProfileClose={this.handleProfileClose}
                        password={this.props.password}
                        userId={this.props.userId}
                        targetPage={this.state.targetPage}
                    />
                }
                {this.state.targetPage === 'grades' &&
                    <Students
                        students={this.state.students}
                        user={this.props.user}
                        username={this.props.username}
                        password={this.props.password}
                        handleGradesClose={this.handleGradesClose}
                        targetPage={this.state.targetPage}
                        handleCloseAllGrades={this.handleCloseAllGrades}
                    />}

                {this.state.targetPage === 'children' &&
                    <Children
                        students={this.state.students}
                        user={this.props.user}
                        username={this.props.username}
                        password={this.props.password}
                        handleGradesClose={this.handleGradesClose}
                        targetPage={this.state.targetPage}
                        handleCloseChildren={this.handleCloseChildren}
                    />}

            </div>

        )
    }

}
export default ParentsPage