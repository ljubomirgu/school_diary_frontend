import React, { Component } from 'react';
import '../Table.css'


class AdminForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            // version: '',
            phoneNumber: ''

        }
    }


    render() {
        return (
            <div className="editForma" style={{ marginTop: "5%" }}>
                <form onSubmit={this.props.handleEditSubmit}>

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


                    <label htmlFor='dateOfBirth'><strong>Date of birth: </strong></label>
                    <br />
                    <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="date of birth"
                        value={this.props.dateOfBirth}
                        onChange={this.props.onChange}
                    />

                    {/* da li se za telefon stavlja type=text ili? */}
                    <br />
                    <label htmlFor='phoneNumber'><strong>Phone number: </strong></label>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="phone number"
                        value={this.props.phoneNumber}
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



export default AdminForm;