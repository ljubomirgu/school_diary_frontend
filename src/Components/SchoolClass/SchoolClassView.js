import React, { Component } from 'react';
import '../Table.css'

class SchoolClassView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            email: '',
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
                                <th colSpan="2">The Students of  {this.props.year}-{this.props.numberOfDepartment}</th>
                            </tr>
                            <tr>
                                {/*  <th>#</th> */}
                                <th>Student's first name</th>
                                <th>Student's last name fund</th>                               
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.students.map((student) => {
                                return(
                                <tr key={student.userId}>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>                                   
                                </tr>
                                )
                            })}                         
                        </tbody>
                    </table>
                </div>
                <div style={{marginTop:"8px"}}><button className="closeButton" onClick={this.props.handleCloseBack}>Close</button></div>
            </div>

        )
    }
}

export default SchoolClassView;

