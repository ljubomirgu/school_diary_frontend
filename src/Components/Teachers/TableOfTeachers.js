import React, { Component } from 'react';
import TeacherForm from './TeacherForm';
import CreateTeacherForm from './CreateTeacherForm';
import '../Table.css'
import TeacherView from './TeacherView';
import NewTeacherView from './NewTeacherView';

class TableOfTeachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            isLoading: false,
            isError: false,
            selectedTeacher: null,
            newTeacher: null,
            isCreateClick: false,
            showTable: true,
            showCreateButton: true,

            subjects: [],
            viewTeacher: null,
            isViewClick: false,
            username: this.props.username,
            password: this.props.password,
            lectures: [],
            subjectId:'',
            allSubjects:[],

            teacherSelected: null,

        }
    }



    handleChange = (e) => {
        console.log(e.target)
        this.setState({
            selectedTeacher: {
                ...this.state.selectedTeacher,
                [e.target.name]: e.target.value
            }
        })
    }

    //CREATE:
    handleCreateChange = (e) => {
        this.setState({
            newTeacher: {
                ...this.state.newTeacher, [e.target.name]: e.target.value
            }
        })
    }

    handleCreate = () => this.setState({ isCreateClick: true, showTable: false, showCreateButton: false })

    handleCancelCreate = () => {
        this.setState({ isCreateClick: false, showTable: true, showCreateButton: true })
    }

    handleCreateSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.newTeacher)
        const response = await fetch('/diary/teachers', {
            method: 'POST',
            body: JSON.stringify(this.state.newTeacher),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        this.setState({ isCreateClick: false, newTeacher: null, showCreateButton: true })
        if (response.ok) {
            this.componentDidMount();
            this.setState({ showTable: true, showCreateButton: true, isCreateClick: false })//možda je samo dovoljno setovati u state showTabel:true
        }
        else {
            alert("Faild. The teacher is not created.")
            this.setState({ isCreateClick: true, showTable: false, showCreateButton: false })
        }
    }


    //EDIT:
    handleEdit = (teacher) => this.setState({ selectedTeacher: teacher, showTable: false, showCreateButton: false })

    handleCancelEdit = () => {
        this.setState({ selectedTeacher: null, showTable: true, showCreateButton: true })
    }

    handleEditSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/diary/teachers/' + this.state.selectedTeacher.userId, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectedTeacher),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        console.log("aaa")
        const teachers = [...this.state.teachers]
        console.log(this.state.teachers)
        const index = teachers.findIndex((teacher) => teacher.userId === this.state.selectedTeacher.userId)
        console.log("bbb")
        teachers.splice(index, 1, this.state.selectedTeacher)
        this.setState({ teachers, selectedTeacher: null })
        this.componentDidMount();
        this.setState({ showTable: true, showCreateButton: true })

        if (!response.ok) {
            alert("Faild. The edit is not succeeded.")
            this.setState({ showTable: true, showCreateButton: true, selectedTeacher: null })
        }
    }

    //DELETE:

    handleDelete = async (teacher) => {
        const response = await fetch('/diary/teachers/' + teacher.userId,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.status === 200) {
            this.componentDidMount();
            alert("Teacher successfully deleted");
        }
        else {
            alert("The teacher cannot be deleted because something references him!")
        }
    }



    /////////////////////// V I E W :
    handleShowSubject = (teacher) => this.setState({ selectedTeacherForSubjects: teacher })

    handleCloseBack = () => this.setState({ showTable: true, showCreateButton: true, isViewClick: false,teacherSelected:null })
    /*
        renderSubjectData() {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subject name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.subjects.map((subject) => {
                            return (
                                <tr key={subject.subject}>
                                    <td>{subject.subject}</td>
                                    <td>{subject.subjectName}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )
        }
    */
    takeSubjectsAndDepartsByTeacher = async (teacher) => {
      //  console.log("ovde")
      //  console.log(teacher)
        const response = await fetch('/diary/lectures/by-teacher/' + teacher.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            const lectures = await response.json(); //GET vraca Lectures ali sam ih nazvao subjects!
            this.setState({ viewTeacher: teacher, lectures, isLoading: false, isViewClick: true, showTable: false, showCreateButton: false })
            console.log(this.state.viewTeacher)
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }

    handleView = (teacher) => {
        this.setState({
            teacherSelected: teacher, showTeacher: true, showTable: false,  showCreateButton: false 
        })
    }

    //




    renderTableData() {
        return (
            <table className="tablebg">
                <thead>
                    <tr>
                        <th style={{ width: "15px" }}>#</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>JMBG</th>
                        <th>Date of birth</th>
                        <th style={{ display: "none" }}>Version</th>
                        <th>Date of Employment</th>
                        <th>Vocation</th>
                       <th>More info</th>   


{/*                         <th>New ...</th>
 */}

                        <th colSpan="2">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.teachers.map((teacher) => {
                        return (
                            <tr key={teacher.userId}>
                                <td className="counterCell"></td>
                                <td style={{ display: "none" }}>{teacher.userId}</td>
                                <td>{teacher.firstName}</td>
                                <td>{teacher.lastName}</td>
                                <td>{teacher.jmbg}</td>
                                <td>{teacher.dateOfBirth}</td>
                                <td style={{ display: "none" }}>{teacher.version}</td>
                                <td>{teacher.dateOfEmployment}</td>
                                <td>{teacher.vocation}</td>
                                {/*                                <td style={{ display: "none" }}><button className="showSubjects" onClick={() => this.takeSubjecsAndDepartsByTeacher(teacher)}>Show</button></td>
                             <td><button className="viewButton" onClick={() => this.takeSubjectsAndDepartsByTeacher(teacher)}>...</button></td>*/}
                                
                                <td><button className="viewButton" onClick={() => this.handleView(teacher)}>...</button></td>                               

                                <td><button className="editButton" onClick={() => this.handleEdit(teacher)}>Edit</button></td>
                                <td><button className="deleteButton" onClick={() => this.handleDelete(teacher)}>Delete</button></td>


                            </tr>
                        )
                    })}
                </tbody>

            </table>

        )
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/teachers',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        const response1 = await fetch('/diary/subjects',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        console.log("did?")
        if (response.ok && response1.ok) {
            const teachers = await response.json();
            const subjects = await response1.json();
            this.setState({ teachers, subjects, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }

    }

    /*
        handleDelete = (teacherId) => {
            //fetch sa Delete metodom
            //pa posle uspešnog izvršavanja bismo ažurirali state
            const teachers = this.state.teachers.filter((teacher) => teacher.userId !== teacherId)
            this.setState({ teachers })
        }
    */

    render() {
        const { teachers, isLoading, isError } = this.state
        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error</div>
        }

        return teachers.length > 0 ?
            (
                <div><div></div>
                    <h1 id='title'>Teachers</h1>
                    {this.state.showCreateButton && <button className="createButton" onClick={() => this.handleCreate()}>Create new</button>}
                    <div className="center">
                        <div id='teachers' style={{ marginTop: "2%" }}>
                            {/*                             <tbody> */}
                            {this.state.showTable && this.renderTableData()}
                            {/*                             </tbody> */}
                            {/* <div className="formaEdita">*/}

                            {this.state.selectedTeacher &&
                                <TeacherForm
                                    {...this.state.selectedTeacher}
                                    onChange={this.handleChange}
                                    handleEditSubmit={this.handleEditSubmit}
                                    handleCancelEdit={this.handleCancelEdit}
                                    username={this.state.username}
                                    password={this.state.password}
                                    teacher={this.state.selectedTeacher}
                                    subjects={this.state.subjects}

                                />
                            }
                            {this.state.isCreateClick &&
                                <CreateTeacherForm
                                    {...this.state.newTeacher}
                                    subjects={this.state.subjects}
                                    onChange={this.handleCreateChange}
                                    handleCreateSubmit={this.handleCreateSubmit}
                                    handleCancelCreate={this.handleCancelCreate}
                                />
                            }
                            {/* 

                            {this.state.selectedTeacherForSubjects &&
                                this.renderSubjectData()
                            } */}

                            {this.state.isViewClick &&
                                <TeacherView
                                    userId={this.state.viewTeacher.userId}   
                                    firstName={this.state.viewTeacher.firstName}
                                    lastName={this.state.viewTeacher.lastName}
                                    jmbg={this.state.viewTeacher.jmbg}
                                    dateOfBirth={this.state.viewTeacher.dateOfBirth}
                                    dateOfEmployment={this.state.viewTeacher.dateOfEmployment}
                                    vocation={this.state.viewTeacher.vocation}

                                    lectures={this.state.lectures}
                                    handleCloseBack={this.handleCloseBack}
                                    username={this.state.username}
                                    password={this.state.password}
                                    teacher={this.state.viewTeacher}
                                    subjects={this.state.subjects}

                                    viewTeacher={this.state.viewTeacher}
                                    allSubjects={this.state.subjects} //isto što i sujects iznad, samo radi upoređivanja sa parent gde radi sve
                                    //componentDidMount={this.componentDidMount}
                                />
                            }


                            {this.state.teacherSelected && 
                             <NewTeacherView 
                                teacher = {this.state.teacherSelected}
                                username = {this.state.username}
                                password = {this.state.password}
                                handleCloseBack={this.handleCloseBack}
                                subjects={this.state.subjects}
                             />}

                            {/* </div>*/}

                        </div>
                    </div>
                </div>
            )
            : null
    }
}

export default TableOfTeachers;