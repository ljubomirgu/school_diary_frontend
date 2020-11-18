import React, { Component } from 'react';
import AddStudentToParent from './AddStudentToParent'
import '../Table.css'

class ParentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            email: '',
            isCloseClick: false,
            isLoading: false,
            isError: false,


            parent:null,
            students:[],
            userId:'',
            showAddStudentForm:false,
            showViewForm: true,
           
        }
    }

    //dodao

    handleAddStudentToParent = () => {
        this.setState({ showViewForm: false, showAddStudentForm: true })
    }
    handleCancelAddStudentsToParent = () => {
        this.setState({ showViewForm: true, showAddStudentForm: false })
    }

    handleChangeStudent = (e) => {
        this.setState({
            userId: e.target.value
        })
    }

    handleEditAddStudentToParent = async (e) => {
       // console.log(this.props.userId)
       // console.log(this.state.subjectId)
        e.preventDefault()
        const response = await fetch('/diary/parents/' + this.props.viewParent.userId + '/add-student/' + this.state.userId, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        this.setState({showAddStudentForm: false})
        this.componentDidMount();

    }

    //remove:
    handleRemoveStudentForParent = async (student) =>{
        //e.preventDefault()
        const response = await fetch('/diary/parents/' + this.props.viewParent.userId + '/remove-student/' + student.userId, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });  
        this.componentDidMount();
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
       
        const response = await fetch('/diary/students/by-parent/'+this.props.viewParent.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (response.ok) {
                const students = await response.json();
                this.setState({students: students, isLoading: false })
              //  console.log(this.state.students)
            } else {
                this.setState({ isLoading: false, isError: true })
                this.props.handleLogOut();
            }

    }


    render() {
        return (

            <div>

                <div>
                    <table style={{ borderCollapse: "collapse", backgroundColor: "white" }}>
                        <thead>
                            <tr>
                                {/*<th colSpan="3">Students whose parent is {this.props.firstName} {this.props.lastName}</th> */}
                                <th colSpan="4">Students whose parent is {this.props.viewParent.firstName} {this.props.viewParent.lastName}</th>
                            </tr>
                            <tr>
                                {/*  <th>#</th> */}
                                <th>Student's first name</th>
                                <th>Student's last name fund</th>
                                <th>Student's department</th>

                                <th>Remove student from list</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*{this.props.students.map((student) => {
                                return (
                                    <tr key={student.userId}>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.schoolClass.year.year}-{student.schoolClass.numberOfDepartment}</td>
                                    </tr>
                                )
                            })} */}

                            {this.state.students.map((student) => {
                                return (
                                    <tr key={student.userId}>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.schoolClass.year.year}-{student.schoolClass.numberOfDepartment}</td>

                                        <td><button className="removeButton" onClick={() => this.handleRemoveStudentForParent(student)}>x</button></td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <input type='button' value='Add student' id="addd" onClick={() => this.handleAddStudentToParent()} />
                </div>

                <div style={{ marginTop: "8px" }}><button className="closeButton" onClick={this.props.handleCloseBack}>Close</button></div>

                <div className="center">
                    {this.state.showAddStudentForm &&
                        <AddStudentToParent
                            students={this.state.students}
                            username={this.props.username}
                            password={this.props.password}
                            viewParent={this.props.viewParent}
                            onChange={this.props.onChange}
                            componentDidMount={this.componentDidMount}
                            handleCancelAddStudentsToParent={this.handleCancelAddStudentsToParent}
                            handleAddStudent={this.props.handleAddStudent}
                            handleChangeStudent={this.handleChangeStudent}
                            handleEditAddStudentToParent={this.handleEditAddStudentToParent}
                            

                            allStudents={this.props.allStudents}
                        />}
                </div>
            </div>

        )
    }
}

export default ParentView;

