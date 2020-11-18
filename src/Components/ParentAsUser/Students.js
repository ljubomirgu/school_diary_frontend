import React, { Component } from 'react';
import '../Table.css'

class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: this.props.students
        }
    }

    render() {
        return (
            <div>
                {this.state.students.map((student) => {
                    return (
                        <table style={{width:"40%",marginLeft:"30%", marginTop:"30px"}}key={student.userId}>
                            <thead>
                                <tr style={{textAlign:"center", fontSize:"20px", width:"100%"}}>
                                    <th>Grades for {student.firstName}</th>
                                </tr>
                                <tr>
                                    <th style={{width:"45%"}}>Semester</th>
                                    <th style={{width:"45%"}}>Subject name</th>
                                    <th style={{width:"10%"}}>Grades</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.gradings.map((grade) => {
                                    return (
                                        <tr key={grade.gradingId}>
                                            
                                            <td>{grade.semester}</td>
                                            <td>{grade.lecture.subject.subjectName}</td>
                                            <td>{grade.grade}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    )
                })}
                 <div style={{ marginTop: "8px" }}><button className="closeButton" onClick={this.props.handleCloseAllGrades}>Close</button></div>
            </div>
        )
    }

}
export default Students