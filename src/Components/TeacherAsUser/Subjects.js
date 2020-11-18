import React, { Component } from 'react';
import '../Pages/studentUser.css';
import DepartsOfSubject from './DepartsOfSubject'

import '../Table.css'

class Subjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subjects: this.props.subjects,
            isViewDepartsClick: false,
            showSubjects: true,
            selectedSubject: null
        }
    }

    takeDepartsForSubject = (subject) => this.setState({ showSubjects: false, selectedSubject: subject })
    handleCloseDepartsOfSubject = () => this.setState({selectedSubject: null})
    renderTableData() {
        return (
            <div>
                <table style={{width:"40%",marginLeft:"30%", marginTop:"30px"}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subject name</th>
                            <th>Weekly fund</th>
                            <th>Show departments</th>
                        </tr>
                    </thead>
                    <tbody className="trtbody">
                        {this.state.subjects.map((subject) => {
                            return (
                                <tr key={subject.subjectId}>
                                    <td className="counterCell"></td>
                                    <td>{subject.subjectName}</td>
                                    <td>{subject.weeklyFund}</td>
                                    <td><button className="viewButton" onClick={() => this.takeDepartsForSubject(subject)}>...</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div style={{ marginTop: "8px" }}><button className="closeButton" onClick={this.props.handleCloseSubjects}>Close</button></div>
            </div>
        )
    }

    render() {
        return(
        <div>
            {this.state.showSubjects && this.renderTableData()}

            {this.state.selectedSubject &&
                <DepartsOfSubject
                    selectedSubject={this.state.selectedSubject}
                    handleCloseDepartsOfSubject={this.handleCloseDepartsOfSubject}
                />}
        </div>

        )
    }
}
export default Subjects