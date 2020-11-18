import React, { Component } from 'react';

import '../Table.css'

class CreateTeacherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            dateOfEmployment: '',
            vocation: '',
            subjectsId: '',
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

                    <label htmlFor='dateOfEmployment'><strong>Date of employment: </strong></label><br />
                    <input
                        type="date"
                        name="dateOfEmployment"
                        placeholder="Enter date of employment"
                        value={this.props.dateOfEmployment}
                        onChange={this.props.onChange}
                        className="dateStyl"
                    />
                    <br />

                    <label htmlFor='vocation'><strong>Vocation: </strong></label>
                    <input
                        type="text"
                        name="vocation"
                        placeholder="Enter vocation"
                        value={this.props.vocation}
                        onChange={this.props.onChange}
                    />
                    <br />

                    {/*                 <label htmlFor='subjectsId'><strong>Subject id: </strong></label>
                <input
                    type="text"
                    name="subjectsId"
                    placeholder="Enter subject id"
                    value={this.props.subjectsId}
                    onChange={this.props.onChange}
                />
                <br /> */}

                    <label htmlFor='subjectsId'><strong>Choose subject: </strong></label><br />
                    <select type="option" name="subjectsId" value={this.props.subject} onChange={this.props.onChange}  >
                        <option value='---' selected="selected">- - - - - - - - - - - - </option>
                        {this.props.subjects.map(subject =>
                            <option key={subject.subjectId} value={subject.subjectId}>{subject.subjectName}{subject.subjectId}</option>)}
                    </select>
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
                        {/*                         <input type='button' value='Cancel' id="cancel" onClick={this.props.handleCancelCreate} />
 */}                    </div>


                </form>
            </div>
        )
    }
}

export default CreateTeacherForm;