import React, { Component } from 'react';

import '../Table.css'

class CreateParentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            email: '',
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

                    <label htmlFor='dateOfBirth'><strong>Date of birth: </strong></label><br/>
                    <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="Enter date of birth"
                        value={this.props.dateOfBirth}
                        onChange={this.props.onChange}
                        className="dateStyl"
                    />
                    <br />

                    <label htmlFor='email'><strong>Email: </strong></label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={this.props.email}
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

export default CreateParentForm;