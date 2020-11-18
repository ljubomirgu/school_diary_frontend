import React, { Component } from 'react';
import '../Table.css'

class AddSubjectToYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewYear: this.props.viewYear,
            selectedSubject: null,
            subjectId:''
        }
    }
 

    render() {
        return (
               <div className="editForma" style={{ marginTop: "5%" }}>                
                <div>
                    <form onSubmit={this.props.handleEditAddSubjectToYear} >
                    <label htmlFor='subjectId'><strong>Choose subject to add: </strong></label><br />
                    <select type="option" name="subjectId" value={this.props.subject} onChange={this.props.handleChangeSubject}  >
                        <option value='---' selected="selected">- - - - - - - - - - - - </option>
                        {this.props.allSubjects.map(subject =>
                            <option key={subject.subjectId} value={subject.subjectId}>{subject.subjectName}</option>)}
                    </select>
                    <div>
                        <input type='submit' className="saveStyl" value='Add' />
                        <a href='javascript:void(0)' onClick={this.props.handleCancelAddSubjectsToYear} >Cancel</a>
                    </div>
                    </form>
                </div>
                <br />
            </div>
        )
    }

}
export default AddSubjectToYear;




