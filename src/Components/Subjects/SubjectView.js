import React, { Component } from 'react';
import '../Table.css'

class SubjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseClick: false,
            subjectName: '',
            weeklyFund: '',
            version: '',
            subjectId: '',

            firstName: '',
            lastName: '',
            isLoading: false,
            isError: false

        }
    }
    /*
        handleClose = () => this.setState({ isCloseClick: true })
    
        takeTeacherForSubject = async (e) => {
            const response = await fetch('/diary/teachers/subject/' + this.props.subjectId,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
            if (response.ok) {
                const teachers = await response.json();
                this.setState({ teachers, isLoading: false })
            } else {
                this.setState({ isLoading: false, isError: true })
                this.props.handleLogOut();
            }
        }
    
    */
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

    render() {
        return (

            <div>

                <div>
                    <table style={{ borderCollapse: "collapse", backgroundColor: "white" }}>
                        <thead>
                            <tr>
                                {/*  <th>#</th> */}
                                <th>Subject name</th>
                                <th>Weekly fund</th>
                                <th> Teachers who teach {this.props.subjectName}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/*<tr key={this.props.subjectId}>
                                <td>{this.props.subjectId}</td>*/}
                                <td>{this.props.subjectName}</td>
                                <td>{this.props.weeklyFund}</td>

                                <td>
                                    {this.props.teachers.map((teacher) => {
                                        return (
                                            /* <tr key={teacher.userId}>
                                            <td>{teacher.firstName} {teacher.lastName}</td>
                                            </tr> */
                                            <div key={teacher.userId}>
                                                <p>{teacher.firstName} {teacher.lastName}</p>
                                            </div>
                                        )
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/*<div>{this.renderTeachersForSubject()}</div> */}
                <div style={{ marginTop: "8px" }}><button className="closeButton" onClick={this.props.handleCloseBack}>Close</button></div>
            </div>
        )
    }
}

export default SubjectView;

