import React, { Component } from 'react';

import '../Table.css'

class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            // version: '',
            //POLJE ZA BIRANJE ODELJENJA TREBA DODATI classId?
            dateEntered: '',
            note: '',
            schoolCLass: null

        }
    }


    render() {
        return (
            <div className="editForma" style={{ marginTop: "5%" }}>
                <form onSubmit={this.props.handleEditSubmit} >
                    <label htmlFor='firstName'><strong>First name: </strong></label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="first name"
                        value={this.props.firstName}
                        onChange={this.props.onChange}
                    />
                    <br />


                    <label htmlFor='lastName'><strong>Last name: </strong></label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="last name"
                        value={this.props.lastName}
                        onChange={this.props.onChange}
                    />
                    <br />


                    <label htmlFor='jmbg'><strong>JMBG: </strong></label>
                    <input
                        type="text"
                        name="jmbg"
                        placeholder="jmbg"
                        value={this.props.jmbg}
                        onChange={this.props.onChange}
                    />
                    <br />


                    <label htmlFor='dateOfBirth'><strong>Date of birth: </strong></label><br />
                    <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="date of birth"
                        value={this.props.dateOfBirth}
                        onChange={this.props.onChange}
                        className="dateStyl"
                    />


                    <br />
                    <label htmlFor='dateEntered'><strong>Date entered: </strong></label><br />
                    <input
                        type="date"
                        //  data-date="" 
                        // data-date-format="DD MM YYYY"
                        name="dateEntered"
                        placeholder="date entered"
                        value={this.props.dateEntered}
                        onChange={this.props.onChange}
                        className="dateStyl"

                    />
                    <br />

                    <label htmlFor='classId'><strong>Choose department: </strong></label><br />
                    <select type="option" name="classId" value={this.props.department} onChange={this.props.onChange}>
                        <option value={this.props.schoolClass} selected="selected">{this.props.schoolClass.year.year} {this.props.schoolClass.numberOfDepartment}  ({this.props.schoolClass.schoolYear})</option>
                        {this.props.schoolClasses.map(schoolClass =>
                            <option key={schoolClass.classId} value={schoolClass.classId}>{schoolClass.year.year} {schoolClass.numberOfDepartment}  ({schoolClass.schoolYear})</option>)}
                    </select>
                    <br />


                    <label htmlFor='note'><strong>Note: </strong></label>
                    <input
                        type="text"
                        name="note"
                        placeholder="note"
                        value={this.props.note}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <div>
                        <input type='submit' className="saveStyl" value='Save' />
                        <input type='button' value='Cancel' id="cancel" onClick={this.props.handleCancelEdit} />
                    </div>

                </form>
            </div>
        )
    }
}

export default StudentForm;