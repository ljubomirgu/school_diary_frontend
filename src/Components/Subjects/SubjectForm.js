import React, { Component } from 'react';
import '../Table.css'

class SubjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectName: '',
            weeklyFund: '',
        }
    }


    render() {
        return (
            <div className="editForma" style={{ marginTop: "5%" }}>
                <form onSubmit={this.props.handleEditSubmit} >

                    <label htmlFor='subjectName'><strong>Subject name: </strong></label>
                    <input
                        type="text"
                        name="subjectName"
                        placeholder="subject name"
                        value={this.props.subjectName}
                        onChange={this.props.onChange}
                    />
                    <br />

                    <label htmlFor='weeklyFund'><strong>Weekly fund: </strong></label>
                    <input
                        type="number"
                        name="weeklyFund"
                        placeholder="weekly fund"
                        value={this.props.weeklyFund}
                        onChange={this.props.onChange}
                    />
                    <br />
                    <div>
                    <   input type='submit' className="saveStyl" value='Save' />
                        <input type='button' value='Cancel' id="cancel" onClick={this.props.handleCancelEdit} />
                    </div>

                </form>
            </div>
        )
    }
}

export default SubjectForm;