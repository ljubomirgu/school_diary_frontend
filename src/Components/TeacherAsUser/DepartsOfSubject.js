import React, { Component } from 'react';
import '../Pages/studentUser.css';
import '../Table.css'

class DepartsOfSubject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: this.props.selectedSubject,
            isViewSubjectsClick: false,
            showSubjects: true,
            selectedSub: null,
           
        }
    }

    takeDepartsForSubject = (subject) => this.setState({ showSubjects: true, selectedSub: subject })


    render() {
        return (
            <div>
                <table style={{width:"40%",marginLeft:"30%", marginTop:"30px"}}>
                    <thead>
                        <tr>
                            <th colSpan="5">Departments of {this.state.subject.subjectName}</th></tr> 
                        <tr>
                            <th>#</th>
                            <th>Class</th>
                            <th>Department's mark</th>
                        </tr>
                    </thead>
                    <tbody className="trtbody">
                        {this.state.subject.gradings.map((grade) => {
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
export default DepartsOfSubject