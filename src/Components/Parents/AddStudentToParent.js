import React, { Component } from 'react';
import '../Table.css'

class AddSubjectToTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewParent: this.props.viewParent,
            selectedStudent: null,
            userId:''
        }
    }
 

    render() {
        return (
            <div className="editForma" style={{ marginTop: "5%" }}>                
                <div>
                    <form onSubmit={this.props.handleEditAddStudentToParent} >
                    <label htmlFor='userId'><strong>Choose student to add: </strong></label><br />
                    <select type="option" name="userId" value={this.props.student} onChange={this.props.handleChangeStudent}  >
                        <option value='---' selected="selected">- - - - - - - - - - - - </option>
                        {this.props.allStudents.map(student =>
                            <option key={student.userId} value={student.userId}>{student.firstName}{student.lastName}</option>)}
                    </select>
                    <div>
                        <input type='submit' className="saveStyl" value='Add' />
                        <a href='javascript:void(0)' onClick={this.props.handleCancelAddStudentsToParent} >Cancel</a>
                    </div>
                    </form>
                </div>
                <br />
            </div>
        )
    }

}
export default AddSubjectToTeacher;




