import React, { Component } from 'react';
import '../Table.css'

class AddSubjectToTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher: this.props.teacher,
            selectedSubject: null,
            subjectId:''
        }
    }
 

/*
    handleEditAddSubjectToTeacher = async (e) => {
        console.log(this.state.selectedSubject)
        e.preventDefault()
        const response = await fetch('/diary/teachers/' + this.state.teacher.userId + '/add-subject/' + this.state.subjectId, {
            method: 'PUT',
              body: JSON.stringify(this.state.selectedSubject),
              headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            },
            mode: "cors"
        });
        this.props.componentDidMount();

    }
*/
    render() {
        return (
            <div className="editForma" style={{ marginTop: "5%" }}>                
                <div>
                    <form onSubmit={this.props.handleEditAddSubjectToTeacher} >
                    <label htmlFor='subjectId'><strong>Choose subject to add: </strong></label><br />
                    <select type="option" name="subjectId" value={this.props.subject} onChange={this.props.handleChangeSubject}  >
                        <option value='---' selected="selected">- - - - - - - - - - - - </option>
                        {this.props.subjects.map(subject =>
                            <option key={subject.subjectId} value={subject.subjectId}>{subject.subjectName}</option>)}
                    </select>
                    <div>
                        <input type='submit' className="saveStyl" value='Add' />
                        <a href='javascript:void(0)' onClick={this.props.handleCancelAddSubjectToTeacher} >Cancel</a>
                    </div>
                    </form>
                </div>
                <br />
            </div>
        )
    }

}
export default AddSubjectToTeacher;




