import React, { Component } from 'react';
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
            subjectName:'',

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
                                <th colSpan="2">Student {this.props.firstName} {this.props.lastName} attends subjects</th>
                            </tr>
                            <tr>
                                {/*  <th>#</th> */}
                                <th>Subject name</th>
                                <th>The professor who teaches it</th>                           
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.lectures.map((lecture) => {
                                return(
                                <tr key={lecture.lectureId}>
                                    <td>{lecture.subject.subjectName}</td>
                                    <td>{lecture.teacher.firstName} {lecture.teacher.lastName}</td>
                                </tr>
                                )
                            })}                             
                        </tbody>
                    </table>
                </div>  
                <div style={{marginTop:"8px"}}><button className="closeButton" onClick={this.props.handleCloseSubjectsBack}>Close</button></div>
            </div>

        )
    }
}

export default TeacherView;

