import React, { Component } from 'react';
import '../Pages/studentUser.css';
import GradesOfChild from './GradesOfChild'
import '../Table.css'

class Children extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: this.props.students,
            isViewSubjectsClick: false,
            showChildren: true,
            selectedChild: null
        }
    }

    takeGradesForStudent = (student) => this.setState({ showChildren: false, showChildren: true, selectedChild: student })
    handleCloseGradesOfChild = () => this.setState({selectedChild: null})
    renderTableData() {
        return (
            <div>
                <table style={{width:"40%",marginLeft:"30%", marginTop:"30px"}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Department</th>
                            <th>Grades</th>
                        </tr>
                    </thead>
                    <tbody className="trtbody">
                        {this.state.students.map((student) => {
                            return (
                                <tr key={student.userId}>
                                    <td className="counterCell"></td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.schoolClass.year.year} {student.schoolClass.numberOfDepartment}</td>
                                    <td><button className="viewButton" onClick={() => this.takeGradesForStudent(student)}>...</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div style={{ marginTop: "8px" }}><button className="closeButton" onClick={this.props.handleCloseChildren}>Close</button></div>
            </div>
        )
    }

    render() {
        return(
        <div>
            {this.state.showChildren && this.renderTableData()}

            {this.state.selectedChild &&
                <GradesOfChild
                    selectedChild={this.state.selectedChild}
                    handleCloseGradesOfChild={this.handleCloseGradesOfChild}
                />}
        </div>

        )
    }
}
export default Children