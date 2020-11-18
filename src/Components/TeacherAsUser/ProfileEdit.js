import React, { Component } from 'react';
import '../Table.css'


class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

                    <label htmlFor='dateOfEmployment'><strong>Date of employment: </strong></label>
                    <br />
                    <input
                        type="date"
                        name="dateOfEmployment"
                        placeholder="date of employment"
                        value={this.props.dateOfEmployment}
                        onChange={this.props.onChange}
                    />


                    <br />
                    <label htmlFor='vocation'><strong>Vocation: </strong></label>
                    <input
                        type="text"
                        name="vocation"
                        placeholder="vocation"
                        value={this.props.vocation}
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

export default ProfileEdit;
