import React, { Component } from 'react';
import '../Table.css'

class StudentViewParents extends Component {
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
                                <th colSpan="3">Parents of student {this.props.firstName} {this.props.lastName}</th>
                            </tr>
                            <tr>                                
                                <th>First name</th>
                                <th>Last name</th>
                                <th>E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.parents.map((parent) => {
                                return(
                                <tr key={parent.userId}>
                                    <td>{parent.firstName}</td>
                                    <td>{parent.lastName}</td>
                                    <td>{parent.email}</td>
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

export default StudentViewParents;

