import React, { Component } from 'react';
import AddSubjectToTeacher from './AddSubjectToTeacher';
import AddDepartToTeacher from './AddDepartToTeacher';

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
            subjectId: '',
            showAddSubjectForm: false,
            viewTeacher: null,
            showLectures: true,
            showSubjects: true,
            lectures: [],
            showAddDepartForm: false,
            selectedSubject: null,
            departId: Number,
            classId:''
          

        }
    }


    handleAddSubjectToTeacher = () => {
        this.setState({ showViewForm: false, showAddSubjectForm: true, showSubjects: false, showLectures: false })
    }
    handleCancelAddSubjectToTeacher = () => {
        this.setState({ showViewForm: true, showAddSubjectForm: false, showSubjects: true, showLectures: true })
    }
    handleCancelAddDepartToTeacher = () => {
        this.setState({ showViewForm: true, showAddDepartForm: false, showSubjects: true, showLectures: true })
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
        const response = await fetch('/diary/teachers/' + this.state.teacher.userId + '/add-subject/' + this.state.subjectId, {
            method: 'PUT',
/*              body: JSON.stringify(this.state.selectedSubject),
 */             headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        this.setState({ showAddSubjectForm: false, showLectures: true, showSubjects: true })
        this.componentDidMount();

    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        console.log(this.props.teacher)
        const response = await fetch('/diary/lectures/by-teacher/' + this.props.teacher.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        const response1 = await fetch('/diary/teachers/' + this.props.teacher.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok && response1.ok) {
            const lectures = await response.json(); //GET vraca Lectures ali sam ih nazvao subjects!
            const teacher = await response1.json();
            this.setState({ teacher, lectures, isLoading: false })
            console.log(this.state.viewTeacher)
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }

    handleAddDepart = (subject) => {
        this.setState({
            selectedSubject: subject, showSubjects: false, showLectures: false, showAddSubjectForm: false, showAddDepartForm: true
        })

    }

    handleDepartChange = (e) => {
        console.log(e.target.value);
        this.setState({
            classId: e.target.value
        })
    }

     
    
    handleAddDepartToTeacher = async (e) => {
        e.preventDefault();
        let lecture = {teacherId: this.state.teacher.userId, classId: parseInt(this.state.classId),
             subjectId: this.state.selectedSubject.subjectId
         }
        console.log(JSON.stringify(lecture))
        console.log(lecture)
         const response = await fetch('/diary/lectures',
            {
                method: 'POST',
                body: JSON.stringify(lecture),
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            this.componentDidMount();
            this.setState({showAddDepartForm:false, showLectures:true, showSubjects:true});
        }
        else {
            alert("something gone wrong.\n Make sure you choose a good department")
        } 
    }

    renderLecturesData() {
        return (
            <div>
                <table style={{ borderCollapse: "collapse", backgroundColor: "white" }}>
                    <thead>
                        <tr>
                            <th colSpan="3">What subject does {this.state.teacher.firstName} {this.state.teacher.lastName} teach to which department</th>
                        </tr>
                        <tr>
                             <th>#</th>
                            <th>Subject name</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lectures.map((lecture) => {
                            return (
                                <tr key={lecture.lectureId}>
                                    <td className="counterCell"></td>
                                    <td>{lecture.subject.subjectName}</td>
                                    <td>{lecture.schoolClass.year.year}-{lecture.schoolClass.numberOfDepartment}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    renderSubjectsData() {
        return (
            <div>

                <table style={{ borderCollapse: "collapse", backgroundColor: "white" }}>
                    <thead>
                        <tr>
                            <th colSpan="4">Subjects of {this.state.teacher.firstName} {this.state.teacher.lastName}</th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Subject name</th>
                            <th>Weekly fund</th>
                            <th>Add department</th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.state.teacher.subjects.map((subject) => {
                            return (
                                <tr key={subject.subjectId}>
                                    <td className="counterCell"></td>
                                    <td>{subject.subjectName}</td>
                                    <td>{subject.weeklyFund}</td>
                                    <td style={{ textAlign: "center" }}><button className="addDepart" onClick={() => this.handleAddDepart(subject)}>+</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.showLectures && this.renderLecturesData()}
                {this.state.showLectures && <div>
                    <input type='button' value='Add subject' id="add" onClick={() => this.handleAddSubjectToTeacher()} />
                </div>}

                {this.state.showSubjects && this.renderSubjectsData()}

                <div>
                {this.state.showSubjects && 
                    <div style={{ marginTop: "8px" }}>
                        <button className="closeButton" onClick={this.props.handleCloseBack}>Close</button>
                    </div>}

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

                        {this.state.showAddDepartForm &&
                            <AddDepartToTeacher
                                username={this.props.username}
                                password={this.props.password}
                                handleAddDepartToTeacher={this.handleAddDepartToTeacher}
                                subject={this.state.selectedSubject}
                                onChange={this.handleDepartChange}
                                handleCancelAddDepartToTeacher={this.handleCancelAddDepartToTeacher}
                            />}


                    </div>
                </div>
            </div>
        )
    }
}

export default TeacherView;

