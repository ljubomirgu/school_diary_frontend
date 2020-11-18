import React, { Component } from 'react';
import '../Pages/studentUser.css'

class TeacherView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseClick: false,
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
            lectures: this.props.lectures,
            showAddDepartForm: false,
            selectedSubject: null,
            departId: Number,
            classId: '',
            subjects: this.props.subjects
            


        }
    }

    /*
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
    
    */
    renderLecturesData() {
        return (
            <div>
                <table style={{ width: "40%", marginLeft: "30%", marginTop: "30px" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Department</th>
                            <th>Subject name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lectures.map((lecture) => {
                            return (
                                <tr key={lecture.lectureId}>
                                    <td className="counterCell"></td>
                                    <td>{lecture.schoolClass.year.year}-{lecture.schoolClass.numberOfDepartment}</td>
                                    <td>{lecture.subject.subjectName}</td>
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

                <table style={{ width: "40%", marginLeft: "30%", marginTop: "30px" }}>
                    <thead>
                        <tr>
                            <th colSpan="3">Subjects</th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Subject name</th>
                            <th>Weekly fund</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.subjects.map((subject) => {
                            return (
                                <tr key={subject.subjectId}>
                                    <td className="counterCell"></td>
                                    <td>{subject.subjectName}</td>
                                    <td>{subject.weeklyFund}</td>

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
                <div>
                    {this.state.showLectures && this.renderLecturesData()}
                </div>
                <div>

                    {this.state.showSubjects && this.renderSubjectsData()}

                    <div>
                        {this.state.showSubjects &&
                            <div style={{ marginTop: "8px" }}>
                                <button className="closeButton" onClick={this.props.handleCloseBack}>Close</button>
                            </div>}


                    </div>
                </div>
            </div >
        )
    }
}

export default TeacherView;

