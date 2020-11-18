import React, { Component } from 'react';
import '../Table.css'

class AddDepartToTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher: this.props.teacher,
            selectedSubject: null,
            subjectId: '',
            departs: []
        }
    }
    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/classes/by-subject/' + this.props.subject.subjectId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        if (response.ok) {
            const departs = await response.json(); //GET vraca Lectures ali sam ih nazvao subjects!
            console.log(departs)
            this.setState({ departs })
        } else {
            this.setState({ isLoading: false, isError: true })
            this.props.handleLogOut();
        }
    }

    render() {
        return (
                         <div className="editForma" style={{ marginTop: "5%" }}>                
                            <div>
                                <form onSubmit={this.props.handleAddDepartToTeacher} >
                                <label htmlFor='classId'><strong>Choose department to add: </strong></label><br />
                                <select type="option" name='classId' value={this.state.depart} onChange={this.props.onChange}  >
                                    <option >- - - - - - - - - - - - </option>
                                    {this.state.departs.map(depart =>
                                        <option key={depart.classId} value={depart.classId}>{depart.year.year}{depart.numberOfDepartment}</option>)}
                                </select>
                                <div>
                                    <input type='submit' className="saveStyl" value='Add' />
                                    <a href='javascript:void(0)' onClick={this.props.handleCancelAddDepartToTeacher} >Cancel</a>
                                </div>
                                </form>
                            </div>
                            <br />
                        </div> 
/*
            <div className="editForma" style={{ marginTop: "5%" }}>
                <div>
                    <form >
                        <label htmlFor='classId'><strong>Choose depart to add: </strong></label><br />
                        <select type="number" name='classId' value={this.state.depart} onChange={this.props.onChange}  >
                            <option >- - - - - - - - - - - - </option>
                            {this.state.departs.map(depart =>
                                <option key={depart.classId} value={depart.classId}>{depart.year.year}{depart.numberOfDepartment}{depart.classId}</option>)}
                        </select>
                        <div>
                            <button onClick={this.props.handleAddDepartToTeacher} onChange={this.props.onChange} value={this.state.depart}>Save</button>
                            <a href='javascript:void(0)' onClick={this.props.handleCancelAddSubjectToTeacher} >Cancel</a>
                        </div>
                    </form>
                </div>
                <br />
            </div>*/
        )
    }

}
export default AddDepartToTeacher;




