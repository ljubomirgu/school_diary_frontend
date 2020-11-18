import React, { Component } from 'react';
import '../Table.css'


class ProfilEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            phoneNumber: '' */
            // username:'',
            // userId:''

        }
    }


    render() {
        return (
            <div style={{ marginTop: "10%" }}>
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


                    <label htmlFor='dateOfBirth'><strong>Date of birth: </strong></label>
                    <br />
                    <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="date of birth"
                        value={this.props.dateOfBirth}
                        onChange={this.props.onChange}
                    />

                    <label htmlFor='dateEntered'><strong>Date of entered: </strong></label>
                    <br />
                    <input
                        type="date"
                        name="dateEntered"
                        placeholder="date of entered"
                        value={this.props.dateEntered}
                        onChange={this.props.onChange}
                    />


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
                        <input type='button' value='Cancel' id="cancel" onClick={this.props.handleCancel} />
                    </div>

                </form>
            </div>
        )
    }
}

export default ProfilEdit;
