import React, { Component } from 'react';
import Profile from '../StudentAsUser/Profile';
import ProfileEdit from '../StudentAsUser/ProfileEdit';
import Grades from '../StudentAsUser/Grades'
import './styls.css'
import '../Table.css'

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
            user:'',
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            dateEntered: '',
            selectedStudent: null,
            isProfileClick: false,
            isProfileEditClick: false,
            userId: '',
            student:null
        }
    }

    handlePageChange = (e) => {
        this.setState({
            targetPage: e.target.value
        })
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

    handleLogOut = (e) => {
        this.setState({ isLoggedIn: false, username: '', password: '' })
        window.location.reload();
    }

    handleProfileClose = () => { this.setState({ isProfileClick: false, targetPage: '' }) }//brisati
    handleGradesClose = () => { this.setState({ isProfileClick: false, targetPage: '' }) }//brisati

    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/students/'+this.props.userId,
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
        //let jsons = {userId: this.state.userId, firstName: this.state.firstName, lastName:this.state.lastName, 
        //  jmbg: this.state.jmbg, dateOfBirth: this.state.dateOfBirth,phoneNumber: this.state.phoneNumber}
        const response = await fetch('/diary/students/' + this.props.userId, {
            method: 'PUT',
            // body: JSON.stringify(jsons),
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
                <div style={{ position: "fixed", width: "100%" }}>
                    <div className="wellcomeStudent">Wellcome to E-School Diary</div>
                </div>
                <div style={{ position: "fixed", width: "100%", marginTop: "58px", backgroundColor:"rgb(24, 25, 29)", height:"40px" }}>
                    <button className="logout" style={{ width:"15%", fontSize:"20px"}} onClick={(e) => this.handleLogOut(e)}>Sign out [{this.props.firstName}]</button>
                    <button className="profile" style={{ width:"12%", fontSize:"20px"}} value="profile" onClick={(e) => this.handlePageChange(e)}>Profile</button>
                    <button  className="gradesStyl" style={{ width:"12%", fontSize:"20px"}} value="grades" onClick={(e) => this.handlePageChange(e)} >Grades</button>
                </div>
                <div >
                    <div className="center">
                        {
                            this.state.isProfileEditClick &&
                            <ProfileEdit
                                {...this.state.selectedStudent}
                                note={this.state.note}
                                dateEntered={this.state.dateEntered}
                                handleProfileClose={this.handleProfileClose}
                                onChange={this.handleProfileChange}
                                handleCancelProfileEdit={this.handleCancelProfileEdit}
                                handleProfileEditSubmit={this.handleProfileEditSubmit}                             
                            />
                        }</div>


 {/*                    {this.state.targetPage === 'student' && <TableOfStudents username={this.props.username}
                        password={this.props.password} user={this.props.user} />}
                    {this.state.targetPage === 'teacher' && <TableOfTeachers username={this.props.username}
                        password={this.props.password} user={this.props.user} />}
                    {this.state.targetPage === 'parent' && <TableOfParents username={this.props.username}
                        password={this.props.password} user={this.props.user} />}
                    {this.state.targetPage === 'administrator' && <TableOfAdmins username={this.props.username}
                        password={this.props.password} user={this.props.user} />}
                    {this.state.targetPage === 'year' && <TableOfYears username={this.props.username}
                        password={this.props.password} user={this.props.user} />}
                    {this.state.targetPage === 'schoolClass' && <TableOfClasses username={this.props.username}
                        password={this.props.password} user={this.props.user} />}
                    {this.state.targetPage === 'subject' && <TableOfSubjects username={this.props.username}
                        password={this.props.password} handleLogOut={this.handleLogOut} user={this.props.user} />} */}


                    {this.state.targetPage === 'profile' &&
                        <Profile
                            user={this.state.student}
                            /* firstName={this.props.firstName}
                            lastName={this.props.firstName}
                            jmbg={this.props.jmbg}
                            dateOfBirth={this.props.dateOfBirth}
                            phoneNumber={this.state.phoneNumber} 
                            handleProfileEdit={this.handleProfileEdit}*/
                            username={this.props.username}
                            handleProfileClose={this.handleProfileClose}
                            password={this.props.password}
                            userId={this.props.userId}
                            targetPage={this.state.targetPage}
                        />
                    }
                    {this.state.targetPage ==='grades' && 
                        <Grades 
                        user={this.props.user}
                        username={this.props.username}
                        password={this.props.password}
                        handleGradesClose={this.handleGradesClose}
                        targetPage={this.state.targetPage}
                    />}
                </div>
            </div>

        )
    }




    /*
        render(){
            return(
                <div>Students page.</div>
            
            )
        }
    */
}
export default StudentsPage