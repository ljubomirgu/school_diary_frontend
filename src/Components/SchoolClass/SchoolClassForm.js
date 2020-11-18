import React, { Component } from 'react';
import '../Table.css'

class SchoolClassForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfDepartment: '',
            yearId: '',
            schoolYear: ''
        }
    }


    render() {
        return (
            <div className="editForma" style={{ marginTop: "5%" }}>
                <form onSubmit={this.props.handleEditSubmit} >

                    <label htmlFor='numberOfDepartment'><strong>Number of department: </strong></label>
                    <input
                        type="text"
                        name="numberOfDepartment"
                        placeholder="number of department"
                        value={this.props.numberOfDepartment}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <label htmlFor='yearId'><strong>Year id: </strong></label>
                    <input
                        type="number"
                        name="yearId"
                        placeholder="year id"
                        value={this.props.yearId}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <label htmlFor='schoolYear'><strong>Year: </strong></label>
                    <input
                        type="text"
                        name="schoolYear"
                        placeholder="school year"
                        value={this.props.schoolYear}
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

export default SchoolClassForm;