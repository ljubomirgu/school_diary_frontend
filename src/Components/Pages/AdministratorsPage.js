import React, { Component } from 'react';
import TableOfAdmins from '../Admins/TableOfAdmins'
import TableOfParents from '../Parents/TableOfParents';
import TableOfStudents from '../Students/TableOfStudents';
import TableOfTeachers from '../Teachers/TableOfTeachers';
import TableOfYears from '../Years/TableOfYears';
import TableOfClasses from '../SchoolClass/TableOfClasses';
import TableOfSubjects from '../Subjects/TableOfSubjects';
import './styls.css'
import LoginWR from '../LoginWR';
import Profile from '../Profile/Profile';
import ProfileEdit from '../Profile/ProfileEdit'
import Download from '../Download';


class AdministratorsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: '',
            username: '',
            password: '',
            isLoggedIn: false,
            loggedUser: null,
            targetPage: '',

            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            //phoneNumber: '',
            selectedAdmin: null,

            dateOfEmployment: '',
            isProfileClick: false,

            isDownloadLogClick: false,
            loggs: '',

            isProfileEditClick: false,
            userId: '',
            admins: []
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

    /* //call Profile:
        handleProfile = (e) => {
            e.preventDefault()
            this.setState({isProfileClick: true})
            return(
                <div>
                {this.state.isProfileClick &&           
                <Profile
                    firstName={this.props.firstName}
                    lastName={this.props.firstName}
                    jmbg={this.props.jmbg}
                    dateOfBirth={this.props.dateOfBirth}
                />}
                </div>
            
            )
        }
    */
    /*
     handleProfile = async (e) => {
        // this.setState({ isProfileClick: true });
         this.setState({
             targetPage: e.target.value
         })
         const response = await fetch('/diary/users/' + this.props.userId,
             {
                 method: 'GET',
                 headers: {
                     'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                     "Content-type": "application/json; charset=UTF-8"
                 }
             });
 
         if (response.ok) {
             const user = await response.json();
             console.log(user)
             this.setState({
                /*  phoneNumber: user.phoneNumber,
                 email: user.email,
                 note: user.note,
                 vocation: user.vocation,
                 dateEntered: user.dateEntered,
                 dateOfEmployment: user.dateOfEmployment */

    /*             })
            } else {
                alert("Something gone wrong!")
            }
    
        } */


    handleProfileClose = () => { this.setState({ isProfileClick: false, targetPage: '' }) }//brisati



    // zbog edita:
    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/administrators',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const admins = await response.json();
            this.setState({ admins, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            console.log("noMount")
            // this.props.handleLogOut();
        }

    }

    //edit profila: 

    handleProfileEdit = () => { this.setState({ isProfileEditClick: true, isProfileClick: false, selectedAdmin: this.props.user, targetPage: '' }) }
    handleCancelProfileEdit = () => { this.setState({ selectedAdmin: null, isProfileEditClick: false, isProfileClick: true }) }

    handleProfileChange = (e) => {
        console.log(e.target.value)
        this.setState({
            selectedAdmin: {
                ...this.state.selectedAdmin,
                [e.target.name]: e.target.value

            }

        })
    }

    handleProfileEditSubmit = async (e) => {
        e.preventDefault()
        //let jsons = {userId: this.state.userId, firstName: this.state.firstName, lastName:this.state.lastName, 
        //  jmbg: this.state.jmbg, dateOfBirth: this.state.dateOfBirth,phoneNumber: this.state.phoneNumber}
        const response = await fetch('/diary/administrators/' + this.props.userId, {
            method: 'PUT',
            // body: JSON.stringify(jsons),
            body: JSON.stringify(this.state.selectedAdmin),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        console.log("pre punjenja ")
        this.componentDidMount()
        this.setState({ isProfileClick: true, isProfileEditClick: null });
        console.log("pre  adminsa")
        this.setState({ selectedAdmin: null })
        console.log(" punjenja adminsa")




        /*
        console.log("pre punjenja adminsa")
        const admins = [...this.state.admins]
        console.log("posle punjenja adminsa")
        const index = admins.findIndex((admin) => admin.userId === this.props.userId)
        console.log("jos posle punjenja adminsa")
        admins.splice(index, 1, this.state.selectedStudent)
        console.log("najposle posle punjenja adminsa")
        this.setState({ admins,  isProfileClick: true })
        console.log("najposle posle punjenja adminsa")
        */

        if (!response.ok) {
            alert("Faild. The edit is not succeeded.")
        }

    }






    /*download:
     handleDownloadLog = () => {this.setState({isDownloadLogClick: true})}
    handleDownloadLogClose = () => { this.setState({ isDownloadLogClick: false }) }

    handleDownloadLog = async (e) => {
        this.setState({ isDownloadLogClick: true })
        e.preventDefault()
        console.log("downloaddddddddddddd")
        this.setState({ isLoading: true });
        const response = await fetch('/diary/administrators/downloadLogFile',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            const loggs = await response.json();
            //const loggs = await response.          
            this.setState({ loggs, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }

*/
    handleBack = () => {
        this.setState({ targetPage: '' })
    }
    render() {
        return (
            <div className="admin-bg">
                <div style={{ position: "fixed", width: "100%" }}>
                    <button className="logout" onClick={(e) => this.handleLogOut(e)}>Sign out [{this.props.firstName}]</button>
                    {/*                                           <button className="profile" value="profile" onClick={(e) => this.handleProfile(e)}>Profile</button>
 */}                      <button className="back" onClick={this.handleBack}><i className="fas fa-home"></i></button>
                    <button className="profile" value="profile" onClick={(e) => this.handlePageChange(e)}>Profile</button>


                    {/*                     <button className="loggFile" onClick={(e) => this.handleDownloadLog(e)}>Logg file</button>
 */}                    <div className="wellcome">Wellcome to E-School Diary</div>
                </div>

                <div style={{ position: "fixed", width: "100%", marginTop: "38px" }}>
                    <button className="tablink" value='administrator' onClick={(e) => this.handlePageChange(e)} >Admins</button>
                    <button className="tablink" value='parent' onClick={(e) => this.handlePageChange(e)}>Parents</button>
                    <button className="tablink" value='teacher' onClick={(e) => this.handlePageChange(e)}>Teachers</button>
                    <button className="tablink" value='student' onClick={(e) => this.handlePageChange(e)}>Students</button>
                    <button className="tablink" value='subject' onClick={(e) => this.handlePageChange(e)}>Subjects</button>
                    <button className="tablink" value='year' onClick={(e) => this.handlePageChange(e)}>Classes</button>
                    <button className="tablink" value='schoolClass' onClick={(e) => this.handlePageChange(e)}>Departments</button>
                    {/*                     <button className="tablink" value='grade' onClick={(e) => this.handlePageChange(e)}>Grades</button>
 */}            </div>
                <div >
                    {/*                     {
                        this.state.isProfileClick &&
                        <Profile
                            user={this.props.user}
                            firstName={this.props.firstName}
                            lastName={this.props.firstName}
                            jmbg={this.props.jmbg}
                            dateOfBirth={this.props.dateOfBirth}
                            phoneNumber={this.state.phoneNumber}
                            username={this.props.username}
                            password={this.props.password}
                            handleProfileEdit={this.handleProfileEdit}
                            handleProfileClose={this.handleProfileClose}
                            userId={this.props.userId}
                        />
                    } */}
                    <div className="center">
                        {
                            this.state.isProfileEditClick &&
                            <ProfileEdit
                                {...this.state.selectedAdmin}
                                /*  firstName={this.props.firstName}
                                 lastName={this.props.firstName}
                                 jmbg={this.props.jmbg}
                                 dateOfBirth={this.props.dateOfBirth}*/
                                phoneNumber={this.state.phoneNumber}
                                /*  username={this.props.username}  */
                                handleProfileClose={this.handleProfileClose}
                                onChange={this.handleProfileChange}
                                handleCancelProfileEdit={this.handleCancelProfileEdit}
                                handleProfileEditSubmit={this.handleProfileEditSubmit}
                            /*                             userId={this.props.userId}
                             */
                            />
                        }</div>


                    {this.state.targetPage === 'student' && <TableOfStudents username={this.props.username}
                        password={this.props.password} user={this.props.user} handleBack={this.handleBack} />}
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
                        password={this.props.password} handleLogOut={this.handleLogOut} user={this.props.user} handleBack={this.handleBack} />}


                    {this.state.targetPage === 'profile' &&
                        <Profile
                            user={this.props.user}
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

                    {/*                     {this.state.isDownloadLogClick &&
                        <Download
                            handleDownloadLogClose={this.handleDownloadLogClose}
                        />
                    } */}

                </div>

            </div>

        )
    }

}
export default AdministratorsPage