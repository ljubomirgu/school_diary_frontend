import React, { Component } from 'react';
import '../Table.css'

class Grades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            gradings: []
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/gradings/student',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const gradings = await response.json();
            this.setState({ gradings, isLoading: false })
        } else {
            this.setState({ isLoading: false, isError: true })
            console.log("noMount")
        }

    }

    render() {
        return (
            <div style={{display:"block"}}>
            {/* <div className="center" style={{ position: "center", width: "60%", height: "60%", marginTop: "25%", marginLeft: "20%" }}> */}
            <div className="center" style={{ width: "60%", height: "60%", marginTop: "5%", marginLeft: "20%" }}>
{/*                 <div style={{ textAlign: "center" }}>
 */}                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Teacher</th>
                                    <th>Semester</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.gradings.map((grade) => {
                                    return (
                                        <tr key={grade.gradingId}>
                                            <td>{grade.lecture.subject.subjectName}</td>
                                            <td>{grade.lecture.teacher.firstName} {grade.lecture.teacher.lastName}</td>
                                            <td>{grade.semester}</td>
                                            <td>{grade.grade}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                    <br/>

{/*                     <div>
                    {this.state.gradings.map((grade) => {
                                    return (
                                        <table key ={grade.lecture.subject.subjectName}>
                                            <thead>
                                                <tr>
                                                    <th>Grades for {grade.lecture.subject.subjectName}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr key={grade.lecture.subject.semester}>
                                                    <td>{grade.lecture.subject.semester}</td>
                                                    <td key ={grade.grade}>{grade.grade}</td>
                                                </tr>
                                            </tbody>                                             
                                        </table>
                                    )})}
                    </div> */}
                    <br/>
{/*                 </div>
 */}               
            </div>
            </div>
        )
    }

}
export default Grades;