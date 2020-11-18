import React, { Component } from 'react';
import AddSubjectToTeacher from './AddSubjectToTeacher';

import '../Table.css'

class TeacherView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseClick: false,
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            dateOfEmployment: '',
            vocation: '',
            dateOfBirth: '',
            subjectName: '',

            isLoading: false,
            isError: false,
            showViewForm: true,
            showAddSubjectForm: false,
            username: this.props.username,
            password: this.props.password,
            teacher: this.props.teacher,
            subjectId:'',
            showAddSubjectForm:false

        }
    }


    /*     renderTeachersForSubject() {
            // this.setState({teachers: this.props.teachers})
            return (
                <table>
                    <thead>
                        <tr>
                            <th> Teachers who teach {this.props.subjectName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.teachers.map((teacher) => {
                            return (
                                <tr key={teacher.userId}>
                                    <td>{teacher.firstName} {teacher.lastName}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )
        } */

    handleAddSubjectToTeacher = () => {
        this.setState({ showViewForm: false, showAddSubjectForm: true })
    }
    handleCancelAddSubjectToTeacher = () => {
        this.setState({ showViewForm: true, showAddSubjectForm: false })
    }

    handleChangeSubject = (e) => {
        this.setState({
            subjectId: e.target.value
        })
    }

    handleEditAddSubjectToTeacher = async (e) => {
       console.log(this.props.userId)
       console.log(this.state.subjectId)
        e.preventDefault()
        const response = await fetch('/diary/teachers/' + this.props.userId + '/add-subject/' + this.state.subjectId, {
            method: 'PUT',
/*              body: JSON.stringify(this.state.selectedSubject),
 */             headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
         //this.componentDidMount();

    }
  /* 
    async componentDidMount() {
        this.setState({ isLoading: true });
       
        const response = await fetch('/diary/lectures/by-teacher/' + this.props.viewTeacher.userId,
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
}*/

    render() {
        return (
            <div>
                <div>
                    <table style={{ borderCollapse: "collapse", backgroundColor: "white" }}>
                        <thead>
                            <tr>
                                <th colSpan="2">What subject does {this.props.firstName} {this.props.lastName} teach to which department</th>
                            </tr>
                            <tr>
                                {/*  <th>#</th> */}
                                <th>Subject name</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.lectures.map((lecture) => {
                                return (
                                    <tr key={lecture.lectureId}>
                                        <td>{lecture.subject.subjectName}</td>
                                        <td>{lecture.schoolClass.year.year}-{lecture.schoolClass.numberOfDepartment}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div>
                         <input type='button' value='Add subject' id="add" onClick={() => this.handleAddSubjectToTeacher()} />
                    </div>
                    <div> 
                       
                    <table style={{ borderCollapse: "collapse", backgroundColor: "white" }}>
                        <thead>
                            <tr>
                                <th colSpan="2">Subjects of {this.props.firstName} {this.props.lastName}</th>
                            </tr>
                            <tr>
                                <th>Subject name</th>
                                <th>Weekly fund</th>
                            </tr>

                        </thead>
                        <tbody>
                            {this.props.teacher.subjects.map((subject) => {
                                return (
                                    <tr key={subject.subjectId}>
                                        <td>{subject.subjectName}</td>
                                        <td>{subject.weeklyFund}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    </div>

                </div>

                <div style={{ marginTop: "8px" }}>
                    <button className="closeButton" onClick={this.props.handleCloseBack}>Close</button>
                </div>

                <div className="center">
                    {this.state.showAddSubjectForm &&
                        <AddSubjectToTeacher
                            subjects={this.props.subjects}
                            username={this.props.username}
                            password={this.props.password}
                            teacher={this.props.teacher}
                            onChange={this.props.onChange}
                            componentDidMount={this.componentDidMount}
                            handleCancelAddSubjectToTeacher={this.handleCancelAddSubjectToTeacher}
                            handleAddSubject={this.props.handleAddSubject}
                            handleChangeSubject={this.handleChangeSubject}
                            handleEditAddSubjectToTeacher={this.handleEditAddSubjectToTeacher}
                        />}
                </div>
            </div>

        )
    }
}

export default TeacherView;

