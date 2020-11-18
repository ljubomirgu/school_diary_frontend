import React, { Component } from 'react';

import '../Table.css'

class CreateStudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            dateEntered: '',
            classId: '', //treba ubaciti selection sa postojećim odeljenjima       
            note: '',
            username: '',
            password: ''

        }
    }


    render() {
        return (
            <div className="editForma" style={{ marginTop: "5%" }}>
            <form onSubmit={this.props.handleCreateSubmit}>

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
                    placeholder="Enter jmbg"
                    value={this.props.jmbg}
                    onChange={this.props.onChange}
                />
                <br />


                <label htmlFor='dateOfBirth'><strong>Date of birth: </strong></label><br />
                <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Enter date of birth"
                    value={this.props.dateOfBirth}
                    onChange={this.props.onChange}
                    className="dateStyl"

                />


                <br />
                <label htmlFor='dateEntered'><strong>Date entered: </strong></label><br />
                <input
                    type="date"
                    name="dateEntered"
                    placeholder="Enter date entered"
                    value={this.props.dateEntered}
                    onChange={this.props.onChange}
                    className="dateStyl"

                />
                <br />

    {/*             <label htmlFor='classId'><strong>Class id: </strong></label>
                <input
                    type="text"
                    name="classId"
                    placeholder="Enter class id"
                    value={this.props.classId}
                    onChange={this.props.onChange}
                />
                <br /> */}

                <label htmlFor='classId'><strong>Choose department: </strong></label><br/>
                <select type="option" name="classId" value={this.props.department}  onChange={this.props.onChange}>       
                    <option value='---' selected="selected">----------</option>
                    {this.props.schoolClasses.map(schoolClass => 
                        <option key={schoolClass.classId} value={schoolClass.classId}>{schoolClass.year.year} {schoolClass.numberOfDepartment} ({schoolClass.schoolYear})</option>)}                   
                </select>
                <br />


                <label htmlFor='note'><strong>Note: </strong></label>
                <input
                    type="text"
                    name="note"
                    placeholder="Enter note"
                    value={this.props.note}
                    onChange={this.props.onChange}
                />
                <br />


                <label htmlFor='username'><strong>Username: </strong></label>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={this.props.username}
                    onChange={this.props.onChange}
                />
                <br />


                <label htmlFor='password'><strong>Password: </strong></label>
                <input
                    type="text"
                    name="password"
                    placeholder="Enter password"
                    value={this.props.password}
                    onChange={this.props.onChange}
                />
                <br />


                {/*  <lable htmlFor='note'><strong>Note: </strong></lable>
                <div>
                    <textarea rows='5' cols='30'></textarea>
                </div> */}

                <div>
                    <input type='submit' className="saveStyl" value='Save' />
                    <a href='javascript:void(0)' onClick={this.props.handleCancelCreate} >Cancel</a>
{/*                     <input type='button' value='Cancel' id="cancel" onClick={this.props.handleCancelCreate} />
 */}                </div>

            </form>
            </div>
        )
    }
}

export default CreateStudentForm;