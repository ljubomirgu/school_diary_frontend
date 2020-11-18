import React, { Component } from 'react';

import '../Table.css'

class CreateAdminForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            phoneNumber: '',
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
                    placeholder="enter first name"
                    value={this.props.firstName}
                    onChange={this.props.onChange}
                />
                <br />

                <label htmlFor='lastName'><strong>Last name: </strong></label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="enter last name"
                    value={this.props.lastName}
                    onChange={this.props.onChange}
                />
                <br />

                <label htmlFor='jmbg'><strong>JMBG: </strong></label>
                <input
                    type="text"
                    name="jmbg"
                    placeholder="enter jmbg"
                    value={this.props.jmbg}
                    onChange={this.props.onChange}
                />
                <br />

                <label htmlFor='dateOfBirth'><strong>Date of birth: </strong></label><br/>
                <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="enter date of birth"
                    value={this.props.dateOfBirth}
                    onChange={this.props.onChange}
                    className="dateStyl"
                />
                <br />

                <label htmlFor='phoneNumber'><strong>Phone number: </strong></label>
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="enter phone number"
                    value={this.props.phoneNumber}
                    onChange={this.props.onChange}
                />
                <br />


                <label htmlFor='username'><strong>Username: </strong></label>
                <input
                    type="text"
                    name="username"
                    placeholder="enter username"
                    value={this.props.username}
                    onChange={this.props.onChange}
                />
                <br />


                <label htmlFor='password'><strong>Password: </strong></label>
                <input
                    type="text"
                    name="password"
                    placeholder="enter password"
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
                </div>

            </form>
         </div>
        )
    }
}

export default CreateAdminForm;