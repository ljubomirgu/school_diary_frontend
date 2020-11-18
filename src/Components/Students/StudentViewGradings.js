import React, { Component } from 'react';
import '../Table.css'

class StudentViewParents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            isCloseClick: false,
            isLoading: false,
            isError: false

        }
    }

    render() {
        return (
         
            <div>
                  
                <div>
                    <table style={{borderCollapse: "collapse", backgroundColor: "white"}}>
                        <thead>
                            <tr>
                                <th colSpan="4">Grades of student {this.props.firstName} {this.props.lastName}</th>
                            </tr>
                            <tr>    
                                <th>Subject</th>                            
                                <th>Grade</th>
                                <th>Semester</th>
                                <th>Teacher</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.grades.map((grade) => {
                                return(
                                <tr key={grade.gradingId}>
                                    <td>{grade.lecture.subject.subjectName}</td>
                                    <td>{grade.grade}</td>
                                    <td>{grade.semester}</td>
                                    <td>{grade.lecture.teacher.firstName} {grade.lecture.teacher.lastName}</td>
                                </tr>
                                )
                            })}                         
                        </tbody>
                    </table>
                </div>
                <div style={{marginTop:"8px"}}><button className="closeButton" onClick={this.props.handleCloseGradingsBack}>Close</button></div>
            </div>

        )
    }
}

export default StudentViewParents;

