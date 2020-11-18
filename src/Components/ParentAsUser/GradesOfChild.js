import React, { Component } from 'react';
import '../Pages/studentUser.css';
import '../Table.css'

class Children extends Component {

    constructor(props) {
        super(props);
        this.state = {
            student: this.props.selectedChild,
            isViewSubjectsClick: false,
            showChildren: true,
            selectedChild: null,
           
        }
    }

    takeGradesForStudent = (student) => this.setState({ showChildren: false, showChildren: true, selectedChild: student })


    render() {
        return (
            <div>
                <table style={{width:"40%",marginLeft:"30%", marginTop:"30px"}}>
                    <thead>
                        <tr>
                            <th colSpan="5">Grades of student {this.state.student.firstName} {this.state.student.lastName}</th></tr> 
                        <tr>
                            <th>#</th>
                            <th>Name of subject</th>
                            <th>Teacher</th>
                            <th>Semester</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody className="trtbody">
                        {this.state.student.gradings.map((grade) => {
                            return (
                                <tr key={grade.gradeId}>
                                    <td className="counterCell"></td>
                                    <td>{grade.lecture.subject.subjectName}</td>
                                    <td>{grade.lecture.teacher.firstName} {grade.lecture.teacher.lastName}</td>
                                    <td>{grade.semester}</td>
                                    <td>{grade.grade}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div style={{ marginTop: "4px" }}><button className="closeButton" onClick={this.props.handleCloseGradesOfChild}>Hide</button></div>
            </div>
        )
    }


}
export default Children