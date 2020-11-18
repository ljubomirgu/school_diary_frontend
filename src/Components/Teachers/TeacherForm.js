import React, { Component } from 'react';
import AddSubjectToTeacher from './AddSubjectToTeacher'

import '../Table.css'

class TeacherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jmbg: '',
            dateOfBirth: '',
            // version: '',
            dateOfEmployment: '',
            vocation: '',
            // spisak svih predmeta da bi se dodelio neki predmet profi???
            showEditForm: true,
            showAddSubjectForm: false,
            username: this.props.username,
            password: this.props.password,
            teacher: this.props.teacher,
            subjectId:''
            

        }
    }
/*
    handleAddSubjectToTeacher = () =>{
        this.setState({showEditForm: false,showAddSubjectForm: true })
    }
    handleCancelAddSubjectToTeacher = () =>{
        this.setState({showAddSubjectForm: false, showEditForm: true})
    }



    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch('/diary/teachers/' + this.props.teacher.userId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        if (response.ok) {
            const teacher = await response.json();
            this.setState({ teacher, isLoading: false, showAddSubjectForm:false,showEditForm:true })
        } else {
            this.setState({ isLoading: false, isError: true })
            console.log("noMount")
     
        }

    }   


    handleAddSubject = (e) => {
        this.setState({
            subjectId: e.target.value
        })
    }
*/

    render() {
        return (
            <div className="editForma" style={{ marginTop: "5%" }}>
               {this.state.showEditForm &&
                <div>
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
                    <br /><br />


                    <label htmlFor='dateOfBirth'><strong>Date of birth: </strong></label><br/>
                    <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="date of birth"
                        value={this.props.dateOfBirth}
                        onChange={this.props.onChange}
                        className="dateStyl"
                    />


                    <br /><br />
                    <label htmlFor='dateOfEmployment'><strong>Date of employment: </strong></label><br/>
                    <input
                        type="date"
                        name="dateOfEmployment"
                        placeholder="Date of employment"
                        value={this.props.dateOfEmployment}
                        onChange={this.props.onChange}
                        className="dateStyl"
                    />
                    <br />
  
                  {/*   <div>
                        <input type='button' value='Add subject' id="add"  onClick={() => this.handleAddSubjectToTeacher() }/>
                    </div> */}

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
                        <input type='button' value='Cancel' id="cancel" onClick={this.props.handleCancelEdit} />
                    </div>

                </form>
                </div>}
 {/*                <div className="center">
                    {this.state.showAddSubjectForm &&
                    <AddSubjectToTeacher
                        subjects={this.props.subjects}
                        username={this.props.username}
                        password={this.props.password}
                        teacher={this.props.teacher}
                        onChange={this.props.onChange}
                        componentDidMount={this.componentDidMount}
                        handleCancelAddSubjectToTeacher={this.handleCancelAddSubjectToTeacher}
                    />}
                </div> */}
                
            </div>
        )
    }
}

export default TeacherForm;