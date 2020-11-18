import React, { Component } from 'react';
import './Table.css'


class StudentForma extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            dateEntered: '',
            note: ''

        }
    }


    render() {
        return (
            <table className="formaTable">
                <tr>
                    <td>
                        First name:
                    </td>
                    <td>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="first name"
                            value={this.props.firstName}
                            onChange={this.props.onChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Last name:
                    </td>
                    <td>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="last name"
                            value={this.props.lastName}
                            onChange={this.props.onChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        JMBG:
                    </td>
                    <td>
                        <input
                            type="text"
                            name="jmbg"
                            placeholder="jmbg"
                            value={this.props.jmbg}
                            onChange={this.props.onChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Date of birthday:</td>
                    <td>
                        <input
                            type="date"
                            name="dateOfBirth"
                            placeholder="date of birth"
                            value={this.props.dateOfBirth}
                            onChange={this.props.onChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Date entered:
                    </td>
                    <td>
                        <input
                            type="date"
                            name="dateEntered"
                            placeholder="date entered"
                            value={this.props.dateEntered}
                            onChange={this.props.onChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Note:
                    </td>
                    <td>

                        <input
                            type="note"
                            name="note"
                            placeholder="note"
                            value={this.props.note}
                            onChange={this.props.onChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <input type='submit' onSubmit={this.props.handleEditSubmit} value='Save' />
                    </td>
                </tr>

            </table>


        )
    }
}

export default StudentForma;