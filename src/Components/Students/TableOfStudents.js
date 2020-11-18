import React, { Component } from 'react';
import StudentForm from './StudentForm';
import CreateStudentForm from './CreateStudentForm';
import StudentViewParents from './StudentViewParents';
import StudentViewGradings from './StudentViewGradings';
import StudentViewSubjects from './StudentViewSubjects';
import '../Table.css';

class TableOfStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            isLoading: false,
            isError: false,
            selectedStudent: null,
            newStudent: null,
            isCreateClick: false,
            showTable: true,
            showCreateButton: true,
            isViewParentsClick: false,
            parents: [],
            grades: [],
            isViewGradingsClick: false,
            viewStudent: null,
            isViewSubjectsClick: false,
            lectures: [],
            schoolClasses: []

        }
    }

    handleCreateChange = (e) => {
        this.setState({
            newStudent: {
                ...this.state.newStudent, [e.target.name]: e.target.value
            }
        })
    }

    handleCreateSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.newStudent)
        const response = await fetch('/diary/students', {
            method: 'POST',
            body: JSON.stringify(this.state.newStudent),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        this.setState({ isCreateClick: false, newStudent: null, showCreateButton: true })

        if (response.ok) {
            this.componentDidMount();
            this.setState({ showTable: true, showCreateButton: true, isCreateClick: false })//možda je samo dovoljno setovati u state showTabel:true
        }
        else {
            alert("Faild. The student is not created.")
            this.setState({ isCreateClick: true, showTable: false, showCreateButton: false })
        }

    }

    handleCreate = () => this.setState({ isCreateClick: true, showTable: false, showCreateButton: false })

    handleEdit = (student) => this.setState({ selectedStudent: student, showTable: false, showCreateButton: false })

    handleEditSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('/diary/students/' + this.state.selectedStudent.userId, {
            method: 'PUT',
            body: JSON.stringify(this.state.selectedStudent),
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });

        const students = [...this.state.students]
        const index = students.findIndex((student) => student.userId === this.state.selectedStudent.userId)
        students.splice(index, 1, this.state.selectedStudent)
        this.setState({ students, selectedStudent: null })
        this.componentDidMount();
        this.setState({ showTable: true, showCreateButton: true })

        if (!response.ok) {
            alert("Faild. The edit is not succeeded.")
            this.setState({ showTable: true, showCreateButton: true, selectedStudent: null })
        }
    }

    handleChange = (e) => {
        this.setState({
            selectedStudent: {
                ...this.state.selectedStudent,
                [e.target.name]: e.target.value
            }
        })
    }


    /*
        renderTableHeader() {
            const header = Object.keys(this.state.students[0]);
            return header.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
        }
    */
    renderTableData() {
        return (
            <div className="tableFixHead">
                <table className="tablebg">
                    <thead className="trthead">
                        <tr>
                            <th>#</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>JMBG</th>
                            <th>Date of birth</th>
                            <th style={{ display: "none" }}>Version</th>
                            <th>Date entered</th>
                            <th>Note</th>
                            <th>Class</th>
                            <th>Department</th>
                            {/*                             <th>More info</th>
 */}                          <th>Parents</th>
                            {/*                             <th>Grades</th>
 */}                            <th>Subjects</th>
                            <th colSpan="2">Options</th>

                        </tr>
                    </thead>

                    <tbody className="trtbody">
                        {this.state.students.map((student) => {
                            return (
                                <tr key={student.userId}>
                                    <td className="counterCell"></td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.jmbg}</td>
                                    <td>{student.dateOfBirth}</td>
                                    <td style={{ display: "none" }}>{student.version}</td>
                                    <td>{student.dateEntered}</td>
                                    <td>{student.note}</td>
                                    <td>{student.schoolClass.year.year}</td>
                                    <td>{student.schoolClass.numberOfDepartment}</td>
                                    {/*                                     <td><button className="viewButton" onClick={() => this.handleView(student)}>...</button></td>
 */}                                 <td><button className="viewButton" onClick={() => this.takeParentsForStudent(student)}>...</button></td>
                                    {/*                                      <td><button className="viewButton" onClick={() => this.takeGradingsForStudent(student)}>...</button></td>
 */}                                     <td><button className="viewButton" onClick={() => this.takeSubjectsForStudent(student)}>...</button></td>
                                    <td><button className="editButton" onClick={() => this.handleEdit(student)}>Edit</button></td>
                                    <td><button className="deleteButton" onClick={() => this.handleDelete(student)}>Delete</button></td>


                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }


    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/students',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        const response1 = await fetch('/diary/classes',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok && response1.ok) {
            const students = await response.json();
            const schoolClasses = await response1.json();
            this.setState({ students, schoolClasses, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }

    }
    /*
        handleDelete = (studentId) => {
            //fetch sa Delete metodom
            //pa posle uspešnog izvršavanja bismo ažurirali state
            const students = this.state.students.filter((student) => student.userId !== studentId)
            this.setState({ students })
        }
    */

    ////////////

    handleDelete = async (student) => {
        const response = await fetch('/diary/students/' + student.userId,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        /* if(response.ok){
            // const res = await response.data;
             console.log(response);
         }*/
        if (response.status === 200) {
            this.componentDidMount();
            alert("Student successfully deleted");
        }
        else {
            alert("The student cannot be deleted because something references him!")
        }
    }

    handleCancelEdit = () => { this.setState({ selectedStudent: null, showTable: true, showCreateButton: true }) }

    handleCancelCreate = () => { this.setState({ isCreateClick: false, showTable: true, showCreateButton: true }) }

    //view:

    handleCloseBack = () => this.setState({ showTable: true, showCreateButton: true, isViewParentsClick: false })

    takeParentsForStudent = async (student) => {
        console.log(student)
        const response = await fetch('/diary/parents/by-student/' + student.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            const parents = await response.json(); //GET vraca Lectures ali sam ih nazvao subjects!
            this.setState({ viewStudent: student, parents, isLoading: false, isViewParentsClick: true, showTable: false, showCreateButton: false })
            console.log(this.state.viewStudent)
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }

    handleCloseGradingsBack = () => this.setState({ showTable: true, showCreateButton: true, isViewGradingsClick: false })

    takeGradingsForStudent = async (student) => {
        console.log(student)
        const response = await fetch('/diary/gradings/by-student/' + student.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            const grades = await response.json(); //GET vraca Lectures ali sam ih nazvao subjects!
            this.setState({ viewStudent: student, grades, isLoading: false, isViewGradingsClick: true, showTable: false, showCreateButton: false })
            console.log(this.state.viewStudent)
            console.log(this.state.grades)

        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }

    handleCloseSubjectsBack = () => this.setState({ showTable: true, showCreateButton: true, isViewSubjectsClick: false })

    takeSubjectsForStudent = async (student) => {
        console.log("ovde")
        console.log(student)
        const response = await fetch('/diary/lectures/by-department/' + student.schoolClass.classId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            const lectures = await response.json(); //GET vraca Lectures ali sam ih nazvao subjects!
            this.setState({ viewStudent: student, lectures, isLoading: false, isViewSubjectsClick: true, showTable: false, showCreateButton: false })
            console.log(this.state.viewStudent)
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }


    //render:

    render() {
        const { students, isLoading, isError } = this.state
        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error</div>
        }

        return students.length > 0 ?
            (
                <div >
                    <h1 id='title'>Students</h1>
                    {this.state.showCreateButton && <div><button className="createButton" onClick={() => this.handleCreate()}>Create new</button></div>}
                    <div className="center">
                        <div id='students' style={{ marginTop: "2%" }}>
                            {/*<tbody>*/}
                            {this.state.showTable && this.renderTableData()}
                            {/*</tbody>*/}

                            {this.state.selectedStudent &&
                                <StudentForm
                                    {...this.state.selectedStudent}
                                    onChange={this.handleChange}
                                    handleEditSubmit={this.handleEditSubmit}
                                    handleCancelEdit={this.handleCancelEdit}
                                    schoolClasses={this.state.schoolClasses}

                                />
                            }

                            {this.state.isCreateClick &&
                                <CreateStudentForm
                                    {...this.state.newStudent}
                                    schoolClasses={this.state.schoolClasses}
                                    onChange={this.handleCreateChange}
                                    handleCreateSubmit={this.handleCreateSubmit}
                                    handleCancelCreate={this.handleCancelCreate}

                                />
                            }
                            {this.state.isViewParentsClick &&
                                <StudentViewParents
                                    firstName={this.state.viewStudent.firstName}
                                    lastName={this.state.viewStudent.lastName}
                                    parents={this.state.parents}
                                    handleCloseBack={this.handleCloseBack}
                                />
                            }
                            {this.state.isViewGradingsClick &&
                                <StudentViewGradings
                                    firstName={this.state.viewStudent.firstName}
                                    lastName={this.state.viewStudent.lastName}
                                    grades={this.state.grades}
                                    handleCloseGradingsBack={this.handleCloseGradingsBack}
                                />
                            }

                            {this.state.isViewSubjectsClick &&
                                <StudentViewSubjects
                                    firstName={this.state.viewStudent.firstName}
                                    lastName={this.state.viewStudent.lastName}
                                    lectures={this.state.lectures}
                                    handleCloseSubjectsBack={this.handleCloseSubjectsBack}
                                />
                            }

                        </div>
                        {/*{this.state.selectedStudent &&
                        <StudentForm
                            {...this.state.selectedStudent}
                            onChange={this.handleChange}
                        />
                    }*/}
                    </div>
                </div>
            )
            : null
    }
}

export default TableOfStudents;